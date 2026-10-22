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
  assert.match(p, /<comments>\nCare plan for a common ringtail possum joey/);
  assert.match(p, /ONLY an escalation contact/);
  assert.match(p, /Do NOT tell them to report to, update or check in with the vet/);
  assert.match(p, /listed most important first: Victorian Government \(DEECA\) guidance/);
  assert.match(p, /vic-release-requirements \| vic \|/);
  assert.match(p, /"release":\{"ready_when":\[\],"target_weight":"","how":\[\],"where":""\}/);
  assert.match(p, /"feed_calc":\{"applies":false/);
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
  assert.deepEqual(dom.release, { ready_when: [], target_weight: '', how: [], where: '' });
});

test('plain text plan: release, escalation and Based on, no reporting to the vet', async () => {
  const t = careSheetText(normaliseCareSheet({ ...EXAMPLE_CARER_PLAN, sources: ['vic-shelter-foster-carer-authorisation'] }, SOURCE_IDS()), lookupSource);
  assert.match(t, /^Care plan: Ringtail possum joey \(female\)/);
  assert.match(t, /Release\nRelease checklist:\n\[ \] /);
  const { AI_NOTES } = await import('../../src/note.js');
  assert.ok(AI_NOTES.some((n) => t.includes(n)));
  assert.match(t, /Where: Back near where she was found in Wonthaggi/);
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

test('species care points are woven into the plan, not listed, and general bans are left out', async () => {
  const { SPECIES_CARE } = await import('../../src/species-care.js');
  assert.ok(SPECIES_CARE.length >= 30);
  assert.ok(SPECIES_CARE.every((w) => w.species !== 'all' && /^https:\/\//.test(w.url)));
  const p = buildCarerPlanPrompt('joey', sourcesForPrompt());
  assert.match(p, /macropod \| Never give a joey cow's milk/);
  assert.match(p, /work it into the section it belongs to/);
  assert.match(p, /Never make a separate list of warnings/);
  assert.match(p, /Only tell the carer what not to do when it is specific to this animal or its species/);
});

test('example plan is Victorian: known sources only, species points woven in, no QLD left', async () => {
  const n = normaliseCareSheet(EXAMPLE_CARER_PLAN, SOURCE_IDS());
  assert.equal(n.sources.length, EXAMPLE_CARER_PLAN.sources.length);
  assert.ok(n.feeding.some((x) => /Only possum milk: cow’s milk/.test(x)));
  const all = JSON.stringify(EXAMPLE_CARER_PLAN);
  assert.doesNotMatch(all, /qld|Moorooka|Queensland/i);
});

test('Queensland: RSPCA Queensland sources lead, Queensland rules and contacts apply, Victoria again after', async () => {
  const { setRegion } = await import('../../src/region.js');
  setRegion('qld');
  try {
    const list = sourcesForPrompt().split('\n');
    assert.match(list[0], /\(RSPCA Queensland\)/);
    assert.match(list[1], /\(RSPCA Queensland\)/);
    assert.ok(!list.some((l) => / \| vic \| /.test(l)), 'no Victorian sources in Queensland');
    const p = buildCarerPlanPrompt('joey', sourcesForPrompt());
    assert.match(p, /most important first: RSPCA Queensland guidance/);
    assert.match(p, /comply with the Queensland code of practice/);
    assert.match(p, /wildlife care group in Queensland/);
    assert.ok(SOURCE_IDS().has('rspca-qld-foster'));
    assert.ok(!SOURCE_IDS().has('vic-release-requirements'));
    assert.ok(lookupSource('vic-release-requirements'), 'old plans still show their sources');
  } finally {
    setRegion('vic');
  }
  assert.match(sourcesForPrompt().split('\n')[0], / \| vic \| /);
});

test('rehydration amounts come from Fowler’s protocol, worked out on the device', async () => {
  const { rehydrationTable } = await import('../../src/note.js');
  const t = rehydrationTable({ needed: true, weight_g: 120, dehydration_pct: null });
  assert.equal(t.assumed, true);
  assert.deepEqual(t.days.map((d) => [d.pct, d.total, d.every4h]), [[10, 12, 2], [7.5, 9, 1.5], [7.5, 9, 1.5]]);
  const assessed = rehydrationTable({ needed: true, weight_g: 2400, dehydration_pct: 6 });
  assert.equal(assessed.days[0].total, 192); // 5% maintenance + 3% (half of 6%) = 8% of 2400 g
  assert.equal(rehydrationTable({ needed: true, weight_g: null }), null);
  assert.equal(rehydrationTable({ needed: false, weight_g: 100 }), null);
  // Claude never writes amounts; a bad weight is ignored.
  const c = normaliseCareSheet({ ...EXAMPLE_CARER_PLAN, rehydration: { needed: true, weight_g: 'about 120 g', dehydration_pct: 99, steps: ['Warm her first'] } }, SOURCE_IDS());
  assert.equal(c.rehydration.weight_g, 120);
  assert.equal(c.rehydration.dehydration_pct, null);
  assert.match(careSheetText(c, lookupSource), /Rehydration\nFor 120 g, assuming 10% dehydrated:\n- Day 1: 12 mL in total/);
});

test('normal ranges are shown from the checked table, state-specific where sources differ', async () => {
  const { rangesFor, SPECIES_RANGES } = await import('../../src/species-ranges.js');
  for (const [id, g] of Object.entries(SPECIES_RANGES)) {
    assert.ok(g.sources.length && g.sources.every((s) => /^https:\/\//.test(s.url) && s.date && s.publisher), id);
  }
  assert.equal(rangesFor('koala', 'vic').warmth[0][1], '34°C');
  assert.equal(rangesFor('koala', 'qld').warmth[0][1], '34-36°C');
  assert.equal(rangesFor('nope'), null);
  const c = normaliseCareSheet({ ...EXAMPLE_CARER_PLAN, species_group: 'ringtail' }, SOURCE_IDS());
  assert.match(careSheetText(c, lookupSource), /Normal ranges: Common ringtail possum\n- Body temperature: about 36\.1°C[\s\S]*- Unfurred: 32°C/);
  assert.equal(normaliseCareSheet({ ...EXAMPLE_CARER_PLAN, species_group: 'unicorn' }, SOURCE_IDS()).species_group, '');
});

test('carer plans leave out drugs only given at the clinic, and baby-bird videos only show for young birds', async () => {
  const { buildCarerPlanPrompt } = await import('../../src/note.js');
  const { videoFor } = await import('../../src/videos.js');
  assert.match(buildCarerPlanPrompt('RBL, meloxicam given', '', { fromVet: true }), /A drug the vet says was "given", "administered" or "had" at the clinic/);
  assert.equal(videoFor('bird', 'Care plan: rainbow lorikeet (adult)').title, 'How to rescue an orphaned or injured bird'); // without tags
  assert.equal(videoFor('bird', 'rainbow lorikeet adult', ['lorikeet', 'bird']).channel, 'RSPCA QLD');
  assert.equal(videoFor('bird', 'magpie nestling', ['magpie', 'bird']).title, 'DIY baby bird makeshift nest');
  assert.match(videoFor('macropod', 'adult kangaroo').title, /pouch/);
  assert.equal(videoFor('bird', 'Magpie nestling fell from nest').title, 'DIY baby bird makeshift nest');
  assert.match(videoFor('pigeon', 'baby pigeon squab').title, /squeaker/);
  assert.match(videoFor('pigeon', 'adult pigeon, cannot fly').title, /injured pigeon/);
  assert.equal(videoFor('ringtail', 'possum joey').channel, 'Warriors 4 Wildlife');
  assert.match(videoFor('pelican', 'adult pelican with fishing line').title, /pelican/);
  assert.equal(videoFor('koala', '').channel, 'Queensland Government');
});

test('MOP and plan videos match the animal: never a bird video for a koala', async () => {
  const { videoFor, videoForTags } = await import('../../src/videos.js');
  const { groupsIn } = await import('../../src/species-vet.js');
  const koala = 'Short-term care plan: koala with a sore eye found at the base of a tree';
  assert.match(videoForTags(groupsIn(koala), koala).title, /koala/i);
  const roo = 'Care plan for an adult eastern grey kangaroo';
  const v = videoForTags(groupsIn(roo), roo);
  assert.ok(!v || !/bird/i.test(v.title));
  assert.equal(videoForTags(groupsIn('injured animal, not sure what it is'), ''), null);
  assert.match(videoFor('wombat', 'adult wombat').title, /pouch/);
  assert.match(videoFor('goanna', 'lace monitor hit by car').title, /monitor/);
});

test('plans: photos are identified with honest hedging, tone is positive, vet plans open with thanks', async () => {
  const { buildCarerPlanPrompt, buildDocPrompt } = await import('../../src/note.js');
  const withPhoto = buildCarerPlanPrompt('pigeon', '', { photoCount: 1 });
  assert.match(withPhoto, /1 photo\(s\) are attached/);
  assert.match(withPhoto, /"I can't tell from the photo"/);
  assert.match(withPhoto, /never point out what wasn't said/);
  assert.doesNotMatch(buildCarerPlanPrompt('pigeon', ''), /photo\(s\) are attached/);
  assert.match(buildCarerPlanPrompt('RTP CBC', '', { fromVet: true }), /Thank you for caring for this ringtail joey/);
  assert.doesNotMatch(buildCarerPlanPrompt('ringtail', ''), /Thank you for caring/);
  const mop = buildDocPrompt('mop', 'feed it softened seed every 2 hours', { photoCount: 2 });
  assert.match(mop, /The operator's own instructions come first/);
  assert.match(mop, /2 photo\(s\) are attached/);
});


test('feed calculator: checked inputs, amounts worked out on the device', async () => {
  const { feedCalcOf, feedAmounts } = await import('../../src/note.js');
  const f = feedCalcOf({ applies: true, what: 'Wombaroo Possum Milk 0.8', weight_g: 120, stage: 'furred', percent_body_weight_per_day: 20, feeds_per_day: 4, basis: 'Wombaroo guide', sure: false });
  assert.equal(f.applies, true);
  assert.equal(f.sure, false);
  assert.deepEqual(feedAmounts(f, 120), { perDay: 24, perFeed: 6, feeds: 4 });
  assert.deepEqual(feedAmounts(f, 45), { perDay: 9, perFeed: 2.3, feeds: 4 });
  assert.equal(feedCalcOf({ applies: true, percent_body_weight_per_day: 90, feeds_per_day: 4 }).applies, false); // nonsense refused
  assert.equal(feedAmounts(f, ''), null);
});

test('checked ranges only appear when the group matches the animal named', async () => {
  const { checkedGroup } = await import('../../src/note.js');
  assert.equal(checkedGroup('koala', 'Koala, adult female'), 'koala');
  assert.equal(checkedGroup('bird', 'Koala, adult female'), '');
  assert.equal(checkedGroup('bird', 'Crested pigeon'), 'bird');
  assert.equal(checkedGroup('ringtail', 'Common ringtail possum joey'), 'ringtail');
  assert.equal(checkedGroup('python', 'Mystery animal'), 'python'); // nothing to compare with: keep Claude's pick
  assert.equal(checkedGroup('made-up', 'Koala'), '');
});
