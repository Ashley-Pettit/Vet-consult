import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SOURCES, SOURCE_IDS, lookupSource, sourcesForPrompt } from '../../src/sources.js';
import {
  buildCarerPlanPrompt, buildCareSheetPrompt, normaliseCareSheet, careSheetText, normaliseNote,
  EXAMPLE_CARE_SHEET, EXAMPLE_CARER_PLAN, EXAMPLE_FOSTER_PLAN, EXAMPLE_CARER_DICTATION,
} from '../../src/note.js';

test('source library: unique ids, https links, Victoria first in the prompt, no dose figures', () => {
  const ids = SOURCES.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(SOURCES.length >= 12);
  for (const s of SOURCES) {
    assert.match(s.url, /^https:\/\//, s.id);
    assert.ok(['vic', 'au'].includes(s.scope), s.id);
    assert.ok(s.points.length >= 3, s.id);
    for (const pt of s.points) assert.doesNotMatch(pt, /\d\s?(mg|ml)\/kg/i, s.id);
  }
  const lines = sourcesForPrompt().split('\n');
  const firstAu = lines.findIndex((l) => l.includes(' | au | '));
  const lastVic = lines.map((l) => l.includes(' | vic | ')).lastIndexOf(true);
  assert.ok(lastVic < firstAu, 'all Victorian sources come before national ones');
});

test('carer plan prompt: straight from comments, vet only for escalation, sources included', () => {
  const p = buildCarerPlanPrompt(EXAMPLE_CARER_DICTATION, sourcesForPrompt());
  assert.match(p, /<comments>\nCarer plan for an adult rainbow lorikeet/);
  assert.match(p, /ONLY an escalation contact/);
  assert.match(p, /Do NOT tell them to report to, update or check in with the vet/);
  assert.match(p, /Prefer Victorian \(scope vic\) sources/);
  assert.match(p, /vic-release-requirements \| vic \|/);
  assert.match(p, /"release":\{"ready_when":\[\],"how":\[\],"where":""\}/);
  assert.match(buildCareSheetPrompt(normaliseNote(EXAMPLE_CARE_SHEET), sourcesForPrompt()), /<note>/);
});

test('normalise drops invented source ids and keeps release for wildlife only', () => {
  const ids = SOURCE_IDS();
  const n = normaliseCareSheet({ ...EXAMPLE_CARER_PLAN, sources: ['vic-release-requirements', 'made-up-blog'] }, ids);
  assert.deepEqual(n.sources, ['vic-release-requirements']);
  assert.equal(n.kind, 'wildlife');
  assert.ok(n.release.ready_when.length > 0);
  const dom = normaliseCareSheet({ ...EXAMPLE_FOSTER_PLAN, release: { ready_when: ['x'], how: ['y'], where: 'z' } }, ids);
  assert.equal(dom.kind, 'domestic');
  assert.deepEqual(dom.release, { ready_when: [], how: [], where: '' });
});

test('plain text plan: release, escalation and Based on, no reporting to the vet', () => {
  const t = careSheetText(normaliseCareSheet({ ...EXAMPLE_CARER_PLAN, sources: ['vic-shelter-foster-carer-authorisation'] }, SOURCE_IDS()), lookupSource);
  assert.match(t, /^Care plan: Adult rainbow lorikeet/);
  assert.match(t, /Release\nReady when: /);
  assert.match(t, /Where: At the recorded rescue spot/);
  assert.match(t, /Based on\n- Wildlife shelters and foster carers/);
  assert.match(t, /https:\/\/vic\.gov\.au\//);
  assert.doesNotMatch(t, /message the|report to the vet|keep the clinic updated/i);
});

test('care plan has no never-give or no-vet sections', () => {
  const p = buildCarerPlanPrompt('wombat', sourcesForPrompt());
  assert.doesNotMatch(p, /never_give|no_vet|Never give or do/);
  const t = careSheetText(normaliseCareSheet(EXAMPLE_CARER_PLAN, SOURCE_IDS()), lookupSource);
  assert.doesNotMatch(t, /Never give or do|Can't reach a vet/);
});
