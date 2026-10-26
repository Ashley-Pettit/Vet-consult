// Vet endorsement of a care plan.
// A vet's name, registration number and the date go on the plan (and travel with it when it's shared or printed).
// The endorsement covers the medications as they were at that moment: if they change afterwards, it no longer
// counts until a vet endorses the plan again. Other edits (housing, feeding wording) keep it.
// Only a signed-in vet the admin has approved can endorse, and the server keeps a record of each endorsement (who,
// when, which medications). The app looks that record up, so an endorsement typed into a plan by hand shows as
// unconfirmed (see checkEndorsement).

const norm = (x) => String(x || '').trim().toLowerCase().replace(/\s+/g, ' ');

/** A fingerprint of the medications: same medicines, doses, timing and length give the same text. */
export const medsKey = (meds = []) => JSON.stringify((meds || []).map((m) => [m.name, m.how, m.how_often, m.how_long].map(norm)));

const str = (x, n) => (typeof x === 'string' ? x.trim().slice(0, n) : '');

/** The other parts of a plan a vet's endorsement covers, with the names people see. */
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
const partsOf = (raw) => (raw && typeof raw === 'object' ? Object.fromEntries(PARTS.filter(([k]) => typeof raw[k] === 'string').map(([k]) => [k, raw[k].slice(0, 16)])) : null);

/** A clean endorsement from stored or shared data, or null. */
export function endorsementOf(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const by = str(raw.by, 80);
  const at = Number(raw.at);
  if (!by || !Number.isFinite(at) || at <= 0) return null;
  return { id: /^[a-zA-Z0-9]{16}$/.test(raw.id || '') ? raw.id : '', by, reg: str(raw.reg, 40), clinic: str(raw.clinic, 120), at, meds: typeof raw.meds === 'string' ? raw.meds.slice(0, 20000) : '', parts: partsOf(raw.parts) };
}

/** "Dr Sam Lee" from "Sam Lee" (vets in Australia use Dr); leaves "Dr Lee" or "Prof Lee" as typed. */
export const drName = (name) => (/^(dr|prof|professor|doctor)\b/i.test(String(name).trim()) ? String(name).trim() : `Dr ${String(name).trim()}`);

/** The plan with an endorsement the server recorded: { id, by, reg, clinic, at, meds }. */
export function endorse(sheet, rec) {
  return { ...sheet, endorsement: endorsementOf({ ...rec, parts: partsKey(sheet) }) };
}

// What the server said about each endorsement id: true (matches its record), false (no such record, or different).
const checks = new Map();
export const endorsementCheck = (e) => (e && e.id ? checks.get(e.id) : false);
/** Compare an endorsement with the server's record of it (from lookupEndorsement). */
export function recordCheck(e, rec) {
  const ok = Boolean(rec && rec.by === e.by && rec.reg === e.reg && Number(rec.at) === e.at && rec.meds === e.meds);
  if (e && e.id) checks.set(e.id, ok);
  return ok;
}

/** Endorsing has been taken out of the app (October 2026): every plan is simply a plan, whatever older copies carry. */
export function endorsementState() {
  return { state: 'none', e: null, edited: [] };
}

export const endorsedDate = (at) => new Date(at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });

/** "Dr Sam Lee (reg. V1234)" */
export const vetLabel = (e) => `${drName(e.by)}${e.reg ? ` (reg. ${e.reg})` : ''}`;

/** Nothing about endorsing is shown on screen or on printouts any more. */
export function endorsementWords() {
  return { state: 'none', title: '', text: '', tone: 'quiet', medsHeading: 'Medications' };
}
