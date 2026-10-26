// Veterinary prescriptions (Schedule 4 and 8) for one named animal, from an approved vet's account.
// Particulars follow the Victorian criteria for lawful prescriptions (regulation 24) plus the veterinary extras:
// prescriber name, address and phone; date; the animal's species, age, breed and sex; the owner's or custodian's
// name and address; the medicine, quantity, directions and repeats. Schedule 8: quantity and repeats in words and
// figures. A printed script is only valid once the vet signs it in their own handwriting (it is never pre-signed).

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/** 0 to 99,999 in words, Australian style: 125 = "one hundred and twenty-five". Null for anything else. */
export function numberWords(n) {
  if (!Number.isInteger(n) || n < 0 || n > 99999) return null;
  const under100 = (x) => (x < 20 ? ONES[x] : TENS[Math.floor(x / 10)] + (x % 10 ? `-${ONES[x % 10]}` : ''));
  const under1000 = (x) => {
    const h = Math.floor(x / 100);
    const r = x % 100;
    if (!h) return under100(r);
    return `${ONES[h]} hundred${r ? ` and ${under100(r)}` : ''}`;
  };
  if (n < 1000) return under1000(n);
  const th = Math.floor(n / 1000);
  const r = n % 1000;
  return `${under1000(th)} thousand${r ? (r < 100 ? ` and ${under100(r)}` : ` ${under1000(r)}`) : ''}`;
}

/** "14 tablets" -> "14 (fourteen) tablets". Decimals and text without a leading whole number stay as typed. */
export function inWordsAndFigures(q) {
  const m = /^\s*(\d{1,5})(?!\.\d)\b(.*)$/.exec(String(q || ''));
  if (!m) return String(q || '').trim();
  const w = numberWords(Number(m[1]));
  return w ? `${m[1]} (${w})${m[2]}`.trim() : String(q).trim();
}

const t = (x, n = 200) => String(x == null ? '' : x).trim().slice(0, n);

/** Check a prescription form: a list of what's missing, in plain words (empty when it's complete). */
export function rxProblems(f) {
  const out = [];
  if (!t(f.animal.species)) out.push('the animal’s species');
  if (!t(f.animal.name)) out.push('the animal’s name or ID (a prescription is for one animal)');
  if (!t(f.animal.age)) out.push('the animal’s age (or best estimate)');
  if (!t(f.animal.sex)) out.push('the animal’s sex (or unknown)');
  if (!t(f.owner.name)) out.push('the owner or carer’s name');
  if (!t(f.owner.address)) out.push('the owner or carer’s address');
  const items = f.items.filter((i) => t(i.medicine));
  if (!items.length) out.push('at least one medicine');
  items.forEach((i, n) => {
    const which = items.length > 1 ? ` for medicine ${n + 1}` : '';
    if (!t(i.quantity)) out.push(`the quantity${which}`);
    if (!t(i.directions)) out.push(`the directions${which}`);
    if (i.schedule === 'S8' && !/^\s*\d/.test(t(i.quantity))) out.push(`the quantity as a number${which} (Schedule 8 needs words and figures)`);
  });
  return out;
}

/** The finished prescription: everything the Word layout prints. */
export function rxModel(f, vet, number, at = Date.now()) {
  const items = f.items
    .filter((i) => t(i.medicine))
    .map((i) => {
      const s8 = i.schedule === 'S8';
      const repeats = Math.max(0, Math.min(12, Number.parseInt(i.repeats, 10) || 0));
      return {
        medicine: t(i.medicine, 160),
        schedule: s8 ? 'S8' : 'S4',
        quantity: s8 ? inWordsAndFigures(t(i.quantity, 60)) : t(i.quantity, 60),
        directions: t(i.directions, 400),
        repeats: s8 ? `${repeats} (${numberWords(repeats)})` : String(repeats),
        interval: s8 && repeats ? t(i.interval, 60) : '',
      };
    });
  return {
    number,
    date: new Date(at).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }),
    test: Boolean(vet.test),
    prescriber: { name: t(vet.name, 80), reg: t(vet.reg, 40), regState: t(vet.regState, 4).toUpperCase(), clinic: t(vet.clinic, 120), address: t(vet.address, 200), phone: t(vet.phone, 40) },
    animal: { species: t(f.animal.species, 80), name: t(f.animal.name, 80), age: t(f.animal.age, 60), sex: t(f.animal.sex, 20), breed: t(f.animal.breed, 80) },
    owner: { name: t(f.owner.name, 120), address: t(f.owner.address, 200) },
    items,
    hasS8: items.some((i) => i.schedule === 'S8'),
  };
}

/** Starting values for the form from a care plan: the animal and each medication's directions. */
// Sex and age, when the plan says them ("female", "about 120 grams" isn't an age, "8 months old" is).
const planWords = (c) => [c.animal, c.title, c.summary].filter(Boolean).join(' ');
const sexOf = (w) => (/\bfemale\b/i.test(w) ? 'Female' : /\bmale\b/i.test(w) ? 'Male' : '');
const ageOf = (w) => ((w.match(/\b(?:about |around |roughly )?\d+(?:\.\d+)?\s*(?:days?|weeks?|months?|years?)(?:\s+old)?\b/i) || [])[0] || '').replace(/\s+old$/i, '');
/** Age and sex for this animal, from the plan and the words it was made from, where they're said. */
export function animalFacts(c, words = '') {
  const w = `${planWords(c)} ${words}`;
  return { age: ageOf(w), sex: sexOf(w) };
}
/** The prescription filled in as far as possible: from the plan, the details a carer sent with it, or last time. */
export function rxFromPlan(c, last = {}, words = '', sent = null) {
  const a = animalFacts(c, words);
  const s = sent || {};
  const carer = s.carer || {};
  const animal = s.animal || {};
  return {
    animal: { species: c.species || '', name: animal.name || '', age: animal.age || a.age, sex: animal.sex || a.sex, breed: c.kind === 'wildlife' ? 'Wild animal (no breed)' : '' },
    owner: carer.name ? { name: carer.name, address: [carer.address, carer.phone].filter(Boolean).join(' · ') } : { name: last.ownerName || '', address: last.ownerAddress || '' },
    items: (c.medications.length ? c.medications : [{ name: '' }]).slice(0, 4).map((m) => ({
      medicine: String(m.name || '').replace(/\s*\([^)]*\)\s*$/, '').trim(), // "Meloxicam (pain relief)" -> "Meloxicam"
      quantity: '',
      directions: [m.how, m.how_often, m.how_long].filter(Boolean).join('. '),
      repeats: '0',
      schedule: 'S4',
      interval: '',
    })),
  };
}
