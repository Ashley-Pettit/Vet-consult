import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COMMON_DRUGS, drugsForPrompt } from '../../src/drugs.js';
import { buildPrompt, buildCarerPlanPrompt } from '../../src/note.js';

test('Australian brands come with their active ingredients', () => {
  for (const name of ['Metacam (meloxicam)', 'Clavulox (amoxicillin and clavulanic acid)', 'Baytril (enrofloxacin)', 'Cydectin (moxidectin)', 'Bravecto (fluralaner)', 'Zoletil (tiletamine and zolazepam)', "Hartmann's (compound sodium lactate)"]) {
    assert.ok(COMMON_DRUGS.includes(name), name);
  }
});

test('the vet\'s own drugs go first and are preferred', () => {
  const p = drugsForPrompt('Our mange wash\nMetacam 1.5 mg/mL oral');
  assert.match(p, /own drugs and products \(prefer these spellings\): Our mange wash; Metacam 1\.5 mg\/mL oral/);
  assert.ok(p.indexOf('Our mange wash') < p.indexOf('Pain and anti-inflammatory'));
  assert.doesNotMatch(drugsForPrompt(''), /own drugs/);
});

test('vet notes and carer plans both know the drug names', () => {
  assert.match(buildPrompt('metacam point two mils', { drugs: 'Wombat wash' }), /Wombat wash[\s\S]*Metacam \(meloxicam\)/);
  assert.match(buildCarerPlanPrompt('baytril', '', { drugs: '' }), /Baytril \(enrofloxacin\)/);
});

test('vet shorthand is taught to vet notes and vet care plans', async () => {
  const { buildCarerPlanPrompt: plan } = await import('../../src/note.js');
  const vp = buildPrompt('BAR, MM pink, CRT <2, NAD. Metacam SID PO, R/C 2/52');
  assert.match(vp, /QAR quiet, alert, responsive/);
  assert.match(vp, /2\/52 = in 2 weeks/);
  assert.match(plan('BAR', '', { fromVet: true }), /SID once a day/);
  assert.doesNotMatch(plan('Ringtail joey', '', {}), /Vet shorthand/);
});

test('species points: only the animal named, carers get carer points, nothing for unknown animals', async () => {
  const { vetCareForPrompt, groupsIn } = await import('../../src/species-vet.js');
  assert.deepEqual(groupsIn('Possum CBC'), ['ringtail', 'brushtail']);
  const koala = vetCareForPrompt('Koala with wet bottom');
  assert.match(koala, /^koala \| drugs/m);
  assert.doesNotMatch(koala, /^wombat \|/m);
  assert.match(koala, /Never add a drug or a dose the vet did not say/);
  const carer = vetCareForPrompt('wombat with mange', { audience: 'carer' });
  assert.ok(carer.length > 0);
  assert.doesNotMatch(carer, /\| anaesthesia \|/);
  assert.equal(vetCareForPrompt('sick animal, not eating'), '');
  assert.match(buildPrompt('EGK joey HBC, BAR'), /macropod \| /);
});
