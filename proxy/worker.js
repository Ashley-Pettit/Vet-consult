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

const MODELS = new Set(['claude-sonnet-5-5', 'claude-haiku-5-5']);
const MAX_TOKENS = 8000;
const MAX_BODY_BYTES = 8_000_000; // up to 5 resized photos
const MAX_IMAGES = 5;
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

/** A plain string, or photo blocks followed by text. Nothing else gets through. */
function validContent(c) {
  if (typeof c === 'string') return c.length > 0;
  if (!Array.isArray(c) || !c.length || c.length > MAX_IMAGES + 1) return false;
  let images = 0;
  for (const b of c) {
    if (b && b.type === 'text' && typeof b.text === 'string') continue;
    if (b && b.type === 'image' && b.source && b.source.type === 'base64' && IMAGE_TYPES.has(b.source.media_type) && typeof b.source.data === 'string') {
      images++;
      continue;
    }
    return false;
  }
  return images <= MAX_IMAGES && c[c.length - 1].type === 'text';
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
  const allowed = String(env.ALLOWED_ORIGINS || '')
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

  let upstream;
  try {
    upstream = await fetchImpl('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens: Math.min(Number(body.max_tokens) || MAX_TOKENS, MAX_TOKENS), messages }),
    });
  } catch {
    return json(502, { error: { type: 'upstream_unreachable' } }, h);
  }
  const text = await upstream.text();
  return new Response(text, { status: upstream.status, headers: { 'content-type': 'application/json', ...h } });
}

export default { fetch: (request, env) => handle(request, env) };
