import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cageRecord, withEntry, normaliseLog, LOG_MAX } from '../../src/cage.js';
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

test('chart entries: added on the end, tidied, and capped', () => {
  let log = withEntry([], '  410 g,  fed 20 mL ', 'AB', 1000);
  log = withEntry(log, 'Meloxicam given', '', 2000);
  assert.deepEqual(log, [{ at: 1000, text: '410 g, fed 20 mL', by: 'AB' }, { at: 2000, text: 'Meloxicam given', by: '' }]);
  assert.deepEqual(normaliseLog([{ at: 1, text: '' }, { text: 'no time' }, 'junk']), []);
  const many = Array.from({ length: LOG_MAX + 5 }, (_, i) => ({ at: i + 1, text: `e${i}` }));
  assert.equal(normaliseLog(many).length, LOG_MAX);
  assert.equal(normaliseLog(many).at(-1).text, `e${LOG_MAX + 4}`);
});

test('the QR link carries the chart id and key, and nothing else opens as a chart', () => {
  const here = new URL('https://ashley-pettit.github.io/Vet-consult/care/');
  const url = cageLink('abcdEFGH2345', 'k'.repeat(24), here);
  assert.equal(url, `https://ashley-pettit.github.io/Vet-consult/care/#c=abcdEFGH2345.${'k'.repeat(24)}`);
  assert.deepEqual(cageHash(new URL(url).hash), { id: 'abcdEFGH2345', key: 'k'.repeat(24) });
  assert.equal(cageHash('#c=abc.def'), null);
  assert.equal(cageHash('#r=abcdEFGH2345.' + 'k'.repeat(24)), null);
});
