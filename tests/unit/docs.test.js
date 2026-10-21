import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DOC_KINDS, buildDocPrompt, buildIntakeAndCarePrompt, normaliseDoc, docText, dueLabel } from '../../src/note.js';

test('carer document kinds, in picker order', () => {
  assert.deepEqual(Object.keys(DOC_KINDS), ['intake', 'log', 'tovet', 'funding']);
  for (const k of Object.values(DOC_KINDS)) assert.ok(k.label && k.copy && k.working && k.rule);
});

test('intake prompt keeps the exact rescue location and flags what is missing', () => {
  const p = buildDocPrompt('intake', 'wombat Kilcunda', { clinician: 'Sam', photoCount: 2 });
  assert.match(p, /Record the rescue location exactly as said/);
  assert.match(p, /Wildlife Victoria case number/);
  assert.match(p, /2 photo\(s\) are attached/);
  assert.match(p, /The carer is Sam/);
  assert.match(p, /<comments>\nwombat Kilcunda\n<\/comments>/);
  assert.throws(() => buildDocPrompt('nope', 'x'));
});

test('care log never works out doses and suggests a vet for red flags', () => {
  const p = buildDocPrompt('log', 'joey');
  assert.match(p, /Never work out or change doses/);
  assert.match(p, /suggesting a vet check/);
  assert.match(p, /"due":\[\{"what":"","when":""\}\]/);
});

test('vet summary turns worries into questions', () => {
  const p = buildDocPrompt('tovet', 'Willow');
  assert.match(p, /Questions for the vet/);
  assert.match(p, /Never invent doses, results or diagnoses/);
});

test('normaliseDoc: text or items per section, drops empties, caps checks', () => {
  const d = normaliseDoc({
    title: 'T', sections: [{ heading: 'A', text: 'para', items: ['x'] }, { heading: 'B', text: 'only text' }, { heading: '', items: ['y'] }, { heading: 'C' }],
    due: [{ what: 'Weigh', when: 'in 12 months' }, { when: 'orphan' }], check: ['1', '2', '3', '4', '5', '6'],
  });
  assert.deepEqual(d.sections.map((s) => s.heading), ['A', 'B']);
  assert.equal(d.sections[0].text, ''); // items win
  assert.equal(d.due.length, 1);
  assert.equal(d.check.length, 5);
});

test('due labels and plain text', () => {
  assert.equal(dueLabel('in 12 months', new Date(2026, 9, 21)), 'in 12 months (due 21/10/2027)');
  assert.equal(dueLabel('at the next visit'), 'at the next visit');
  const t = docText(
    normaliseDoc({
      title: 'Oliver care log', subtitle: 'Thursday',
      sections: [{ heading: 'Weight', text: '2.31 kg, up 40 g' }, { heading: 'Feeding', items: ['4 bottle feeds'] }],
      due: [{ what: 'Weigh', when: 'in 12 months' }],
    }),
    new Date(2026, 9, 21),
  );
  assert.match(t, /^Oliver care log\nThursday\n\nWEIGHT\n2\.31 kg, up 40 g/);
  assert.match(t, /FEEDING\n- 4 bottle feeds/);
  assert.match(t, /- Weigh: in 12 months \(due 21\/10\/2027\)/);
});

test('intake starts with the Victorian register fields', () => {
  const p = buildDocPrompt('intake', 'x');
  assert.match(p, /"Case number", "Common name", "Species code", "Date in", "Sex \(M, F or U\)", "Age class", "Main injury", "Cause", "Where found", "Status"/);
});

test('funding draft never invents figures', () => {
  const p = buildDocPrompt('funding', 'trailer');
  assert.match(p, /NEVER invent numbers, animal counts, dollar amounts/);
  assert.match(p, /Wildlife Shelter 15147751/);
});

test('intake asks for the record and the care plan in one reply', () => {
  const p = buildIntakeAndCarePrompt('wombat', { sourceList: 'vic-x | vic | T | point' });
  assert.match(p, /PART 1, "intake"/);
  assert.match(p, /PART 2, "care"/);
  assert.match(p, /\{"intake":\{"title"/);
  assert.match(p, /"care":\{"animal"/);
  assert.match(p, /what to do right now and over the next few hours/);
  assert.match(p, /Reference sources \(id \| scope \| title \| key points\):\nvic-x \| vic/);
  assert.doesNotMatch(p, /never_give|no_vet/);
});

test('for the vet starts with a ready-to-send text', () => {
  assert.match(buildDocPrompt('tovet', 'x'), /"Text to your vet": one plain message of at most 450 characters/);
});
