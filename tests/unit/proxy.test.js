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
  assert.equal(sent.max_tokens, 8000);
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
