// Local clinical helpers that run on the device: dose totals and species reference ranges.
// These only produce prompts for the vet to confirm. Nothing here is written into the record.
import { rangesForAnimal } from './species-ranges.js';

/** Typical resting adult reference ranges. A prompt to look again, not a diagnosis. */
export const SPECIES_RANGES = {
  dog: { label: 'dog', temp: [38.0, 39.2], hr: [60, 160], rr: [10, 35] },
  cat: { label: 'cat', temp: [38.1, 39.2], hr: [140, 220], rr: [20, 40] },
  rabbit: { label: 'rabbit', temp: [38.5, 40.0], hr: [130, 325], rr: [30, 60] },
  guineapig: { label: 'guinea pig', temp: [37.2, 39.5], hr: [230, 380], rr: [40, 100] },
  ferret: { label: 'ferret', temp: [37.8, 40.0], hr: [180, 250], rr: [30, 40] },
};

export function speciesKey(species) {
  const s = String(species || '').toLowerCase();
  if (/\b(dog|canine|canis|k9|puppy|pup)\b/.test(s)) return 'dog';
  if (/\b(cat|feline|felis|kitten)\b/.test(s)) return 'cat';
  if (/\b(rabbit|lagomorph|bunny|oryctolagus)\b/.test(s)) return 'rabbit';
  if (/\b(guinea ?pig|cavy|cavia)\b/.test(s)) return 'guineapig';
  if (/\b(ferret|mustela)\b/.test(s)) return 'ferret';
  return null;
}

const firstNumber = (v) => {
  const m = String(v || '').replace(',', '.').match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
};

const VITALS = [
  { key: 'temp_c', range: 'temp', label: 'Temp', unit: '°C' },
  { key: 'hr_bpm', range: 'hr', label: 'HR', unit: 'bpm' },
  { key: 'rr_bpm', range: 'rr', label: 'RR', unit: 'bpm' },
];

// Wildlife: the checked source ranges in species-ranges.js, adults only (young vary too much to flag safely).
const WILDLIFE = [
  [/wombat/, 'wombat'],
  [/koala/, 'koala'],
  [/echidna/, 'echidna'],
  [/flying[- ]?fox|fruit ?bat/, 'flyingfox'],
  [/kangaroo|wallaby|wallaroo|pademelon|macropod/, 'macropod'],
];
const YOUNG = /joey|pouch|puggle|\bpups?\b|nestling|fledgling|chick|hatchling|juvenile|baby|orphan|neonat|infant|sub-?adult|weeks? old|months? old/i;
const ADULT = /\badult\b|\bmature\b|\d+\s*(y|yo|yrs?|years?)\b/i; // only flag when the note says it's grown
const ROW_KEY = { 'Body temperature': 'temp', 'Heart rate': 'hr', Breathing: 'rr' };

/** Adult reference ranges for a wildlife patient, as { label, temp: [lo, hi], ... }, or null. */
export function wildlifeRanges(patient) {
  const s = String(patient.species || '').toLowerCase();
  const hit = WILDLIFE.find(([re]) => re.test(s));
  const age = `${patient.age || ''} ${patient.species || ''}`;
  if (!hit || YOUNG.test(age) || !ADULT.test(age)) return null;
  const g = rangesForAnimal(hit[1], 'vic', 'adult');
  if (!g) return null;
  const ref = { label: `adult ${g.label.toLowerCase()}` };
  for (const [k, v] of g.vitals) {
    // Only a real span ("34-35°C"), never a single average ("about 36.1°C").
    const m = !/\babout\b/i.test(v) && String(v).match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
    if (ROW_KEY[k] && m) ref[ROW_KEY[k]] = [Number(m[1]), Number(m[2])];
  }
  return ref.temp || ref.hr || ref.rr ? ref : null;
}

/** { temp_c: 'high', ... } plus readable check items for anything outside the species range. */
export function vitalFlags(note) {
  const key = speciesKey(note.patient.species);
  const flags = {};
  const checks = [];
  const ref = key ? SPECIES_RANGES[key] : wildlifeRanges(note.patient);
  if (!ref) return { flags, checks, species: null };
  for (const v of VITALS) {
    const n = firstNumber(note.objective.vitals[v.key]);
    if (n === null || !ref[v.range]) continue;
    const [lo, hi] = ref[v.range];
    if (n < lo || n > hi) {
      const dir = n < lo ? 'low' : 'high';
      flags[v.key] = dir;
      checks.push(`${v.label} ${n} ${v.unit} is ${dir} for ${/^[aeiou]/i.test(ref.label) ? 'an' : 'a'} ${ref.label} (${lo} to ${hi}). Correct?`);
    }
  }
  return { flags, checks, species: key };
}

const round = (n) => {
  if (n >= 1000) return Math.round(n);
  if (n >= 10) return Math.round(n * 10) / 10;
  return Math.round(n * 100) / 100;
};

/** Parse "22 mg/kg", "0.1-0.2 mg/kg", "50 mcg/kg", "2 mL/kg", "0.2 mg per kg" or "1 mL per 10 kg" into a per-kg dose. */
export function parsePerKg(dose) {
  const s = String(dose || '').replace(/,/g, '.').replace(/µg|ug/gi, 'mcg');
  const m = s.match(/(\d+(?:\.\d+)?)(?:\s*(?:-|to|–)\s*(\d+(?:\.\d+)?))?\s*(mg|mcg|ml|iu|units?)\s*(?:\/|per)\s*(\d+(?:\.\d+)?)?\s*kg\b/i);
  if (!m) return null;
  const unit = m[3].toLowerCase() === 'ml' ? 'mL' : m[3].toLowerCase().startsWith('unit') ? 'units' : m[3].toLowerCase() === 'iu' ? 'IU' : m[3].toLowerCase();
  const per = m[4] ? Number(m[4]) : 1;
  if (!per) return null;
  return { lo: Number(m[1]) / per, hi: m[2] ? Number(m[2]) / per : null, unit };
}

/** Total dose per administration from per-kg doses and the recorded weight. */
export function doseTotals(note) {
  const kg = firstNumber(note.patient.weight_kg);
  if (!kg || kg <= 0 || kg > 1500) return [];
  const out = [];
  note.plan.treatments.forEach((t, i) => {
    const per = parsePerKg(t.dose);
    if (!per) return;
    const lo = round(per.lo * kg);
    const hi = per.hi !== null ? round(per.hi * kg) : null;
    const total = hi !== null ? `${lo} to ${hi} ${per.unit}` : `${lo} ${per.unit}`;
    // The sum shows just the rate: "0.8 mL/kg (19.4 mL stated), per permit" reads "0.8 mL/kg × 24.3 kg".
    const rate = t.dose.replace(/\s*\([^)]*\)/g, '').split(/,\s/)[0].trim() || t.dose.trim();
    out.push({
      index: i,
      drug: t.drug,
      total,
      working: `${rate} × ${kg} kg`,
      check: `${t.drug || 'Dose'}: ${rate} × ${kg} kg = ${total} per dose. Confirm before dispensing.`,
    });
  });
  return out;
}

/** Everything the device adds: vital flags go in the check list; dose totals show beside each drug. */
export function localChecks(note) {
  const v = vitalFlags(note);
  return { flags: v.flags, doses: doseTotals(note), checks: v.checks };
}
