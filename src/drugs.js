// Australian vet and wildlife drug and product names: brand (active ingredient).
// Used so misheard dictation ("meta cam", "clavu locks") is corrected to the right spelling, and so either name
// is recognised. A vet's own list (Settings) is added first and wins.
export const DRUG_GROUPS = {
  'Pain and anti-inflammatory': [
    'Metacam (meloxicam)', 'Loxicom (meloxicam)', 'Rimadyl (carprofen)', 'Carprieve (carprofen)', 'Previcox (firocoxib)',
    'Onsior (robenacoxib)', 'Trocoxil (mavacoxib)', 'Galliprant (grapiprant)', 'Tolfedine (tolfenamic acid)', 'ketoprofen',
    'Temgesic (buprenorphine)', 'Methone (methadone)', 'Butorgesic (butorphanol)', 'Torbugesic (butorphanol)',
    'Tramal (tramadol)', 'morphine', 'fentanyl', 'Neurontin (gabapentin)', 'paracetamol',
  ],
  'Sedation and anaesthesia': [
    'Xylazil (xylazine)', 'Domitor (medetomidine)', 'Dexdomitor (dexmedetomidine)', 'Antisedan (atipamezole)',
    'Alfaxan (alfaxalone)', 'Zoletil (tiletamine and zolazepam)', 'Ketamil (ketamine)', 'propofol (PropoFlo)',
    'IsoFlo (isoflurane)', 'SevoFlo (sevoflurane)', 'ACP (acepromazine)', 'Valium (diazepam)', 'Hypnovel (midazolam)',
    'lignocaine (lidocaine)', 'Marcain (bupivacaine)', 'atropine', 'Narcan (naloxone)', 'Dopram (doxapram)', 'adrenaline',
  ],
  Antibiotics: [
    'Clavulox (amoxicillin and clavulanic acid)', 'Noroclav (amoxicillin and clavulanic acid)', 'Moxylan (amoxicillin)',
    'Betamox (amoxicillin)', 'Baytril (enrofloxacin)', 'Zeniquin (marbofloxacin)', 'Marbocyl (marbofloxacin)',
    'Veraflox (pradofloxacin)', 'Vibravet (doxycycline)', 'doxycycline', 'Flagyl (metronidazole)', 'Metrogyl (metronidazole)',
    'Convenia (cefovecin)', 'Rilexine (cefalexin)', 'Keflex (cefalexin)', 'cefazolin', 'Antirobe (clindamycin)',
    'Clindacyl (clindamycin)', 'Tribrissen (trimethoprim and sulfadiazine)', 'Engemycin (oxytetracycline)',
    'Terramycin (oxytetracycline)', 'Benacillin (procaine penicillin)', 'Excenel (ceftiofur)', 'gentamicin',
    'Tylan (tylosin)', 'Chlorsig (chloramphenicol)',
  ],
  'Parasites': [
    'Ivomec (ivermectin)', 'Cydectin (moxidectin)', 'Revolution (selamectin)', 'Bravecto (fluralaner)',
    'NexGard (afoxolaner)', 'Simparica (sarolaner)', 'Credelio (lotilaner)', 'Advocate (imidacloprid and moxidectin)',
    'Frontline (fipronil)', 'Droncit (praziquantel)', 'Drontal (praziquantel, pyrantel and febantel)',
    'Panacur (fenbendazole)', 'Baycox (toltrazuril)',
  ],
  Antifungals: [
    'Sporanox (itraconazole)', 'Diflucan (fluconazole)', 'Nilstat (nystatin)', 'Lamisil (terbinafine)',
    'Conofite (miconazole)', 'Malaseb (miconazole and chlorhexidine)',
  ],
  'Fluids and nutrition': [
    "Hartmann's (compound sodium lactate)", 'Plasma-Lyte 148', '0.9% sodium chloride (normal saline)', '5% glucose',
    'Duphalyte', 'Lectade', 'Vytrate', 'Spark', 'Wombaroo Impact Colostrum Supplement', 'Wombaroo milk replacer',
    'Biolac', 'Divetelact', 'Poly-Aid Plus', 'calcium gluconate', 'calcium borogluconate', 'vitamin B complex',
    'Konakion (vitamin K1, phytomenadione)', 'vitamin E and selenium',
  ],
  'Gut, steroids and other': [
    'Cerenia (maropitant)', 'Maxolon (metoclopramide)', 'Zofran (ondansetron)', 'Carafate (sucralfate)',
    'Losec (omeprazole)', 'Lasix (furosemide, frusemide)', 'prednisolone', 'Dexason (dexamethasone)',
    'Optimmune (ciclosporin)', 'Surolan (miconazole, prednisolone and polymyxin B)',
    'Lethabarb (pentobarbitone)', 'Valabarb (pentobarbitone)',
  ],
  'Wounds and skin': [
    'Betadine (povidone-iodine)', 'chlorhexidine (Hibiclens)', 'Silvazine (silver sulfadiazine)', 'F10 (F10SC)',
    'Medihoney (manuka honey)', 'IntraSite gel',
  ],
};

