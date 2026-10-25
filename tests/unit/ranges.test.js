import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rangesForAnimal } from '../../src/species-ranges.js';

const rows = (id, context) => rangesForAnimal(id, 'vic', context).warmth.map(([k]) => k);

test('a joey with early fur keeps the lightly furred pouch temperature; a furred joey skips it', () => {
  assert.ok(rows('macropod', 'eastern grey joey, early fur just coming through on the back').includes('Lightly furred'));
  assert.ok(rows('ringtail', 'ringtail joey at the velvet stage').some((k) => /^Velvet/.test(k)));
  assert.deepEqual(rows('macropod', 'furred joey 3 kg'), ['Fully furred']);
});
