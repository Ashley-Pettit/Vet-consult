import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planToText, textToPlan, normaliseCareSheet, PLAN_TEXT_PARTS } from '../../src/note.js';
import LIBRARY from '../../src/library-plans.js';

test('every ready-made plan opens as a full care plan with no calendar dates', () => {
  const ids = new Set();
  for (const a of LIBRARY.animals) {
    assert.ok(a.plans.length >= 2, a.name);
    for (const p of a.plans) {
      assert.ok(!ids.has(p.id), p.id);
      ids.add(p.id);
      const c = normaliseCareSheet(p.sheet, null);
      assert.ok(c.summary && c.housing.length && c.feeding.length, p.id);
      assert.doesNotMatch(JSON.stringify(p.sheet), /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b|\d{1,2}\/\d{1,2}\/\d{2,4}/, p.id);
    }
  }
  for (const a of ['wombat', 'koala', 'duck']) assert.ok(LIBRARY.animals.some((x) => x.id === a), a);
});

test('a plan edited as text comes back with the changes and nothing else touched', () => {
  const c = normaliseCareSheet(LIBRARY.animals[0].plans[0].sheet, null);
  const t = planToText(c);
  assert.deepEqual(Object.keys(t), PLAN_TEXT_PARTS.map(([k]) => k));
  // Unchanged text gives the same plan.
  assert.deepEqual(normaliseCareSheet(textToPlan(c, t), null), c);
  const edited = textToPlan(c, { ...t, housing: `${t.housing}\nKeep the room below 25°C`, plan: 'Day 1:\n- Weigh before the first feed; then feed every 3 hours\nCheck the pouch temperature\nWeek 2:\n- Start the next milk stage', 'release.where': 'Where it was found' });
  assert.equal(edited.housing.at(-1), 'Keep the room below 25°C');
  assert.deepEqual(edited.plan, [{ when: 'Day 1', tasks: ['Weigh before the first feed; then feed every 3 hours', 'Check the pouch temperature'] }, { when: 'Week 2', tasks: ['Start the next milk stage'] }]);
  assert.equal(edited.release.where, 'Where it was found');
  assert.deepEqual(edited.feeding, c.feeding);
  assert.deepEqual(edited.feed_calc, c.feed_calc);
});
