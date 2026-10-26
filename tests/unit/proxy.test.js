import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handle } from '../../proxy/worker.js';

const ORIGIN = 'https://ashley-pettit.github.io';
const env = { ANTHROPIC_API_KEY: 'sk-ant-server', ALLOWED_ORIGINS: ORIGIN };
const req = (body, { origin = ORIGIN, method = 'POST' } = {}) =>
  new Request('https://proxy.example/', { method, headers: { origin, 'content-type': 'application/json' }, body: method === 'POST' ? JSON.stringify(body) : undefined });
const good = { model: 'claude-haiku-5-5', max_tokens: 99999, messages: [{ role: 'user', content: 'hi' }] };

test('rejects unknown origins', async () => {
  const r = await handle(req(good, { origin: 'https://evil.example' }), env, async () => assert.fail('should not call upstream'));
  assert.equal(r.status, 403);
});

test('answers CORS preflight', async () => {
  const r = await handle(req(null, { method: 'OPTIONS' }), env);
  assert.equal(r.status, 204);
  assert.equal(r.headers.get('access-control-allow-origin'), ORIGIN);
});

test('forwards with the server key, caps tokens, keeps allowed model', async () => {
  let seen;
  const r = await handle(req(good), env, async (url, init) => {
    seen = { url, init };
    return new Response('{"content":[{"type":"text","text":"ok"}]}', { status: 200 });
  });
  assert.equal(r.status, 200);
  assert.equal(seen.init.headers['x-api-key'], 'sk-ant-server');
  const sent = JSON.parse(seen.init.body);
  assert.equal(sent.max_tokens, 16000);
  assert.equal(sent.model, 'claude-haiku-5-5');
  assert.equal(r.headers.get('access-control-allow-origin'), ORIGIN);
});

test('swaps unknown models for the default and rejects odd payloads', async () => {
  let sent;
  await handle(req({ ...good, model: 'claude-fable-5-1' }), env, async (u, i) => ((sent = JSON.parse(i.body)), new Response('{}')));
  assert.equal(sent.model, 'claude-sonnet-5-5');
  const bad = await handle(req({ messages: [{ role: 'user', content: 'a' }, { role: 'user', content: 'b' }] }), env);
  assert.equal(bad.status, 400);
  const sys = await handle(req({ ...good, system: 'x', messages: [{ role: 'assistant', content: 'a' }] }), env);
  assert.equal(sys.status, 400);
});

test('passes upstream errors through', async () => {
  const r = await handle(req(good), env, async () => new Response('{"error":{}}', { status: 529 }));
  assert.equal(r.status, 529);
});

test('refuses when the key is not configured', async () => {
  const r = await handle(req(good), { ALLOWED_ORIGINS: ORIGIN });
  assert.equal(r.status, 500);
});

test('photos pass through; anything else in content is refused', async () => {
  const img = { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: 'AAAA' } };
  let sent;
  const ok = await handle(req({ ...good, messages: [{ role: 'user', content: [img, { type: 'text', text: 'hi' }] }] }), env, async (u, i) => ((sent = JSON.parse(i.body)), new Response('{}')));
  assert.equal(ok.status, 200);
  assert.equal(sent.messages[0].content[0].type, 'image');
  const tool = await handle(req({ ...good, messages: [{ role: 'user', content: [{ type: 'tool_use', id: 'x' }, { type: 'text', text: 'hi' }] }] }), env);
  assert.equal(tool.status, 400);
  const tooMany = await handle(req({ ...good, messages: [{ role: 'user', content: [img, img, img, img, img, img, { type: 'text', text: 'x' }] }] }), env);
  assert.equal(tooMany.status, 400);
  const url = await handle(req({ ...good, messages: [{ role: 'user', content: [{ type: 'image', source: { type: 'url', url: 'https://x' } }, { type: 'text', text: 'x' }] }] }), env);
  assert.equal(url.status, 400);
});

test('streaming requests are passed through as they arrive', async () => {
  const { handle } = await import('../../proxy/worker.js');
  let sent;
  const fetchImpl = async (url, init) => {
    sent = JSON.parse(init.body);
    return new Response('data: {"type":"message_stop"}\n\n', { status: 200, headers: { 'content-type': 'text/event-stream' } });
  };
  const req = new Request('https://proxy.example', {
    method: 'POST',
    headers: { origin: 'https://ashley-pettit.github.io', 'content-type': 'application/json' },
    body: JSON.stringify({ stream: true, messages: [{ role: 'user', content: 'hi' }] }),
  });
  const res = await handle(req, { ANTHROPIC_API_KEY: 'k' }, fetchImpl);
  assert.equal(sent.stream, true);
  assert.match(res.headers.get('content-type'), /event-stream/);
  assert.equal(res.headers.get('access-control-allow-origin'), 'https://ashley-pettit.github.io');
  assert.match(await res.text(), /message_stop/);
});

