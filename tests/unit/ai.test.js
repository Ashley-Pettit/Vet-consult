import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveProvider, textFromMessage, friendly, AI_MESSAGES } from '../../src/ai.js';
import { apiReply } from '../fixtures.js';
import { CONFIG } from '../../src/config.js';

// These cover the provider order itself; the deployed connection address is tested separately below.
const PROXY = CONFIG.proxyUrl;
CONFIG.proxyUrl = '';

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

test('proxy: sign-in redirects read as sign-in; a dropped connection reads as a connection problem', async () => {
  const { CONFIG } = await import('../../src/config.js');
  const saved = CONFIG.proxyUrl;
  CONFIG.proxyUrl = 'https://proxy.example/';
  try {
    let init;
    const redirect = await resolveProvider({}, { claude: null, fetch: async (u, i) => ((init = i), { ok: false, status: 0, type: 'opaqueredirect', json: async () => null }) });
    assert.equal(redirect.id, 'proxy');
    await assert.rejects(redirect.generate('x'), (e) => e.code === 'signin');
    assert.equal(init.credentials, 'include');
    assert.equal(init.redirect, 'manual');
    assert.equal(init.headers['x-api-key'], undefined, 'no key leaves the device');

    const blocked = await resolveProvider({}, { claude: null, fetch: async () => { throw new TypeError('Failed to fetch'); } });
    await assert.rejects(blocked.generate('x'), (e) => e.code === 'network');

    const denied = await resolveProvider({}, { claude: null, fetch: async () => ({ ok: false, status: 401, type: 'cors', json: async () => ({}) }) });
    await assert.rejects(denied.generate('x'), (e) => e.code === 'forbidden');
  } finally {
    CONFIG.proxyUrl = saved;
  }
});

test('photos go first as image blocks, text last', async () => {
  const { messageContent } = await import('../../src/ai.js');
  assert.equal(messageContent('hi'), 'hi');
  const c = messageContent('hi', [{ mediaType: 'image/jpeg', data: 'AAA' }]);
  assert.deepEqual(c[0], { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: 'AAA' } });
  assert.deepEqual(c[1], { type: 'text', text: 'hi' });
  let body;
  const p = await resolveProvider({ apiKey: 'k' }, { claude: null, fetch: async (u, i) => ((body = JSON.parse(i.body)), jsonResponse(200, apiReply())) });
  assert.equal(p.images, true);
  await p.generate('x', undefined, { images: [{ mediaType: 'image/jpeg', data: 'BBB' }] });
  assert.equal(body.messages[0].content[0].source.data, 'BBB');
});

test('Claude runtime passes photo blobs and reports image support', async () => {
  let opts;
  const sample = Object.assign(async (p, o) => ((opts = o), { text: 'ok' }), { limits: async () => ({ images: { maxCount: 5 } }) });
  const p = await resolveProvider({}, { claude: { use: async () => sample } });
  assert.equal(p.images, true);
  await p.generate('x', undefined, { images: [{ blob: 'BLOB' }] });
  assert.deepEqual(opts.images, ['BLOB']);
  const plain = Object.assign(async () => ({ text: 'ok' }), { limits: async () => ({}) });
  assert.equal((await resolveProvider({}, { claude: { use: async () => plain } })).images, false);
});

test('the deployed connection is used ahead of a personal key, with sign-in cookies', async () => {
  CONFIG.proxyUrl = PROXY;
  try {
    let seen;
    const fetch = async (url, init) => {
      seen = { url, init };
      return jsonResponse(200, apiReply());
    };
    const p = await resolveProvider({ apiKey: 'sk-ant-test' }, { claude: null, fetch });
    assert.equal(p.id, 'proxy');
    await p.generate('hello');
    assert.equal(seen.url, PROXY);
    assert.equal(seen.init.headers['x-api-key'], undefined);
  } finally {
    CONFIG.proxyUrl = '';
  }
});

test('a streamed reply is read in pieces into the full text', async () => {
  const { readStream } = await import('../../src/ai.js');
  const ev = (o) => `event: x\ndata: ${JSON.stringify(o)}\n\n`;
  const sse = ev({ type: 'message_start' }) + ev({ type: 'content_block_delta', delta: { type: 'text_delta', text: '{"a":' } }) +
    ev({ type: 'content_block_delta', delta: { type: 'text_delta', text: '1}' } }) + ev({ type: 'message_delta', delta: { stop_reason: 'end_turn' } });
  // Split mid-event to prove partial chunks are stitched together.
  const parts = [sse.slice(0, 37), sse.slice(37, 120), sse.slice(120)];
  const body = new ReadableStream({ start(c) { parts.forEach((p) => c.enqueue(new TextEncoder().encode(p))); c.close(); } });
  const msg = await readStream({ body });
  assert.equal(textFromMessage(msg), '{"a":1}');
  assert.equal(msg.stop_reason, 'end_turn');
});

test('an overloaded error inside the stream becomes a friendly message', async () => {
  const { readStream } = await import('../../src/ai.js');
  const body = new ReadableStream({ start(c) { c.enqueue(new TextEncoder().encode('data: {"type":"error","error":{"type":"overloaded_error"}}\n\n')); c.close(); } });
  await assert.rejects(readStream({ body }), (e) => e.code === 'overloaded');
});

test('streamed replies report token usage', async () => {
  const { readStream } = await import('../../src/ai.js');
  const sse = [
    'event: message_start\ndata: {"type":"message_start","message":{"usage":{"input_tokens":900,"cache_read_input_tokens":100,"output_tokens":1}}}',
    'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":"Hi"}}',
    'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":250}}',
  ].join('\n\n') + '\n\n';
  const res = new Response(sse);
  const body = await readStream(res);
  assert.deepEqual(body.usage, { input_tokens: 1000, output_tokens: 250 });
});

test('a dropped connection is retried quietly before any error is shown', async () => {
  let calls = 0;
  const fetch = async () => {
    calls += 1;
    if (calls === 1) throw new TypeError('Failed to fetch');
    return jsonResponse(200, apiReply());
  };
  const p = await resolveProvider({ apiKey: 'k' }, { claude: null, fetch });
  assert.match(await p.generate('x'), /Rusty/);
  assert.equal(calls, 2);
});
