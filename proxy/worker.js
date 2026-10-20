// Consult Scribe proxy (Cloudflare Worker).
// Keeps the Anthropic API key on the server so staff devices never hold it.
//
// Secrets / vars (set with `wrangler secret put` / wrangler.toml):
//   ANTHROPIC_API_KEY  (secret)  the organisation's API key
//   ALLOWED_ORIGINS    (var)     comma-separated origins allowed to call, e.g. https://ashley-pettit.github.io
//
// Put Cloudflare Access (or your SSO) in front of this worker so only staff can reach it.

const MODELS = new Set(['claude-sonnet-5-5', 'claude-haiku-5-5']);
const MAX_TOKENS = 4000;
const MAX_BODY_BYTES = 200_000;

function cors(origin) {
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
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
  if (!messages || messages.length !== 1 || messages[0].role !== 'user' || typeof messages[0].content !== 'string') {
    return json(400, { error: { type: 'invalid_request' } }, h);
  }
  const model = MODELS.has(body.model) ? body.model : 'claude-sonnet-5-5';

  const upstream = await fetchImpl('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ model, max_tokens: Math.min(Number(body.max_tokens) || MAX_TOKENS, MAX_TOKENS), messages }),
  });
  const text = await upstream.text();
  return new Response(text, { status: upstream.status, headers: { 'content-type': 'application/json', ...h } });
}

export default { fetch: (request, env) => handle(request, env) };
