import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeAmend, buildAmendPrompt } from '../../src/note.js';

test('a care plan change keeps every part that did not come back', () => {
  const plan = { animal: 'Wombat', summary: 'Old summary', housing: ['Quiet pen'], feeding: ['Grass'], check: [] };
  const out = mergeAmend(plan, { housing: ['Keep it cool and shaded tomorrow (36°C)', 'Quiet pen'] });
  assert.deepEqual(out, { animal: 'Wombat', summary: 'Old summary', housing: ['Keep it cool and shaded tomorrow (36°C)', 'Quiet pen'], feeding: ['Grass'], check: [] });
  // A full reply (old behaviour) still lands as it is.
  assert.deepEqual(mergeAmend(plan, { ...plan, summary: 'New' }), { ...plan, summary: 'New' });
});

test('document sections change in place, are added after the one named, or removed', () => {
  const doc = { title: 'T', sections: [{ heading: 'A', text: '1', items: [] }, { heading: 'B', text: '2', items: [] }, { heading: 'C', text: '3', items: [] }], check: [] };
  const out = mergeAmend(doc, { sections: [{ heading: 'b', text: '2 changed', items: [] }, { heading: 'New', text: 'n', items: [], after: 'A' }, { heading: 'C', remove: true }] });
  assert.deepEqual(out.sections.map((s) => [s.heading, s.text]), [['A', '1'], ['New', 'n'], ['b', '2 changed']]);
  assert.equal(out.title, 'T');
});

test('the change prompt asks for only the changed parts, and section rules only for documents', () => {
  assert.match(buildAmendPrompt('care plan', { housing: [] }, 'x'), /just the top-level keys you changed/);
  assert.doesNotMatch(buildAmendPrompt('care plan', { housing: [] }, 'x'), /"after"/);
  assert.match(buildAmendPrompt('MOP plan', { sections: [] }, 'x'), /"after": the heading it follows/);
});
