import { test } from 'node:test';
import assert from 'node:assert/strict';
import { speciesKey, vitalFlags, parsePerKg, doseTotals, localChecks } from '../../src/clinical.js';
import { normaliseNote, EXAMPLE_NOTE, EXAMPLE_BATCH_NOTES } from '../../src/note.js';

test('species names map to a reference range', () => {
  for (const [s, k] of [['Canine', 'dog'], ['dog', 'dog'], ['Feline', 'cat'], ['DSH cat', 'cat'], ['Rabbit', 'rabbit'], ['Guinea pig', 'guineapig'], ['ferret', 'ferret'], ['Bearded dragon', null], ['', null]]) {
    assert.equal(speciesKey(s), k, s);
  }
});

test('vitals outside the species range are flagged with a readable check', () => {
  const n = normaliseNote(EXAMPLE_NOTE);
  const { flags, checks } = vitalFlags(n);
  assert.deepEqual(flags, { temp_c: 'high' });
  assert.match(checks[0], /Temp 39\.4 °C is high for a dog \(38 to 39\.2\)\. Correct\?/);
  const cat = normaliseNote({ patient: { species: 'cat' }, objective: { vitals: { temp_c: '37.0', hr_bpm: '260', rr_bpm: '30' } } });
  assert.deepEqual(vitalFlags(cat).flags, { temp_c: 'low', hr_bpm: 'high' });
  const unknown = normaliseNote({ patient: { species: 'snake' }, objective: { vitals: { temp_c: '20' } } });
  assert.deepEqual(vitalFlags(unknown).flags, {});
});

test('per-kg doses parse in common spoken forms', () => {
  assert.deepEqual(parsePerKg('22 mg/kg'), { lo: 22, hi: null, unit: 'mg' });
  assert.deepEqual(parsePerKg('0.1-0.2 mg / kg'), { lo: 0.1, hi: 0.2, unit: 'mg' });
  assert.deepEqual(parsePerKg('5 µg/kg'), { lo: 5, hi: null, unit: 'mcg' });
  assert.deepEqual(parsePerKg('10 mL/kg/h'), { lo: 10, hi: null, unit: 'mL' });
  assert.equal(parsePerKg('Per label'), null);
  assert.equal(parsePerKg('300 mL'), null);
});

test('dose totals use the recorded weight and never touch the note', () => {
  const n = normaliseNote(EXAMPLE_NOTE);
  const before = JSON.stringify(n);
  const d = doseTotals(n);
  assert.equal(d.length, 2);
  assert.equal(d[0].total, '312.4 mg');
  assert.equal(d[1].total, '1.42 mg');
  assert.match(d[0].check, /Cephalexin: 22 mg\/kg × 14\.2 kg = 312\.4 mg per dose/);
  assert.equal(JSON.stringify(n), before);
  const range = normaliseNote({ patient: { weight_kg: '4' }, plan: { treatments: [{ drug: 'X', dose: '0.1-0.2 mg/kg' }] } });
  assert.equal(doseTotals(range)[0].total, '0.4 to 0.8 mg');
  assert.deepEqual(doseTotals(normaliseNote({ plan: { treatments: [{ drug: 'X', dose: '1 mg/kg' }] } })), []);
});

test('local checks combine flags and doses', () => {
  const c = localChecks(normaliseNote(EXAMPLE_NOTE));
  assert.equal(c.checks.length, 1);
  assert.equal(c.doses.length, 2);
  assert.equal(c.flags.temp_c, 'high');
});

test('kitten examples sit inside the cat range', () => {
  for (const k of EXAMPLE_BATCH_NOTES) assert.deepEqual(vitalFlags(normaliseNote(k)).flags, {});
});