export const COMMON_DRUGS = Object.values(DRUG_GROUPS).flat();

// [brand, active ingredient] pairs from the list ("Metacam (meloxicam)", "propofol (PropoFlo)"); generic pairs are skipped.
const isBrand = (s) => /^[A-Z]/.test(s);
const BRANDS = COMMON_DRUGS.map((d) => d.match(/^([^()]+?) \(([^()]+)\)$/))
  .filter(Boolean)
  .map(([, a, b]) => (isBrand(a) && !isBrand(b) ? [a, b] : isBrand(b) && !isBrand(a) ? [b, a] : null))
  .filter(Boolean);
const letters = (s) => String(s).toLowerCase().replace(/[^a-z]/g, '');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Was the brand said, even misheard ("meta cam", "side ectin" for Cydectin)? */
function brandSaid(brand, said) {
  const b = letters(brand);
  return said.includes(b) || (b.length >= 6 && said.includes(b.slice(-5)));
}

/**
 * Take out brand names the vet never said, keeping the active ingredient:
 * "meloxicam (Metacam)" and "Metacam (meloxicam)" both become "meloxicam" unless Metacam was said.
 */
export function dropUnsaidBrands(text, saidText) {
  let out = String(text || '');
  if (!out) return out;
  const said = letters(saidText);
  for (const [brand, generic] of BRANDS) {
    if (!out.toLowerCase().includes(brand.toLowerCase()) || brandSaid(brand, said)) continue;
    out = out.replace(new RegExp(`\\b(${esc(generic)})\\s*\\(${esc(brand)}\\)`, 'gi'), '$1');
    // A brand that opened a sentence or line hands its capital letter to the active ingredient.
    out = out.replace(new RegExp(`\\b${esc(brand)}\\s*\\((${esc(generic)})\\)`, 'gi'), (m, g, i, s) => (i === 0 || /[.:\n]\s*$/.test(s.slice(0, i)) ? g[0].toUpperCase() + g.slice(1) : g));
  }
  return out;
}

/** The block for prompts: the vet's own names first, then the Australian list. */
export function drugsForPrompt(own = '') {
  const mine = String(own || '').split(/\n|;/).map((x) => x.trim()).filter(Boolean).slice(0, 80);
  const groups = Object.entries(DRUG_GROUPS).map(([g, list]) => `${g}: ${list.join('; ')}`).join('\n');
  return `Drug and product names (Australian brands with active ingredients in brackets). Speech recognition often mishears these.
- When a word sounds like one of these, use that exact spelling. Recognise both the brand and the active ingredient.
- Write the name the speaker used, then the other name in brackets the first time, e.g. "Metacam (meloxicam)" or "meloxicam (Metacam)". Do not change the drug the speaker chose.
- Australian spelling: cefalexin, furosemide (frusemide), lignocaine, adrenaline, pentobarbitone.
- If you cannot tell which drug was meant, keep what was said and add it to "check".${mine.length ? `\nThis vet's own drugs and products (prefer these spellings): ${mine.join('; ')}` : ''}
${groups}`;
}
