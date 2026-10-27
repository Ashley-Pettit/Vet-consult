// Consult Scribe proxy (Cloudflare Worker).
// Keeps the Anthropic API key on the server so staff devices never hold it. Also keeps shared plans for short links
// (POST /share, GET and PUT /share/<id>) in the SHARES KV namespace.
//
// Secrets / vars (set with `wrangler secret put` / wrangler.toml):
//   ANTHROPIC_API_KEY  (secret)  the organisation's API key
//   ALLOWED_ORIGINS    (var)     comma-separated origins allowed to call, e.g. https://ashley-pettit.github.io
//
// REQUIRED: put Cloudflare Access (or your SSO) in front of this worker so only staff can reach it.
// The Origin check below only stops other websites; it is not authentication.
// In Access, allow OPTIONS preflight requests through (CORS settings: "Bypass options requests to origin").

const MODELS = new Set(['claude-sonnet-5-5', 'claude-opus-5-5', 'claude-haiku-5-5']);
const MAX_TOKENS = 16000;
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
    'access-control-allow-methods': 'GET, POST, PUT, OPTIONS',
    'access-control-allow-headers': 'content-type, x-edit-key, authorization, x-admin-key',
    'access-control-allow-credentials': 'true',
    'access-control-max-age': '86400',
    vary: 'origin',
  };
}

const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

/* ---------------- short share links ---------------- */
// "Share a link" stores the plan here and the link carries only a random id (…/care/#s=k7Q2xw9aBc), so messaging
// apps can't cut it short. Plans are kept for SHARE_DAYS, then Cloudflare deletes them; the person who opened the
// link keeps their own saved copy. Nothing else is stored: no names, devices or addresses.
const SHARE_DAYS = 90;
const SHARE_MAX = 400_000; // characters of plan JSON; a big plan with photos left out is well under this
const ID_CHARS = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const ID_RE = /^[a-zA-Z0-9]{10,16}$/;
export function newShareId(len = 12) {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(bytes, (b) => ID_CHARS[b % ID_CHARS.length]).join('');
}
const sha256 = async (t) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))), (b) => b.toString(16).padStart(2, '0')).join('');
// Only the two shapes the app shares: a care plan, or a document such as a MOP plan.
const validPlan = (plan) =>
  plan && typeof plan === 'object' && !Array.isArray(plan) && ((plan.type === 'care' && plan.sheet && typeof plan.sheet === 'object') || (plan.type === 'doc' && typeof plan.kind === 'string' && plan.d && typeof plan.d === 'object'));

// POST /share            store a plan; with ?edit=1 also return a secret edit key (for vet review links)
// GET  /share/<id>       { plan, updated }
// PUT  /share/<id>       replace the plan; needs the edit key in the x-edit-key header
async function sharedPlan(request, env, path, h) {
  if (!env.SHARES) return json(503, { error: { type: 'sharing_not_configured' } }, h);
  const id = path.startsWith('/share/') ? path.slice('/share/'.length) : '';
  if (path !== '/share' && !ID_RE.test(id)) return json(404, { error: { type: 'not_found' } }, h);
  if (request.method === 'GET' && id) {
    const raw = await env.SHARES.get(`p:${id}`);
    if (!raw) return json(404, { error: { type: 'not_found' } }, h);
    const rec = JSON.parse(raw);
    return json(200, { plan: rec.plan, updated: rec.updated || 0 }, { 'cache-control': 'no-store', ...h });
  }
  if (!((request.method === 'POST' && !id) || (request.method === 'PUT' && id))) return json(405, { error: { type: 'method_not_allowed' } }, h);
  const raw = await request.text();
  if (raw.length > SHARE_MAX) return json(413, { error: { type: 'too_large' } }, h);
  let plan;
  try {
    plan = JSON.parse(raw);
  } catch {
    return json(400, { error: { type: 'invalid_json' } }, h);
  }
  if (!validPlan(plan)) return json(400, { error: { type: 'invalid_request' } }, h);
  const updated = Date.now();
  if (request.method === 'PUT') {
    const old = await env.SHARES.get(`p:${id}`);
    if (!old) return json(404, { error: { type: 'not_found' } }, h);
    const rec = JSON.parse(old);
    const key = request.headers.get('x-edit-key') || '';
    if (!rec.key || !key || (await sha256(key)) !== rec.key) return json(403, { error: { type: 'not_allowed' } }, h);
    await env.SHARES.put(`p:${id}`, JSON.stringify({ plan, key: rec.key, updated }), { expirationTtl: SHARE_DAYS * 86400 });
    return json(200, { id, updated }, h);
  }
  const newId = newShareId();
  const editable = new URL(request.url).searchParams.get('edit') === '1';
  const key = editable ? newShareId(24) : null;
  await env.SHARES.put(`p:${newId}`, JSON.stringify({ plan, key: key ? await sha256(key) : null, updated }), { expirationTtl: SHARE_DAYS * 86400 });
  return json(200, { id: newId, updated, days: SHARE_DAYS, ...(key ? { key } : {}) }, h);
}

