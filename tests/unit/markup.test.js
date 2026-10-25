import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Every element the app looks up by id must be on the page: a missing one stops the app starting (October 2026).
const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
const js = readFileSync(new URL('../../src/app.js', import.meta.url), 'utf8');
const MADE_IN_CODE = new Set(['feed-weight', 'note-fact']); // created by the app when needed

test('every id the app looks up exists in index.html', () => {
  const ids = [...new Set([...js.matchAll(/\$\('([a-z0-9-]+)'\)/g)].map((m) => m[1]))];
  const missing = ids.filter((id) => !MADE_IN_CODE.has(id) && !html.includes(`id="${id}"`));
  assert.deepEqual(missing, []);
});
