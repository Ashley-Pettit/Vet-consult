import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lostNumbers, lostNote } from '../../src/factcheck.js';

test('numbers dropped or changed by an AI rewrite are found; reworded ones are not', () => {
  assert.deepEqual(lostNumbers('Meloxicam 0.2mg/kg SID x 5d, wt 14.5kg', 'Meloxicam 0.2 mg/kg once daily for 5 days. Weight 14.5 kg.'), []);
  assert.deepEqual(lostNumbers('Meloxicam 0.2 mg/kg', 'Meloxicam 2 mg/kg'), ['0.2']);
  assert.deepEqual(lostNumbers('Temp 38.50', 'Temp 38.5'), []);
  assert.equal(lostNote('a', 'b'), '');
  assert.match(lostNote('HR 120, RR 30', 'HR 120'), /this number: 30/);
});

test('a prescription reply is cleaned: at most 4 items, S8 only when said, repeats a small number, nothing blank', async () => {
  const { normaliseRx, buildRxPrompt } = await import('../../src/note.js');
  const r = normaliseRx({ items: [{ medicine: 'Meloxicam 1.5 mg/mL oral suspension', quantity: '10 mL', directions: 'x', schedule: 'S8', repeats: 99 }, { medicine: '' }, ...Array(6).fill({ medicine: 'A' })], meds: [{ name: 'Meloxicam (pain relief)' }], check: ['a', '', 'b'] });
  assert.equal(r.items.length, 4);
  assert.equal(r.items[0].schedule, 'S8');
  assert.equal(r.items[0].repeats, '12');
  assert.deepEqual(r.check, ['a', 'b']);
  assert.match(buildRxPrompt('metacam 0.1mg/kg sid 5d', { animal: 'ringtail joey' }), /Never add a medicine, strength, dose/);
});
