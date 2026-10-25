import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rangesForAnimal } from '../../src/species-ranges.js';

const rows = (id, context) => rangesForAnimal(id, 'vic', context).warmth.map(([k]) => k);

test('a joey with early fur keeps the lightly furred pouch temperature; a furred joey skips it', () => {
  assert.ok(rows('macropod', 'eastern grey joey, early fur just coming through on the back').includes('Lightly furred'));
  assert.ok(rows('ringtail', 'ringtail joey at the velvet stage').some((k) => /^Velvet/.test(k)));
  assert.deepEqual(rows('macropod', 'furred joey 3 kg'), ['Fully furred']);
});

test('prompts get the general sources and those for the animal named; mange guides follow the word mange', async () => {
  const { sourcesForPrompt } = await import('../../src/sources.js');
  const ids = (t) => sourcesForPrompt(t).split('\n').map((l) => l.split(' | ')[0]);
  const all = ids('');
  const roo = ids('eastern grey roo joey, early fur');
  assert.ok(roo.length < all.length);
  assert.ok(roo.includes('vic-cop-welfare-wildlife-rehabilitation')); // general sources always go in
  assert.ok(!roo.includes('vic-rehab-guidelines-koalas'));
  assert.ok(ids('koala with mange').includes('vic-mange-management'));
  assert.deepEqual(ids('sick animal, not eating'), all); // nothing recognised: everything goes in
});
