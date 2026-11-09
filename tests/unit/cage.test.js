import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cageRecord, withEntry, normaliseLog, LOG_MAX, currentStatus, weightTrend, grams, showWeight, lastGiven } from '../../src/cage.js';
import { cageLink, cageHash } from '../../src/sharelink.js';

test('the stored chart leaves out the edit key and keeps only a JPEG photo', () => {
  const d = { title: 'Possum 24-118', sections: [], cage: { id: 'abcdEFGH2345', key: 'k'.repeat(24), photo: 'data:image/jpeg;base64,AAAA' } };
  const r = cageRecord(d, 'data:image/jpeg;base64,AAAA');
  assert.equal(r.type, 'doc');
  assert.equal(r.kind, 'cage');
  assert.equal(r.d.cage, undefined);
  assert.equal(r.photo, 'data:image/jpeg;base64,AAAA');
  assert.equal(cageRecord(d, 'javascript:alert(1)').photo, null);
  assert.deepEqual(r.log, []);
});

test('daily record entries: structured, tidied, added on the end, and capped', () => {
  let log = withEntry([], { weight_g: '410', ate: 'Most', wee: 'Yes', poo: 'Normal', mood: 'Bright', meds: ['Meloxicam 0.2 mg/kg SC'], text: '  ate  well ', by: 'AB' }, 1000);
  log = withEntry(log, { status: 'Pre-release', ate: 'Lots' }, 2000);
  assert.deepEqual(log[0], { at: 1000, by: 'AB', weight_g: 410, ate: 'Most', wee: 'Yes', poo: 'Normal', mood: 'Bright', meds: ['Meloxicam 0.2 mg/kg SC'], status: '', text: 'ate well' });
  assert.equal(log[1].ate, ''); // not one of the choices
  assert.equal(log[1].status, 'Pre-release');
  assert.deepEqual(normaliseLog([{ at: 1, text: '' }, { text: 'no time' }, 'junk', { at: 5, ate: 'Lots' }]), []);
  const many = Array.from({ length: LOG_MAX + 5 }, (_, i) => ({ at: i + 1, text: `e${i}` }));
  assert.equal(normaliseLog(many).length, LOG_MAX);
  assert.equal(normaliseLog(many).at(-1).text, `e${LOG_MAX + 4}`);
});

test('status, weights and when each medicine was last given come from the daily record', () => {
  const log = [
    { at: 1000, weight_g: 2000, meds: ['Meloxicam'], by: 'AB' },
    { at: 2000, status: 'Pre-release' },
    { at: 3000, weight_g: 2100, meds: ['Meloxicam'], by: 'CD' },
  ];
  assert.equal(currentStatus(log, 'Intensive care'), 'Pre-release');
  assert.equal(currentStatus([], 'Intensive care'), 'Intensive care');
  assert.deepEqual(weightTrend(grams('Admission weight 1.9 kg'), log), { first: 1900, last: 2100, count: 3, change: 10.5 });
  assert.equal(weightTrend(null, []), null);
  assert.equal(lastGiven(log).Meloxicam.by, 'CD');
  assert.equal(grams('410 g'), 410);
  assert.equal(grams('2.05 kg'), 2050);
  assert.equal(grams('Not recorded'), null);
  assert.equal(showWeight(2050), '2.05 kg');
  assert.equal(showWeight(410), '410 g');
});

test('the QR link carries the chart id and key, and nothing else opens as a chart', () => {
  const here = new URL('https://ashley-pettit.github.io/Vet-consult/care/');
  const url = cageLink('abcdEFGH2345', 'k'.repeat(24), here);
  assert.equal(url, `https://ashley-pettit.github.io/Vet-consult/care/#c=abcdEFGH2345.${'k'.repeat(24)}`);
  assert.deepEqual(cageHash(new URL(url).hash), { id: 'abcdEFGH2345', key: 'k'.repeat(24) });
  assert.equal(cageHash('#c=abc.def'), null);
  assert.equal(cageHash('#r=abcdEFGH2345.' + 'k'.repeat(24)), null);
});
