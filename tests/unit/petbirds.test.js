import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PET_BIRD_QLD_SOURCES, isPetBirdQld, petBirdSourcesForPrompt } from '../../src/sources-petbirds-qld.js';
import { sourcesForPrompt } from '../../src/sources.js';
import { setRegion } from '../../src/region.js';

test('pet bird sources apply only to pet birds in Queensland', () => {
  assert.equal(isPetBirdQld('Is a galah kept in a 60 cm cage in Logan acceptable?', 'vic'), true); // a Queensland place counts too
  assert.equal(isPetBirdQld('A pet cockatoo kept in a small cage', 'qld'), true);
  assert.equal(isPetBirdQld('Backyard hens with no shade in Brisbane', 'vic'), true);
  assert.equal(isPetBirdQld('Budgies in an overcrowded aviary', 'vic'), false); // Victoria chosen, no Queensland place named
  assert.equal(isPetBirdQld('A wild rainbow lorikeet with paralysis', 'qld'), false); // wildlife, not a pet
  assert.equal(petBirdSourcesForPrompt('Possums in a roof', 'qld'), '');
  const lines = petBirdSourcesForPrompt('pet budgies kept in a tiny cage', 'qld');
  assert.match(lines, /Animal Care and Protection Act 2001/);
  assert.match(lines, /Code of Practice for the Housing of Caged Birds/);
});

test('the pet bird sources never reach the wildlife library or care plans', () => {
  setRegion('qld');
  const all = sourcesForPrompt('pet budgies kept in a tiny cage in Brisbane');
  for (const s of PET_BIRD_QLD_SOURCES) assert.ok(!all.includes(s.id), s.id);
  setRegion('vic');
});

test('every pet bird source has a title, publisher, date, link and points, and none cite the RSPCA', () => {
  for (const s of PET_BIRD_QLD_SOURCES) {
    assert.ok(s.id && s.title && s.publisher && s.date && /^https:\/\//.test(s.url) && s.points.length, s.id);
    assert.doesNotMatch(JSON.stringify(s), /rspca/i, s.id);
  }
});
