import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withLiveRules, CARER_TONE, DOSE_CHECK, CARE_DOSES } from '../../src/templates.js';
import { buildCarerPlanPrompt, buildPrompt, buildAmendPrompt, buildRevisionPrompt, EXAMPLE_JOEY_CARER_DICTATION, EXAMPLE_DICTATION } from '../../src/note.js';

test('care plans (and changes to them) get the positive tone and no-dose-sums rules; clinical notes do not', () => {
  const plan = withLiveRules(buildCarerPlanPrompt(EXAMPLE_JOEY_CARER_DICTATION));
  assert.ok(plan.includes(CARER_TONE));
  assert.ok(plan.includes(CARE_DOSES));
  assert.doesNotMatch(plan, /I'm not certain of this/);
  assert.match(CARER_TONE, /never criticise/i);
  assert.ok(withLiveRules(buildAmendPrompt('care plan', { title: 'x' }, 'feeds every 3 hours')).includes(CARER_TONE));
  const notes = withLiveRules(buildPrompt(EXAMPLE_DICTATION));
  assert.ok(!notes.includes(CARER_TONE));
});

test('clinical notes and their revisions ask about a dose far off the usual range, right after the check rule', () => {
  for (const p of [buildPrompt(EXAMPLE_DICTATION), buildRevisionPrompt({ check: ['x'] }, ['x'], 'y')]) {
    const live = withLiveRules(p);
    assert.ok(!p.includes(DOSE_CHECK));
    assert.ok(live.includes(DOSE_CHECK));
    assert.ok(live.indexOf(DOSE_CHECK) > live.indexOf('- "check" lists only what the vet must verify'));
  }
});
