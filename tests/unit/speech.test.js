import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Dictation, speechSupported, speechErrorMessage } from '../../src/speech.js';
import { installFakeSpeech } from '../fake-speech.js';

const tick = (ms = 20) => new Promise((r) => setTimeout(r, ms));

test('reports unsupported browsers', () => {
  const d = new Dictation({ win: {} });
  const errors = [];
  d.onerror = (c) => errors.push(c);
  assert.equal(speechSupported({}), false);
  assert.equal(d.start(), false);
  assert.deepEqual(errors, ['unsupported']);
});

test('starts, streams interim and final text, and stops', async () => {
  const win = {};
  installFakeSpeech(win);
  const d = new Dictation({ win });
  const states = [];
  const finals = [];
  const interims = [];
  d.onstate = (s) => states.push(s);
  d.onfinal = (t) => finals.push(t);
  d.oninterim = (t) => interims.push(t);
  d.start();
  await tick();
  assert.equal(d.state, 'listening');
  win.__fakeSay('temp thirty nine', { final: false });
  win.__fakeSay('temp 39.4');
  assert.deepEqual(finals, ['temp 39.4']);
  assert.ok(interims.includes('temp thirty nine'));
  d.stop();
  await tick();
  assert.equal(d.state, 'idle');
  assert.deepEqual(states, ['starting', 'listening', 'idle']);
});

test('quietly restarts when the browser ends recognition on its own', async () => {
  const win = {};
  const fake = installFakeSpeech(win);
  const d = new Dictation({ win });
  d.start();
  await tick();
  const first = fake.current;
  win.__fakeEnd();
  await tick(120);
  assert.equal(d.state, 'listening');
  assert.notEqual(fake.current, first, 'a fresh recogniser is used');
  assert.equal(fake.current.running, true);
  d.stop();
  await tick();
  assert.equal(d.state, 'idle');
});

test('permission denied stops and reports once', async () => {
  const win = {};
  installFakeSpeech(win, { denied: true });
  const d = new Dictation({ win });
  const errors = [];
  d.onerror = (c) => errors.push(c);
  d.start();
  await tick(40);
  assert.deepEqual(errors, ['not-allowed']);
  assert.equal(d.state, 'idle');
});

test('every error code has a helpful message', () => {
  for (const c of ['unsupported', 'not-allowed', 'audio-capture', 'network', 'start-failed', 'odd']) {
    assert.ok(speechErrorMessage(c).length > 20, c);
  }
});

test('sessions that never start give up with a pause message', async () => {
  const win = {};
  const fake = installFakeSpeech(win);
  fake.neverStart = true;
  const d = new Dictation({ win });
  const errors = [];
  d.onerror = (c) => errors.push(c);
  d.start();
  for (let i = 0; i < 6; i++) {
    await tick(80);
    win.__fakeEnd();
  }
  await tick(80);
  assert.equal(d.state, 'idle');
  assert.deepEqual(errors, ['interrupted']);
  assert.ok(fake.instances.length <= 6);
});

test('short silent sessions that did start are not failures', async () => {
  const win = {};
  installFakeSpeech(win);
  const d = new Dictation({ win });
  d.start();
  for (let i = 0; i < 8; i++) {
    await tick(80);
    win.__fakeEnd();
  }
  await tick(80);
  assert.equal(d.state, 'listening');
  d.cancel();
});

test('long silent sessions keep listening indefinitely', async () => {
  const win = {};
  installFakeSpeech(win);
  let clock = 0;
  const d = new Dictation({ win, now: () => clock });
  d.start();
  for (let i = 0; i < 25; i++) {
    await tick(70);
    clock += 10000; // each session lasted 10 s with no words
    win.__fakeEnd();
  }
  await tick(80);
  assert.equal(d.state, 'listening');
  d.cancel();
});

test('a network blip is retried; repeated network errors are reported', async () => {
  const win = {};
  const fake = installFakeSpeech(win);
  const d = new Dictation({ win });
  const errors = [];
  d.onerror = (c) => errors.push(c);
  d.start();
  await tick();
  fake.current.onerror({ error: 'network' });
  win.__fakeEnd();
  await tick(100);
  assert.equal(d.state, 'listening', 'one blip is retried');
  for (let i = 0; i < 6; i++) {
    fake.current.onerror({ error: 'network' });
    win.__fakeEnd();
    await tick(100);
  }
  assert.equal(d.state, 'idle');
  assert.deepEqual(errors, ['network']);
});

test('stop falls back to idle if the browser never ends the session', async () => {
  const win = {};
  const fake = installFakeSpeech(win);
  const d = new Dictation({ win });
  d.start();
  await tick();
  fake.current.stop = () => {}; // a browser that never fires onend
  d.stop();
  assert.equal(d.state, 'listening');
  await tick(1700);
  assert.equal(d.state, 'idle');
});

test('cancel discards words still in flight', async () => {
  const win = {};
  const fake = installFakeSpeech(win);
  const d = new Dictation({ win });
  const finals = [];
  d.onfinal = (t) => finals.push(t);
  d.start();
  await tick();
  const rec = fake.current;
  d.cancel();
  assert.equal(d.state, 'idle');
  rec.running = true;
  rec.onresult && rec.onresult({ resultIndex: 0, results: [Object.assign([{ transcript: 'late words' }], { isFinal: true })] });
  assert.deepEqual(finals, []);
});

test('Android uses short sessions to avoid repeated text', () => {
  const win = { navigator: { userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7)' } };
  installFakeSpeech(win);
  assert.equal(new Dictation({ win }).continuous, false);
  assert.equal(new Dictation({ win: { navigator: { userAgent: 'Mozilla/5.0 (Macintosh)' } } }).continuous, true);
});

test('a block after a working session reads as a pause', async () => {
  const win = {};
  const fake = installFakeSpeech(win);
  const d = new Dictation({ win });
  const errors = [];
  d.onerror = (c) => errors.push(c);
  d.start();
  await tick();
  fake.current.onerror({ error: 'not-allowed' });
  win.__fakeEnd();
  await tick();
  assert.deepEqual(errors, ['interrupted']);
});

test('stopping during the restart gap goes idle straight away', async () => {
  const win = { navigator: { userAgent: 'Android' } };
  const fake = installFakeSpeech(win);
  const d = new Dictation({ win });
  d.start();
  await tick();
  win.__fakeEnd();
  d.stop();
  assert.equal(d.state, 'idle');
  await tick(400);
  assert.equal(d.state, 'idle');
  assert.equal(fake.instances.length, 1, 'no restart after stop');
});
