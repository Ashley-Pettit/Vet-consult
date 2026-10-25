import { test } from 'node:test';
import assert from 'node:assert/strict';

// A stand-in for the browser's localStorage.
const mem = new Map();
globalThis.window = { localStorage: { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) } };
const { store } = await import('../../src/storage.js');

test('background drafts stop after three unused in a row and start again once one is used', () => {
  mem.clear();
  const k = 'care-notes';
  for (let i = 0; i < 3; i++) {
    assert.equal(store.wantsExtra(k), true, `offer ${i + 1}`);
    store.offerExtra(k);
  }
  assert.equal(store.wantsExtra(k), false);
  store.offerExtra(k); // still offered (not started), so the next use is counted
  store.usedExtra(k);
  assert.equal(store.wantsExtra(k), true);
  // Another kind is tracked on its own.
  assert.equal(store.wantsExtra('intake-care'), true);
  store.clearAll();
  assert.equal(store.wantsExtra(k), true);
});