/* ---------------- vet accounts and prescriptions ---------------- */
// Vets sign in with email and password. A new account can endorse plans straight away, but can only get
// prescription numbers once an admin has checked the vet register and approved it (POST /admin/vets/<email>).
// Passwords: PBKDF2-SHA256 with a per-user salt. Sessions: random tokens, only their SHA-256 is stored.
// KV (USERS): u:<email> user, s:<token hash> session, f:<email> failed sign-ins, rx:<number> prescription record.
const PBKDF2_ITER = 100000;
const SESSION_SHORT = 12 * 3600; // not remembered: half a day
const SESSION_LONG = 90 * 86400; // remember me
const MAX_FAILS = 5;
const b64 = (bytes) => btoa(String.fromCharCode(...bytes));
async function hashPassword(password, saltB64) {
  const salt = saltB64 ? Uint8Array.from(atob(saltB64), (c) => c.charCodeAt(0)) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: PBKDF2_ITER }, key, 256);
  return { salt: b64(salt), hash: b64(new Uint8Array(bits)) };
}
const sameText = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
};
const cleanEmail = (e) => String(e || '').trim().toLowerCase();
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,}$/i;
const field = (x, n) => String(x == null ? '' : x).trim().slice(0, n);
const STATES = ['vic', 'nsw', 'qld', 'sa', 'wa', 'tas', 'act', 'nt'];
// What the app sees of an account: never the password hash.
const publicUser = (u) => ({ email: u.email, name: u.name, reg: u.reg, regState: u.regState, clinic: u.clinic, address: u.address, phone: u.phone, approved: Boolean(u.approved), created: u.created, ...(u.test ? { test: true } : {}) });
function details(body) {
  return { name: field(body.name, 80), reg: field(body.reg, 40), regState: STATES.includes(body.regState) ? body.regState : 'vic', clinic: field(body.clinic, 120), address: field(body.address, 200), phone: field(body.phone, 40) };
}
async function readJson(request) {
  const raw = await request.text();
  if (raw.length > 20000) return null;
  try {
    const j = JSON.parse(raw);
    return j && typeof j === 'object' && !Array.isArray(j) ? j : null;
  } catch {
    return null;
  }
}
async function newSession(env, email, remember) {
  const token = newShareId(32);
  await env.USERS.put(`s:${await sha256(token)}`, JSON.stringify({ email, at: Date.now() }), { expirationTtl: remember ? SESSION_LONG : SESSION_SHORT });
  return token;
}
async function sessionUser(request, env) {
  const m = /^Bearer ([a-zA-Z0-9]{32})$/.exec(request.headers.get('authorization') || '');
  if (!m) return null;
  const s = await env.USERS.get(`s:${await sha256(m[1])}`);
  if (!s) return null;
  const u = await env.USERS.get(`u:${JSON.parse(s).email}`);
  return u ? { user: JSON.parse(u), tokenHash: await sha256(m[1]) } : null;
}
const isAdmin = (request, env) => Boolean(env.ADMIN_KEY) && sameText(request.headers.get('x-admin-key') || '', env.ADMIN_KEY);

