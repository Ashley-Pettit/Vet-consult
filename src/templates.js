// House style from Opus: one excellent finished reply per kind of document (made once by Opus from the built-in
// examples, see scripts/bake-examples.mjs). Live drafts on the everyday model get it as a worked example, so they
// come out with the same structure, depth and polish, and the Word printouts look as good.
// The house-style examples are only needed when a real AI call is made, so they load then, not with the app.
let EXAMPLES = null;
export const loadTemplates = async () => (EXAMPLES ||= (await import('./template-examples.js')).default);
import { CACHE_SPLIT } from './note.js';

// Which kind of request a prompt is. Order matters: the most specific first. Changes, revisions and Rapid polish
// get no example (they edit something that already exists, or need speed).
const KINDS = [
  ['vetnotes', /^You are a veterinary clinical scribe for .*Convert the vet's spoken dictation/],
  ['caresheet', /^You are helping a vet working with /],
  ['carer-vet', /^You are helping a vet who works with /],
  ['carer-carer', /^You are helping a wildlife carer at /],
  ['intake', /into this document: Rescue and intake record/],
  ['log', /into this document: Daily care log entry/],
  ['mop', /into this document: Short-term care plan for a member of the public/],
  ['tovet', /into this document: Summary for the vet visit/],
  ['media', /into this document: Draft media statement/],
  ['witness', /into this document: Draft expert witness statement/],
  ['opinion', /into this document: Veterinary expert opinion/],
  ['funding', /into this document: Draft funding or grant submission/],
];

export function templateKind(prompt) {
  const p = String(prompt);
  const hit = KINDS.find(([, re]) => re.test(p.slice(0, 400)));
  return hit ? hit[0] : null;
}

const GUIDE = `Here is an example of an excellent reply of this kind, written for a different animal and case. Match its structure, section headings and their order, level of detail, tone and polish. Never copy its facts, names, the animal's sex (he or she), organisations, places, numbers, doses or phone numbers: use only what this case and the instructions above say, and leave out any section that doesn't apply here. The rules above always win over the example.`;

/** The prompt with the house-style example added just before the case itself, or unchanged if there is none. */
export function withTemplate(prompt, regionCode = 'vic') {
  if (!EXAMPLES) return prompt; // call loadTemplates() first
  const kind = templateKind(prompt);
  const ex = kind && ((EXAMPLES[regionCode] || {})[kind] || (EXAMPLES.vic || {})[kind]);
  if (!ex) return prompt;
  const block = `${GUIDE}\n<example_reply>\n${ex}\n</example_reply>\n`;
  const p = String(prompt);
  // Inside the part that's the same every time (before the cache marker), so the example is cached with the rules.
  const mark = p.indexOf(CACHE_SPLIT);
  if (mark > 0) return `${p.slice(0, mark)}\n\n${block}${p.slice(mark)}`;
  const at = Math.max(p.lastIndexOf('\n<dictation>'), p.lastIndexOf('\n<comments>'), p.lastIndexOf('\n<note>'));
  return at > 0 ? `${p.slice(0, at)}\n${block}${p.slice(at)}` : `${p}\n\n${block}`;
}

// Tone about people in care plans (Ash, October 2026). Added to live calls only, after the built-in examples are looked
// up, so their stored replies still match; move it into the care plan prompts themselves at the next re-bake.
const CARE_PLAN_KINDS = new Set(['caresheet', 'carer-vet', 'carer-carer']);
export const CARER_TONE = `Tone about people: speak positively and respectfully about the vet, the carer and anyone who has helped the animal. Never criticise, second-guess or point out what someone should, ideally would or could have done (for example no "ideally the vet would have", "this should have been done sooner" or "unfortunately it wasn't given"). Treat what has been done as the starting point and say plainly what to do next.`;
// Dose safety (October 2026 review), live calls only like the tone rule; fold it into note.js at the next re-bake.
// Care plans: amounts only as given, never worked out for the carer.
export const CARE_DOSES = `Never work out an amount from a dose per kilogram, a weight or a concentration: give amounts only as they were said (for example "19.4 mL"). If only a per-kilogram dose was given, write "the amount the vet dispensed".`;
// Feeding detail, the pre-release plan and bird flu (Ash, October 2026), live calls only like the rules above.
export const CARE_FEEDING = `feeding: for a milk-fed or hand-reared animal, name the product and its supplier, preferring Wombaroo Food Products where Wombaroo makes a suitable product (for example "Wombaroo Possum Milk Replacer <0.8, from Wombaroo Food Products"), and the stage to use and when to change stage. Then say exactly how to feed it, one step per item, using the reference sources and the pack: how much powder to how much warm pre-boiled water (for example "14 g (2 scoops) of powder with 95 mL of warm water makes 100 mL"); mixing it to a paste with half the water first; the temperature to feed at; the teat or syringe to use; how many feeds a day and the amount per feed from the pack table or the feed calculator; how to change stages over several days; and storage (a day in the fridge, 2 weeks frozen, throw out warmed leftovers). If a figure isn't in the sources, say to follow the pack for this stage rather than guessing.`;
export const CARE_PRE_RELEASE = `release.before (add this "before" list inside "release"; wildlife only): the pre-release plan, at most 5 items, the conditioning steps between care and release, in order (for example: moving to an outdoor or pre-release enclosure, a crèche with others of its kind, building flight or climbing fitness, less handling, natural foods, and the checks it must pass). Be specific to the species; for flying-foxes include: only vaccinated, trained handlers; a crèche with other young; a pre-release flight aviary until it flies strongly; the release weight and size in the sources; and soft release at an established camp with supplementary feeding afterwards. Empty for domestic animals.`;
export const CARE_BIRD_FLU = `Birds: if any sign of H5 bird flu is described (sudden death of others, poor coordination, tremors, twisted neck, swimming in circles, unable to stand or fly, breathing trouble, ruffled feathers and closed eyes), the summary says plainly to stop handling it, keep it away from other animals and people, and report it now to the Emergency Animal Disease Hotline, 1800 675 888, as the bird flu sources say; put the same in escalate.urgent.`;
/** The prompt with any live-only rules for its kind added (in the fixed, cached part). */
export function withLiveRules(prompt) {
  let p = String(prompt);
  const carePlan = CARE_PLAN_KINDS.has(templateKind(p)) || /^You are updating a finished care plan/.test(p);
  if (!carePlan) return p;
  p = p.replace('(for example "I\'m not certain of this, check with your vet")', '(for example "this figure isn\'t certain: check it with your vet")');
  const rule = `\n- ${CARER_TONE}\n- ${CARE_DOSES}\n- ${CARE_FEEDING}\n- ${CARE_PRE_RELEASE}\n- ${CARE_BIRD_FLU}\n`;
  const mark = p.indexOf(CACHE_SPLIT);
  return mark > 0 ? `${p.slice(0, mark)}${rule}${p.slice(mark)}` : `${rule}${p}`;
}
