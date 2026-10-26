// What changed between two versions of a care plan (a carer's and the vet's, on a shared review link), and how a
// vet's name is shown. Endorsing was taken out of the app in October 2026.

const norm = (x) => String(x || '').trim().toLowerCase().replace(/\s+/g, ' ');

/** A fingerprint of the medications: same medicines, doses, timing and length give the same text. */
export const medsKey = (meds = []) => JSON.stringify((meds || []).map((m) => [m.name, m.how, m.how_often, m.how_long].map(norm)));

export const PARTS = [
  ['summary', 'Summary'],
  ['plan', 'Day-by-day plan'],
  ['housing', 'Housing'],
  ['feeding', 'Feeding'],
  ['activity', 'Activity and handling'],
  ['care', 'Other care'],
  ['daily_checks', 'Daily tick sheet'],
  ['release', 'Release'],
  ['escalate', 'When to call the vet'],
  ['next_visit', 'Next visit'],
];
const fnv = (t) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 0x01000193);
  return (h >>> 0).toString(36);
};
/** A short fingerprint of each part, so later edits can be named ("Changed since: Feeding"). */
export const partsKey = (sheet) => Object.fromEntries(PARTS.map(([k]) => [k, fnv(JSON.stringify((sheet && sheet[k]) ?? ''))]));
/** The parts (names people see) that differ between two versions of a plan. */
export function changedParts(a, b) {
  const x = partsKey(a);
  const y = partsKey(b);
  return PARTS.filter(([k]) => x[k] !== y[k]).map(([, label]) => label);
}

/** "Dr Sam Lee" from "Sam Lee" (vets in Australia use Dr); leaves "Dr Lee" or "Prof Lee" as typed. */
export const drName = (name) => (/^(dr|prof|professor|doctor)\b/i.test(String(name).trim()) ? String(name).trim() : `Dr ${String(name).trim()}`);

/** "Dr Sam Lee (reg. V1234)" */
export const vetLabel = (e) => `${drName(e.by)}${e.reg ? ` (reg. ${e.reg})` : ''}`;
