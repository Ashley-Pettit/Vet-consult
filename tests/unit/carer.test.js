import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SOURCES, SOURCE_IDS, lookupSource, sourcesForPrompt } from '../../src/sources.js';
import {
  buildCarerPlanPrompt, buildCareSheetPrompt, normaliseCareSheet, careSheetText, normaliseNote,
  EXAMPLE_CARE_SHEET, EXAMPLE_CARER_PLAN, EXAMPLE_FOSTER_PLAN, EXAMPLE_CARER_DICTATION,
} from '../../src/note.js';

test('source library: unique ids, https links, Queensland first in the prompt', () => {
  const ids = SOURCES.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(SOURCES.length >= 15);
  for (const s of SOURCES) {
    assert.match(s.url, /^https:\/\//, s.id);
    assert.ok(['qld', 'au'].includes(s.scope), s.id);
    assert.ok(s.points.length >= 3, s.id);
  }
  const lines = sourcesForPrompt().split('\n');
  const firstAu = lines.findIndex((l) => l.includes(' | au | '));
  const lastQld = lines.map((l) => l.includes(' | qld | ')).lastIndexOf(true);
  assert.ok(lastQld < firstAu, 'all Queensland sources come before Australian ones');
});

test('carer plan prompt: straight from comments, vet only for escalation, sources included', () => {
  const p = buildCarerPlanPrompt(EXAMPLE_CARER_DICTATION, sourcesForPrompt());
  assert.match(p, /<comments>\nCarer plan for an adult rainbow lorikeet/);
  assert.match(p, /ONLY an escalation contact/);
  assert.match(p, /Do NOT tell them to report to, update or check in with the vet/);
  assert.match(p, /Prefer Queensland \(scope qld\) sources/);
  assert.match(p, /qld-cop-protected-animals-release \| qld \|/);
  assert.match(p, /"release":\{"ready_when":\[\],"how":\[\],"where":""\}/);
  assert.match(buildCareSheetPrompt(normaliseNote(EXAMPLE_CARE_SHEET), sourcesForPrompt()), /<note>/);
});

test('normalise drops invented source ids and keeps release for wildlife only', () => {
  const ids = SOURCE_IDS();
  const n = normaliseCareSheet({ ...EXAMPLE_CARER_PLAN, sources: ['qld-gov-helping-injured-wildlife', 'made-up-blog'] }, ids);
  assert.deepEqual(n.sources, ['qld-gov-helping-injured-wildlife']);
  assert.equal(n.kind, 'wildlife');
  assert.ok(n.release.ready_when.length > 0);
  const dom = normaliseCareSheet({ ...EXAMPLE_FOSTER_PLAN, release: { ready_when: ['x'], how: ['y'], where: 'z' } }, ids);
  assert.equal(dom.kind, 'domestic');
  assert.deepEqual(dom.release, { ready_when: [], how: [], where: '' });
});

test('every example cites only real sources, with Queensland first', () => {
  const ids = SOURCE_IDS();
  for (const ex of [EXAMPLE_CARE_SHEET, EXAMPLE_CARER_PLAN, EXAMPLE_FOSTER_PLAN]) {
    assert.ok(ex.sources.length > 0);
    for (const id of ex.sources) assert.ok(ids.has(id), id);
    assert.equal(lookupSource(ex.sources[0]).scope, 'qld');
  }
});

test('plain text plan: release, escalation and Based on, no reporting to the vet', () => {
  const t = careSheetText(normaliseCareSheet(EXAMPLE_CARER_PLAN, SOURCE_IDS()), lookupSource);
  assert.match(t, /^Care plan: Adult rainbow lorikeet/);
  assert.match(t, /Release\nReady when: /);
  assert.match(t, /Where: At the recorded rescue spot/);
  assert.match(t, /Based on\n- Code of Practice: Care of sick/);
  assert.match(t, /https:\/\/www\.detsi\.qld\.gov\.au\//);
  assert.doesNotMatch(t, /message the|report to the vet|keep the clinic updated/i);
});
