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
