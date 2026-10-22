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
