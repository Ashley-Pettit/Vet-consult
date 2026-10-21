import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DOC_KINDS, buildDocPrompt, normaliseDoc, docText, dueLabel, EXAMPLE_INSPECTOR_DOC, EXAMPLE_ADOPTION_DOC } from '../../src/note.js';

test('inspector prompt keeps facts and opinion apart and makes no legal finding', () => {
  const p = buildDocPrompt('inspector', 'kelpie BCS 2', { clinician: 'Dr Lee', photoCount: 2 });
  assert.match(p, /Animal Care and Protection Act 2001 \(Qld\)/);
  assert.match(p, /Keep observed FACTS .* separate from veterinary OPINION/);
  assert.match(p, /Do not say whether an offence was committed/);
  assert.match(p, /2 photo\(s\) are attached/);
  assert.match(p, /The vet is Dr Lee/);
  assert.match(p, /<comments>\nkelpie BCS 2\n<\/comments>/);
  assert.throws(() => buildDocPrompt('nope', 'x'));
});

test('adoption prompt never invents vaccines, dates or chip numbers', () => {
  const p = buildDocPrompt('adoption', 'Bella');
  assert.match(p, /Never invent vaccination products, dates, microchip numbers/);
  assert.match(p, /"due":\[\{"what":"","when":""\}\]/);
  assert.deepEqual(Object.keys(DOC_KINDS), ['inspector', 'adoption']);
});

test('normaliseDoc: text or items per section, drops empties, caps checks', () => {
  const d = normaliseDoc({
    title: 'T', sections: [{ heading: 'A', text: 'para', items: ['x'] }, { heading: 'B', text: 'only text' }, { heading: '', items: ['y'] }, { heading: 'C' }],
    due: [{ what: 'Vaccine', when: 'in 12 months' }, { when: 'orphan' }], check: ['1', '2', '3', '4', '5', '6'],
  });
  assert.deepEqual(d.sections.map((s) => s.heading), ['A', 'B']);
  assert.equal(d.sections[0].text, ''); // items win
  assert.equal(d.due.length, 1);
  assert.equal(d.check.length, 5);
});

test('due labels and plain text', () => {
  assert.equal(dueLabel('in 12 months', new Date(2026, 9, 21)), 'in 12 months (due 21/10/2027)');
  assert.equal(dueLabel('at the next visit'), 'at the next visit');
  const t = docText(normaliseDoc(EXAMPLE_ADOPTION_DOC), new Date(2026, 9, 21));
  assert.match(t, /^Bella’s health summary\nFor Bella’s new family/);
  assert.match(t, /HEALTH AT A GLANCE\n- Desexed: yes/);
  assert.match(t, /- F3 vaccination booster: in 12 months \(due 21\/10\/2027\)/);
  const r = docText(normaliseDoc(EXAMPLE_INSPECTOR_DOC));
  assert.ok(r.indexOf('EXAMINATION FINDINGS') < r.indexOf('VETERINARY OPINION'));
  assert.match(r, /DECLARATION\n- This report is a true and accurate record/);
});
