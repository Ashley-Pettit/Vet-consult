// House style from Opus: one excellent finished reply per kind of document (made once by Opus from the built-in
// examples, see scripts/bake-examples.mjs). Live drafts on the everyday model get it as a worked example, so they
// come out with the same structure, depth and polish, and the Word printouts look as good.
import EXAMPLES from './template-examples.js';
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