async function accounts(request, env, path, h) {
  if (!env.USERS) return json(503, { error: { type: 'accounts_not_configured' } }, h);
  const method = request.method;
  if (path === '/auth/signup' && method === 'POST') {
    const b = await readJson(request);
    if (!b) return json(400, { error: { type: 'invalid_json' } }, h);
    const email = cleanEmail(b.email);
    const d = details(b);
    if (!EMAIL_RE.test(email)) return json(400, { error: { type: 'bad_email' } }, h);
    if (typeof b.password !== 'string' || b.password.length < 10 || b.password.length > 200) return json(400, { error: { type: 'weak_password' } }, h);
    if (!d.name || !d.reg) return json(400, { error: { type: 'missing_details' } }, h);
    if (await env.USERS.get(`u:${email}`)) return json(409, { error: { type: 'email_taken' } }, h);
    const pw = await hashPassword(b.password);
    const user = { email, ...d, salt: pw.salt, hash: pw.hash, approved: false, created: Date.now() };
    await env.USERS.put(`u:${email}`, JSON.stringify(user));
    return json(200, { token: await newSession(env, email, b.remember === true), user: publicUser(user) }, h);
  }
  if (path === '/auth/login' && method === 'POST') {
    const b = await readJson(request);
    if (!b) return json(400, { error: { type: 'invalid_json' } }, h);
    const email = cleanEmail(b.email);
    const fails = Number(await env.USERS.get(`f:${email}`)) || 0;
    if (fails >= MAX_FAILS) return json(429, { error: { type: 'locked', minutes: 15 } }, h);
    const raw = EMAIL_RE.test(email) ? await env.USERS.get(`u:${email}`) : null;
    const user = raw ? JSON.parse(raw) : null;
    const ok = user && !user.test && typeof b.password === 'string' && sameText((await hashPassword(b.password, user.salt)).hash, user.hash);
    if (!ok) {
      await env.USERS.put(`f:${email}`, String(fails + 1), { expirationTtl: 900 });
      return json(401, { error: { type: 'wrong_login' } }, h);
    }
    return json(200, { token: await newSession(env, email, b.remember === true), user: publicUser(user) }, h);
  }
  // Beta testing only: a shared, approved test vet. Everything it makes is marked TEST in the name and numbers, so
  // nothing it endorses or prescribes can pass as real. Switched on by the TEST_VET variable.
  if (path === '/auth/test' && method === 'POST') {
    if (env.TEST_VET !== 'on') return json(404, { error: { type: 'not_found' } }, h);
    const email = 'test-vet@test.invalid';
    let raw = await env.USERS.get(`u:${email}`);
    if (!raw) {
      raw = JSON.stringify({ email, name: 'Test Vet (TEST ONLY, not a real vet)', reg: 'TEST-0000', regState: 'vic', clinic: 'Test Clinic (not real)', address: '1 Test Street, Testville VIC 3000', phone: '00 0000 0000', salt: '', hash: '', approved: true, test: true, created: Date.now() });
      await env.USERS.put(`u:${email}`, raw);
    }
    return json(200, { token: await newSession(env, email, false), user: publicUser(JSON.parse(raw)) }, h);
  }
  const me = await sessionUser(request, env);
  if (path === '/auth/me' && method === 'GET') return me ? json(200, { user: publicUser(me.user) }, h) : json(401, { error: { type: 'signed_out' } }, h);
  if (path === '/auth/logout' && method === 'POST') {
    if (me) await env.USERS.delete(`s:${me.tokenHash}`);
    return json(200, { ok: true }, h);
  }
  if (path === '/auth/me' && method === 'PUT') {
    if (!me) return json(401, { error: { type: 'signed_out' } }, h);
    if (me.user.test) return json(403, { error: { type: 'test_account' } }, h);
    const b = await readJson(request);
    if (!b) return json(400, { error: { type: 'invalid_json' } }, h);
    const d = details({ ...me.user, ...b });
    if (!d.name || !d.reg) return json(400, { error: { type: 'missing_details' } }, h);
    // A new registration number has to be checked again before prescribing.
    const approved = me.user.approved && d.reg === me.user.reg && d.regState === me.user.regState;
    const user = { ...me.user, ...d, approved };
    await env.USERS.put(`u:${user.email}`, JSON.stringify(user));
    return json(200, { user: publicUser(user) }, h);
  }
  // A prescription number, only for an approved vet. The record keeps who, when, for which animal and what,
  // so a script can be checked later; it never holds the owner's address.
  if (path === '/rx' && method === 'POST') {
    if (!me) return json(401, { error: { type: 'signed_out' } }, h);
    if (!me.user.approved) return json(403, { error: { type: 'not_approved' } }, h);
    const b = await readJson(request);
    if (!b || !b.animal || !Array.isArray(b.items) || !b.items.length || b.items.length > 6) return json(400, { error: { type: 'invalid_request' } }, h);
    const number = `${me.user.test ? 'TEST-' : ''}${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${newShareId(6).toUpperCase()}`;
    const rec = { number, at: Date.now(), vet: me.user.email, reg: me.user.reg, animal: field(b.animal, 160), items: b.items.map((i) => ({ medicine: field(i && i.medicine, 160), schedule: i && i.schedule === 'S8' ? 'S8' : 'S4', quantity: field(i && i.quantity, 60) })) };
    await env.USERS.put(`rx:${number}`, JSON.stringify(rec), { expirationTtl: 3 * 365 * 86400 });
    return json(200, { number, at: rec.at }, h);
  }
  // Endorsing a care plan: only an approved vet. The server keeps the record (who, when, which medications), and
  // anyone can look it up by id, so an endorsement typed into a plan by hand shows as unconfirmed.
  if (path === '/endorse' && method === 'POST') {
    if (!me) return json(401, { error: { type: 'signed_out' } }, h);
    if (!me.user.approved) return json(403, { error: { type: 'not_approved' } }, h);
    const b = await readJson(request);
    if (!b || typeof b.meds !== 'string' || b.meds.length > 20000) return json(400, { error: { type: 'invalid_request' } }, h);
    const id = newShareId(16);
    const rec = { by: me.user.name, reg: me.user.reg, clinic: me.user.clinic, at: Date.now(), meds: b.meds, animal: field(b.animal, 160) };
    await env.USERS.put(`e:${id}`, JSON.stringify(rec), { expirationTtl: 3 * 365 * 86400 });
    return json(200, { id, ...rec }, h);
  }
  const em = /^\/endorse\/([a-zA-Z0-9]{16})$/.exec(path);
  if (em && method === 'GET') {
    const raw = await env.USERS.get(`e:${em[1]}`);
    if (!raw) return json(404, { error: { type: 'not_found' } }, h);
    const r = JSON.parse(raw);
    return json(200, { id: em[1], by: r.by, reg: r.reg, clinic: r.clinic, at: r.at, meds: r.meds }, { 'cache-control': 'public, max-age=86400', ...h });
  }
  // Admin: list vets, approve or un-approve, set a temporary password.
  if (path.startsWith('/admin/')) {
    if (!isAdmin(request, env)) return json(403, { error: { type: 'not_admin' } }, h);
    if (path === '/admin/vets' && method === 'GET') {
      const list = await env.USERS.list({ prefix: 'u:' });
      const users = (await Promise.all(list.keys.map((k) => env.USERS.get(k.name)))).filter(Boolean).map((x) => publicUser(JSON.parse(x)));
      return json(200, { vets: users.sort((a, b) => Number(a.approved) - Number(b.approved) || b.created - a.created) }, h);
    }
    const m = /^\/admin\/vets\/([^/]+)\/(approve|password)$/.exec(path);
    if (m && method === 'POST') {
      const email = cleanEmail(decodeURIComponent(m[1]));
      const raw = await env.USERS.get(`u:${email}`);
      if (!raw) return json(404, { error: { type: 'not_found' } }, h);
      const user = JSON.parse(raw);
      const b = (await readJson(request)) || {};
      if (m[2] === 'approve') user.approved = b.approved !== false;
      else {
        if (typeof b.password !== 'string' || b.password.length < 10) return json(400, { error: { type: 'weak_password' } }, h);
        Object.assign(user, await hashPassword(b.password));
        await env.USERS.delete(`f:${email}`);
      }
      await env.USERS.put(`u:${email}`, JSON.stringify(user));
      return json(200, { user: publicUser(user) }, h);
    }
  }
  return json(404, { error: { type: 'not_found' } }, h);
}

export async function handle(request, env, fetchImpl = fetch) {
  const origin = request.headers.get('origin') || '';
  // Only the app's own address may call this. Override with an ALLOWED_ORIGINS variable if it moves.
  const allowed = String(env.ALLOWED_ORIGINS || 'https://ashley-pettit.github.io,https://companion.bunurongwildlifecare.au')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!allowed.includes(origin)) return json(403, { error: { type: 'forbidden_origin' } });
  const h = cors(origin);

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
  const path = new URL(request.url).pathname.replace(/\/+$/, '');
  if (path === '/share' || path.startsWith('/share/')) return sharedPlan(request, env, path, h);
  if (path.startsWith('/auth/') || path.startsWith('/admin/') || path === '/rx' || path === '/endorse' || path.startsWith('/endorse/')) return accounts(request, env, path, h);
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
