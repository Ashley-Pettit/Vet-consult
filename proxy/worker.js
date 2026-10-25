// Consult Scribe proxy (Cloudflare Worker).
// Keeps the Anthropic API key on the server so staff devices never hold it.
//
// Secrets / vars (set with `wrangler secret put` / wrangler.toml):
//   ANTHROPIC_API_KEY  (secret)  the organisation's API key
//   ALLOWED_ORIGINS    (var)     comma-separated origins allowed to call, e.g. https://ashley-pettit.github.io
//
// REQUIRED: put Cloudflare Access (or your SSO) in front of this worker so only staff can reach it.
// The Origin check below only stops other websites; it is not authentication.
// In Access, allow OPTIONS preflight requests through (CORS settings: "Bypass options requests to origin").

const MODELS = new Set(['claude-sonnet-5-5', 'claude-opus-5-5', 'claude-haiku-5-5']);
const MAX_TOKENS = 8000;
const MAX_BODY_BYTES = 30_000_000; // up to 5 resized photos and 5 PDFs (expert witness statements)
const MAX_IMAGES = 5;
const MAX_DOCS = 5;
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

/** The one tool the app may ask for (expert opinions): web search, rebuilt from known fields only. */
function webSearchTool(tools) {
  if (!Array.isArray(tools) || tools.length !== 1) return null;
  const t = tools[0] || {};
  if (t.type !== 'web_search_20260209' || t.name !== 'web_search') return null;
  const out = { type: t.type, name: t.name, max_uses: Math.min(Math.max(Number(t.max_uses) || 5, 1), 8) };
  if (Array.isArray(t.blocked_domains)) out.blocked_domains = t.blocked_domains.filter((d) => typeof d === 'string' && /^[a-z0-9.-]{3,80}$/i.test(d)).slice(0, 20);
  if (t.user_location && t.user_location.type === 'approximate' && /^[A-Z]{2}$/.test(t.user_location.country || '')) out.user_location = { type: 'approximate', country: t.user_location.country };
  return out;
}

/** A plain string, or photo and PDF blocks followed by text (up to two text blocks: the fixed part, marked for
 * prompt caching, then this case). Nothing else gets through. */
function validContent(c) {
  if (typeof c === 'string') return c.length > 0;
  if (!Array.isArray(c) || !c.length || c.length > MAX_IMAGES + MAX_DOCS + 2) return false;
  let images = 0;
  let docs = 0;
  let texts = 0;
  for (const b of c) {
    if (b && b.type === 'text' && typeof b.text === 'string') {
      const keys = Object.keys(b).filter((k) => k !== 'type' && k !== 'text');
      const cacheOk = keys.length === 0 || (keys.length === 1 && b.cache_control && b.cache_control.type === 'ephemeral' && Object.keys(b.cache_control).length === 1);
      if (!cacheOk) return false;
      texts++;
      continue;
    }
    if (b && b.type === 'image' && b.source && b.source.type === 'base64' && IMAGE_TYPES.has(b.source.media_type) && typeof b.source.data === 'string') {
      images++;
      continue;
    }
    if (b && b.type === 'document' && b.source && b.source.type === 'base64' && b.source.media_type === 'application/pdf' && typeof b.source.data === 'string' && (b.title === undefined || typeof b.title === 'string')) {
      docs++;
      continue;
    }
    return false;
  }
  return images <= MAX_IMAGES && docs <= MAX_DOCS && texts <= 2 && c[c.length - 1].type === 'text';
}

function cors(origin) {
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-allow-credentials': 'true',
    'access-control-max-age': '86400',
    vary: 'origin',
  };
}

const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

export async function handle(request, env, fetchImpl = fetch) {
  const origin = request.headers.get('origin') || '';
  // Only the app's own address may call this. Override with an ALLOWED_ORIGINS variable if it moves.
  const allowed = String(env.ALLOWED_ORIGINS || 'https://ashley-pettit.github.io')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!allowed.includes(origin)) return json(403, { error: { type: 'forbidden_origin' } });
  const h = cors(origin);

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
  if (request.method !== 'POST') return json(405, { error: { type: 'method_not_allowed' } }, h);
  if (!env.ANTHROPIC_API_KEY) return json(500, { error: { type: 'not_configured' } }, h);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: { type: 'too_large' } }, h);
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: { type: 'invalid_json' } }, h);
  }
  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (!messages || messages.length !== 1 || messages[0].role !== 'user' || !validContent(messages[0].content)) {
    return json(400, { error: { type: 'invalid_request' } }, h);
  }
  const model = MODELS.has(body.model) ? body.model : 'claude-sonnet-5-5';
  const stream = body.stream === true;
  const search = body.tools === undefined ? null : webSearchTool(body.tools);
  if (body.tools !== undefined && !search) return json(400, { error: { type: 'invalid_request' } }, h);

  let upstream;
  try {
    upstream = await fetchImpl('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens: Math.min(Number(body.max_tokens) || MAX_TOKENS, MAX_TOKENS), messages, ...(search ? { tools: [search] } : {}), ...(stream ? { stream: true } : {}) }),
    });
  } catch {
    return json(502, { error: { type: 'upstream_unreachable' } }, h);
  }
  // Streaming: pass Claude's reply through as it is written, so the connection is never silent long enough
  // for a phone network or firewall to drop it.
  if (stream && upstream.ok && upstream.body) {
    return new Response(upstream.body, { status: 200, headers: { 'content-type': 'text/event-stream', 'cache-control': 'no-cache', ...h } });
  }
  const text = await upstream.text();
  return new Response(text, { status: upstream.status, headers: { 'content-type': 'application/json', ...h } });
}

export default { fetch: (request, env) => handle(request, env) };
