// Vet endorsement of a care plan.
// A vet's name, registration number and the date go on the plan (and travel with it when it's shared or printed).
// The endorsement covers the medications as they were at that moment: if they change afterwards, it no longer
// counts until a vet endorses the plan again. Other edits (housing, feeding wording) keep it.
// Nothing here is verified: until vets sign in, the name and number are what the vet typed.

const norm = (x) => String(x || '').trim().toLowerCase().replace(/\s+/g, ' ');

/** A fingerprint of the medications: same medicines, doses, timing and length give the same text. */
export const medsKey = (meds = []) => JSON.stringify((meds || []).map((m) => [m.name, m.how, m.how_often, m.how_long].map(norm)));

const str = (x, n) => (typeof x === 'string' ? x.trim().slice(0, n) : '');

/** A clean endorsement from stored or shared data, or null. */
export function endorsementOf(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const by = str(raw.by, 80);
  const at = Number(raw.at);
  if (!by || !Number.isFinite(at) || at <= 0) return null;
  return { by, reg: str(raw.reg, 40), clinic: str(raw.clinic, 120), at, meds: typeof raw.meds === 'string' ? raw.meds.slice(0, 20000) : '' };
}

/** "Dr Sam Lee" from "Sam Lee" (vets in Australia use Dr); leaves "Dr Lee" or "Prof Lee" as typed. */
export const drName = (name) => (/^(dr|prof|professor|doctor)\b/i.test(String(name).trim()) ? String(name).trim() : `Dr ${String(name).trim()}`);

/** The plan with a fresh endorsement from this vet. */
export function endorse(sheet, vet, now = Date.now()) {
  return { ...sheet, endorsement: { by: String(vet.name || '').trim().slice(0, 80), reg: String(vet.reg || '').trim().slice(0, 40), clinic: String(vet.clinic || '').trim().slice(0, 120), at: now, meds: medsKey(sheet.medications) } };
}

/**
 * Where a plan stands:
 * - 'endorsed': a vet endorsed it and the medications are as they were then
 * - 'changed': a vet endorsed it, but the medications have changed since
 * - 'none': no vet has endorsed it
 */
export function endorsementState(sheet) {
  const e = sheet && endorsementOf(sheet.endorsement);
  if (!e) return { state: 'none', e: null };
  return { state: e.meds === medsKey(sheet.medications) ? 'endorsed' : 'changed', e };
}

export const endorsedDate = (at) => new Date(at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });

/** "Dr Sam Lee (reg. V1234)" */
export const vetLabel = (e) => `${drName(e.by)}${e.reg ? ` (reg. ${e.reg})` : ''}`;

/** The words shown on screen and on printouts for each state: { title, text, tone }. */
export function endorsementWords(sheet) {
  const { state, e } = endorsementState(sheet);
  const hasMeds = Boolean(sheet && sheet.medications && sheet.medications.length);
  if (state === 'endorsed') {
    return {
      state,
      title: 'Vet-endorsed care plan',
      text: `Endorsed by ${vetLabel(e)}${e.clinic ? `, ${e.clinic}` : ''}, on ${endorsedDate(e.at)}.${hasMeds ? ' The medications are authorised by this vet.' : ''}`,
      tone: 'ok',
      medsHeading: hasMeds ? `Medications (authorised by ${drName(e.by)})` : 'Medications',
    };
  }
  if (state === 'changed') {
    return {
      state,
      title: 'Medications changed since the vet endorsed this plan',
      text: `${vetLabel(e)} endorsed it on ${endorsedDate(e.at)}, but the medications have changed since. Give medicines only as your vet directed until a vet endorses the plan again.`,
      tone: 'warn',
      medsHeading: 'Medications (changed: not yet authorised by a vet)',
    };
  }
  if (hasMeds) {
    return {
      state,
      title: 'Draft: not checked by a vet',
      text: 'No vet has checked the medications in this plan. Give medicines only as your vet directed, and ask a vet to check and endorse the plan.',
      tone: 'warn',
      medsHeading: 'Medications (not yet authorised by a vet)',
    };
  }
  return { state, title: 'Not checked by a vet', text: '', tone: 'quiet', medsHeading: 'Medications' };
}
