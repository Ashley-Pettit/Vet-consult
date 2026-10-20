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
  win.__fakeEnd();
  await tick();
  assert.equal(d.state, 'listening');
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
