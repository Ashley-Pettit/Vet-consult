import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveProvider, textFromMessage, friendly, AI_MESSAGES } from '../../src/ai.js';
import { apiReply } from '../fixtures.js';

const jsonResponse = (status, body) => ({ ok: status >= 200 && status < 300, status, json: async () => body });

test('no key, no proxy, no Claude runtime -> no provider', async () => {
  assert.equal(await resolveProvider({}, { claude: null, fetch: async () => {} }), null);
});

test('API key provider sends the right request and returns text', async () => {
  let seen;
  const fetch = async (url, init) => {
    seen = { url, init };
    return jsonResponse(200, apiReply());
  };
  const p = await resolveProvider({ apiKey: 'sk-ant-test', model: 'claude-haiku-5-5' }, { claude: null, fetch });
  assert.equal(p.id, 'key');
  const text = await p.generate('hello');
  assert.match(text, /Rusty/);
  assert.equal(seen.url, 'https://api.anthropic.com/v1/messages');
  assert.equal(seen.init.headers['x-api-key'], 'sk-ant-test');
  assert.equal(seen.init.headers['anthropic-version'], '2023-06-01');
  assert.equal(seen.init.headers['anthropic-dangerous-direct-browser-access'], 'true');
  const body = JSON.parse(seen.init.body);
  assert.equal(body.model, 'claude-haiku-5-5');
  assert.equal(body.messages[0].content, 'hello');
});

for (const [status, code] of [[401, 'bad_key'], [403, 'forbidden'], [429, 'rate_limited'], [529, 'overloaded'], [500, 'server'], [400, 'bad_request']]) {
  test(`HTTP ${status} maps to ${code}`, async () => {
    const p = await resolveProvider({ apiKey: 'k' }, { claude: null, fetch: async () => jsonResponse(status, { error: {} }) });
    await assert.rejects(p.generate('x'), (e) => e.code === code && e.message === AI_MESSAGES[code]);
  });
}

test('network failure maps to network', async () => {
  const p = await resolveProvider({ apiKey: 'k' }, { claude: null, fetch: async () => { throw new TypeError('Failed to fetch'); } });
  await assert.rejects(p.generate('x'), (e) => e.code === 'network');
});

test('user abort maps to cancelled', async () => {
  const fetch = (url, init) =>
    new Promise((_, reject) => init.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError'))));
  const p = await resolveProvider({ apiKey: 'k' }, { claude: null, fetch });
  const ctl = new AbortController();
  const run = p.generate('x', ctl.signal);
  ctl.abort();
  await assert.rejects(run, (e) => e.code === 'cancelled');
});

test('empty reply maps to empty', async () => {
  const p = await resolveProvider({ apiKey: 'k' }, { claude: null, fetch: async () => jsonResponse(200, { content: [] }) });
  await assert.rejects(p.generate('x'), (e) => e.code === 'empty');
});

test('textFromMessage skips thinking blocks and flags refusals', () => {
  assert.equal(textFromMessage({ content: [{ type: 'thinking', thinking: 'hmm' }, { type: 'text', text: 'a' }, { type: 'text', text: 'b' }] }), 'ab');
  assert.throws(() => textFromMessage({ stop_reason: 'refusal', content: [] }), (e) => e.code === 'refused');
});

test('Claude runtime provider is preferred and maps errors', async () => {
  const sample = async (prompt) => ({ text: 'reply:' + prompt });
  const claude = { use: async (n) => (n === 'sample' ? sample : null) };
  const p = await resolveProvider({ apiKey: 'k' }, { claude, fetch: async () => {} });
  assert.equal(p.id, 'claude');
  assert.equal(await p.generate('hi'), 'reply:hi');

  const failing = { use: async () => async () => { throw { code: 'not_granted' }; } };
  const p2 = await resolveProvider({}, { claude: failing });
  await assert.rejects(p2.generate('x'), (e) => e.code === 'forbidden');
});

test('Claude runtime that resolves null falls through to key', async () => {
  const p = await resolveProvider({ apiKey: 'k' }, { claude: { use: async () => null }, fetch: async () => {} });
  assert.equal(p.id, 'key');
});

test('friendly() always returns readable text', () => {
  assert.equal(friendly({ code: 'bad_key' }), AI_MESSAGES.bad_key);
  assert.equal(friendly({ code: 'weird' }), AI_MESSAGES.server);
  assert.equal(friendly(undefined), AI_MESSAGES.server);
});