test('lets the web search tool through, rebuilt from known fields, and rejects any other tool', async () => {
  let sent;
  const tool = { type: 'web_search_20260209', name: 'web_search', max_uses: 50, blocked_domains: ['rspca.org.au', 'bad domain!'], user_location: { type: 'approximate', country: 'AU' }, extra: 'x' };
  const r = await handle(req({ ...good, tools: [tool] }), env, async (url, init) => {
    sent = JSON.parse(init.body);
    return new Response('{"content":[{"type":"text","text":"ok"}]}', { status: 200 });
  });
  assert.equal(r.status, 200);
  assert.deepEqual(sent.tools, [{ type: 'web_search_20260209', name: 'web_search', max_uses: 8, blocked_domains: ['rspca.org.au'], user_location: { type: 'approximate', country: 'AU' } }]);
  const bad = await handle(req({ ...good, tools: [{ type: 'bash_20250124', name: 'bash' }] }), env, async () => assert.fail('should not call upstream'));
  assert.equal(bad.status, 400);
  let plain;
  await handle(req(good), env, async (url, init) => ((plain = JSON.parse(init.body)), new Response('{}', { status: 200 })));
  assert.equal(plain.tools, undefined);
});

// Short share links: the plan is kept in KV and the link carries only its id.
const kv = () => {
  const m = new Map();
  return { m, get: async (k) => m.get(k) ?? null, put: async (k, v, o) => m.set(k, v) && (m.ttl = o.expirationTtl) };
};
const shareReq = (path, { method = 'GET', body, origin = ORIGIN } = {}) =>
  new Request(`https://proxy.example${path}`, { method, headers: { origin, 'content-type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });

test('stores a shared plan and gives it back by id, kept 90 days', async () => {
  const SHARES = kv();
  const plan = { v: 1, region: 'vic', type: 'care', sheet: { animal: 'Wombat' } };
  const r = await handle(shareReq('/share', { method: 'POST', body: plan }), { ...env, SHARES });
  assert.equal(r.status, 200);
  const { id } = await r.json();
  assert.match(id, /^[a-zA-Z0-9]{12}$/);
  assert.equal(SHARES.m.ttl, 90 * 86400);
  const g = await handle(shareReq(`/share/${id}`), { ...env, SHARES });
  assert.equal(g.status, 200);
  assert.deepEqual((await g.json()).plan, plan);
  // A plain share link can't be changed by anyone.
  assert.equal((await handle(shareReq(`/share/${id}`, { method: 'PUT', body: plan }), { ...env, SHARES })).status, 403);
});

test('a review link can be updated only with its edit key', async () => {
  const SHARES = kv();
  const plan = { type: 'care', sheet: { animal: 'Possum', medications: [] } };
  const r = await (await handle(shareReq('/share?edit=1', { method: 'POST', body: plan }), { ...env, SHARES })).json();
  assert.match(r.key, /^[a-zA-Z0-9]{24}$/);
  assert.ok(![...SHARES.m.values()].some((v) => v.includes(r.key)), 'the key itself is never stored');
  const changed = { ...plan, sheet: { ...plan.sheet, endorsement: { by: 'Dr Lee' } } };
  const put = (key) => handle(new Request(`https://proxy.example/share/${r.id}`, { method: 'PUT', headers: { origin: ORIGIN, 'x-edit-key': key }, body: JSON.stringify(changed) }), { ...env, SHARES });
  assert.equal((await put('wrong-key-wrong-key-1234')).status, 403);
  assert.equal((await put(r.key)).status, 200);
  const g = await (await handle(shareReq(`/share/${r.id}`), { ...env, SHARES })).json();
  assert.equal(g.plan.sheet.endorsement.by, 'Dr Lee');
});

test('share links: unknown ids, odd shapes and other websites are refused', async () => {
  const SHARES = kv();
  assert.equal((await handle(shareReq('/share/abcdefghjk12'), { ...env, SHARES })).status, 404);
  assert.notEqual((await handle(shareReq('/share/../../x'), { ...env, SHARES })).status, 200);
  assert.equal((await handle(shareReq('/share', { method: 'POST', body: { type: 'other' } }), { ...env, SHARES })).status, 400);
  assert.equal((await handle(shareReq('/share', { method: 'POST', body: { type: 'care', sheet: {} }, origin: 'https://evil.example' }), { ...env, SHARES })).status, 403);
  assert.equal(SHARES.m.size, 0);
});

// Vet accounts: sign up, sign in, approval before prescription numbers, admin password reset.
const usersKv = () => {
  const m = new Map();
  return { m, get: async (k) => m.get(k) ?? null, put: async (k, v) => void m.set(k, v), delete: async (k) => void m.delete(k), list: async ({ prefix }) => ({ keys: [...m.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })) }) };
};
const call = async (path, { method = 'GET', body, token, admin, e } = {}) => {
  const headers = { origin: ORIGIN, 'content-type': 'application/json' };
  if (token) headers.authorization = `Bearer ${token}`;
  if (admin) headers['x-admin-key'] = admin;
  const r = await handle(new Request(`https://proxy.example${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) }), e);
  return { status: r.status, body: await r.json() };
};

test('vet accounts: sign up, sign in, and prescriptions only once approved', async () => {
  const e = { ...env, USERS: usersKv(), ADMIN_KEY: 'admin-key-for-tests-123' };
  const vet = { email: 'Sam@Clinic.com.au', password: 'correct horse battery', name: 'Sam Lee', reg: 'V1234', clinic: 'Bass Coast Vets', address: '1 Main St, Inverloch VIC 3996', phone: '03 5555 0000', remember: true };
  const up = await call('/auth/signup', { method: 'POST', body: vet, e });
  assert.equal(up.status, 200);
  assert.equal(up.body.user.approved, false);
  assert.equal(up.body.user.email, 'sam@clinic.com.au');
  assert.ok(!JSON.stringify(up.body).includes('hash'), 'no password hash leaves the server');
  assert.ok(![...e.USERS.m.values()].some((v) => v.includes(vet.password)), 'the password itself is never stored');
  assert.equal((await call('/auth/signup', { method: 'POST', body: vet, e })).status, 409);
  const rx = { animal: 'Wombat, Willow', items: [{ medicine: 'Doxycycline 50 mg tablets', schedule: 'S4', quantity: '14' }] };
  assert.equal((await call('/rx', { method: 'POST', body: rx, token: up.body.token, e })).status, 403, 'not approved yet');
  assert.equal((await call('/endorse', { method: 'POST', body: { meds: '[]' }, token: up.body.token, e })).status, 403, 'endorsing needs approval too');
  assert.equal((await call('/admin/vets', { admin: 'wrong', e })).status, 403);
  const list = await call('/admin/vets', { admin: e.ADMIN_KEY, e });
  assert.equal(list.body.vets.length, 1);
  assert.equal((await call(`/admin/vets/${encodeURIComponent('sam@clinic.com.au')}/approve`, { method: 'POST', body: { approved: true }, admin: e.ADMIN_KEY, e })).status, 200);
  const en = await call('/endorse', { method: 'POST', body: { meds: '[["doxycycline"]]', animal: 'Willow' }, token: up.body.token, e });
  assert.equal(en.status, 200);
  const look = await call(`/endorse/${en.body.id}`, { e });
  assert.equal(look.body.by, 'Sam Lee');
  assert.equal(look.body.meds, '[["doxycycline"]]');
  const ok = await call('/rx', { method: 'POST', body: rx, token: up.body.token, e });
  assert.equal(ok.status, 200);
  assert.match(ok.body.number, /^\d{6}-[A-Z0-9]{6}$/);
  // A new registration number needs approving again.
  const changed = await call('/auth/me', { method: 'PUT', body: { reg: 'V9999' }, token: up.body.token, e });
  assert.equal(changed.body.user.approved, false);
  assert.equal((await call('/auth/logout', { method: 'POST', token: up.body.token, e })).status, 200);
  assert.equal((await call('/auth/me', { token: up.body.token, e })).status, 401);
});

test('vet accounts: wrong passwords lock the account for a while; admin can set a new one', async () => {
  const e = { ...env, USERS: usersKv(), ADMIN_KEY: 'admin-key-for-tests-123' };
  await call('/auth/signup', { method: 'POST', body: { email: 'jo@vet.au', password: 'first password 1', name: 'Jo Park', reg: 'V555' }, e });
  for (let i = 0; i < 5; i++) assert.equal((await call('/auth/login', { method: 'POST', body: { email: 'jo@vet.au', password: 'nope' }, e })).status, 401);
  assert.equal((await call('/auth/login', { method: 'POST', body: { email: 'jo@vet.au', password: 'first password 1' }, e })).status, 429);
  assert.equal((await call('/admin/vets/jo%40vet.au/password', { method: 'POST', body: { password: 'temporary pass 22' }, admin: e.ADMIN_KEY, e })).status, 200);
  assert.equal((await call('/auth/login', { method: 'POST', body: { email: 'jo@vet.au', password: 'temporary pass 22' }, e })).status, 200);
});

test('test vet: only when switched on, and everything it makes is marked TEST', async () => {
  const off = { ...env, USERS: usersKv() };
  assert.equal((await call('/auth/test', { method: 'POST', e: off })).status, 404);
  const e = { ...env, USERS: usersKv(), TEST_VET: 'on' };
  const t = await call('/auth/test', { method: 'POST', e });
  assert.equal(t.status, 200);
  assert.equal(t.body.user.test, true);
  assert.match(t.body.user.name, /TEST ONLY/);
  const rx = await call('/rx', { method: 'POST', body: { animal: 'Test', items: [{ medicine: 'x', schedule: 'S4', quantity: '1' }] }, token: t.body.token, e });
  assert.match(rx.body.number, /^TEST-/);
  assert.equal((await call('/auth/login', { method: 'POST', body: { email: 'test-vet@test.invalid', password: '' }, e })).status, 401);
});
