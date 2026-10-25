import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dropUnsaidBrands } from '../../src/drugs.js';

test('brand names the vet never said come out, the active ingredient stays', () => {
  const said = 'premed acp 0.03mg/kg + methadone 0.3mg/kg im, iso maint. meloxicam 0.1 mg/kg sc';
  assert.equal(dropUnsaidBrands('methadone (Methone) 0.3 mg/kg IM', said), 'methadone 0.3 mg/kg IM');
  assert.equal(dropUnsaidBrands('Treatment given: Meloxicam (Metacam) 0.1 mg/kg SC.', said), 'Treatment given: Meloxicam 0.1 mg/kg SC.');
  assert.equal(dropUnsaidBrands('IsoFlo (isoflurane)', said), 'Isoflurane');
  assert.equal(dropUnsaidBrands('Maintained on IsoFlo (isoflurane).', said), 'Maintained on isoflurane.');
  // ACP was said, so it stays with its active ingredient.
  assert.equal(dropUnsaidBrands('ACP (acepromazine) 0.03 mg/kg', said), 'ACP (acepromazine) 0.03 mg/kg');
});

test('a brand that was said, even misheard, is kept', () => {
  assert.equal(dropUnsaidBrands('Cydectin (moxidectin) pour-on', 'treated with side ectin pour on'), 'Cydectin (moxidectin) pour-on');
  assert.equal(dropUnsaidBrands('Metacam (meloxicam) 0.1 mg/kg', 'meta cam point one'), 'Metacam (meloxicam) 0.1 mg/kg');
  assert.equal(dropUnsaidBrands('Amoxyclav 12.5 mg/kg', 'amoxyclav'), 'Amoxyclav 12.5 mg/kg');
  assert.equal(dropUnsaidBrands('', 'x'), '');
});
