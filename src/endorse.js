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

/** A clean endorsement from stored or shared data, or null. */
export function endorsementOf(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const by = str(raw.by, 80);
  const at = Number(raw.at);
  if (!by || !Number.isFinite(at) || at <= 0) return null;
  return { id: /^[a-zA-Z0-9]{16}$/.test(raw.id || '') ? raw.id : '', by, reg: str(raw.reg, 40), clinic: str(raw.clinic, 120), at, meds: typeof raw.meds === 'string' ? raw.meds.slice(0, 20000) : '' };
}

/** "Dr Sam Lee" from "Sam Lee" (vets in Australia use Dr); leaves "Dr Lee" or "Prof Lee" as typed. */
export const drName = (name) => (/^(dr|prof|professor|doctor)\b/i.test(String(name).trim()) ? String(name).trim() : `Dr ${String(name).trim()}`);

/** The plan with an endorsement the server recorded: { id, by, reg, clinic, at, meds }. */
export function endorse(sheet, rec) {
  return { ...sheet, endorsement: endorsementOf(rec) };
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

/**
 * Where a plan stands:
 * - 'endorsed': a vet endorsed it and the medications are as they were then
 * - 'changed': a vet endorsed it, but the medications have changed since
 * - 'none': no vet has endorsed it
 */
export function endorsementState(sheet) {
  const e = sheet && endorsementOf(sheet.endorsement);
  if (!e) return { state: 'none', e: null };
  // No server record behind it (or a different one): not to be trusted. Not yet checked counts as fine for now.
  if (endorsementCheck(e) === false) return { state: 'unconfirmed', e };
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
  if (state === 'unconfirmed') {
    return {
      state,
      title: 'This endorsement can’t be confirmed',
      text: `The plan says ${vetLabel(e)} endorsed it, but there’s no matching record. Treat it as a draft: give medicines only as your vet directed.`,
      tone: 'warn',
      medsHeading: 'Medications (not confirmed as authorised by a vet)',
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
