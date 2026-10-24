import { EXTRA_RANGES } from './species-ranges-extra.js';
// Normal ranges and pouch / humidicrib temperatures by species group, checked October 2026.
// Only figures read from the cited source are here; anything that could not be verified is left out.
// Claude only picks the group; the app shows these figures word for word, so the numbers are always the sources'.
// NSW figures for pouch heat are labelled in the sources as transport temperatures, also used for housing.

const NSW_POSSUMS = { title: 'Initial treatment and care guidelines for rescued possums and gliders', publisher: 'NSW DPIE', date: 'August 2021', authors: 'Dr Rebecca Robey, with Dr Robert Johnson, Dr Aditi Sriram, WIRES, NSW Wildlife Council', url: 'https://www.environment.nsw.gov.au/sites/default/files/rescued-possums-gliders-treatment-care-guidelines-210312.pdf' };
const NSW_BIRDS = { title: 'Initial treatment and care guidelines for rescued native birds', publisher: 'NSW DPIE', date: 'December 2021', authors: 'Dr Kathryn Johnson, with Dr Jenny McLelland, Dr Tania Bishop, Dr Aditi Sriram', url: 'https://www.environment.nsw.gov.au/sites/default/files/native-birds-initial-treatment-care-guidelines-210623.pdf' };
const VIC_LIZARDS = { title: 'Victorian Wildlife Rehabilitation Guidelines, Part B Reptiles and Amphibians, Ch 1 Lizards', publisher: 'DEECA (Victoria)', date: 'no date printed', authors: 'none named', url: 'https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0026/671264/Part-B-Reptiles-Amphibians-Chapter1.pdf' };
const NSW_REPTILES = { title: 'Initial treatment and care guidelines for rescued reptiles', publisher: 'NSW Department of Planning and Environment', date: 'February 2022', authors: 'Dr Shane Simpson, with Dr Andrea Reiss, Dr Rebecca Robey, Dr Aditi Sriram', url: 'https://www.environment.nsw.gov.au/sites/default/files/reptiles-initial-treatment-care-guidelines-210566.pdf' };
const POSSUM_POUCH = [['Unfurred', '32°C'], ['Velvet (fur just coming through)', '30°C'], ['Furred', '26°C']];

export const SPECIES_RANGES = {
  macropod: {
    label: 'Kangaroos and wallabies',
    vitals: [['Body temperature', '35.5-37.0°C (pouch young)'], ['Heart rate', '70-200 a minute (resting; joeys may be higher)']],
    warmth: [['Unfurred', '32°C (NSW). Wombaroo housing: 34-36°C at Age Factor under 0.4, 32-34°C at 0.4'], ['Lightly furred', '30°C'], ['Fully furred', '28°C (Wombaroo housing: 28-30°C at Age Factor 0.6, 20-25°C over 0.7)']],
    notes: ['Rescued pouch young are often cold: warm slowly over 2-3 hours.', 'Breathing over 40 a minute may mean a breathing problem.'],
    sources: [
      { title: 'Guidelines for the initial treatment and care of rescued macropods', publisher: 'NSW DPIE', date: 'February 2021', authors: 'Aditi Sriram, with Dr Michelle Campbell-Ward, Dr Brianna Talbot, Louise Hatton, WIRES, NSW Wildlife Council', url: 'https://www.environment.nsw.gov.au/sites/default/files/rescued-macropods-treatment-care-guidelines-210038.pdf' },
      { title: 'Milk Replacers & Food Supplements for native animals', publisher: 'Wombaroo Food Products', date: '5th Edition 2020', authors: 'none named', url: 'https://www.wombaroo.com.au/wp-content/uploads/2020/06/Wombaroo-Milk-Booklet_ED5_2020_WEB.pdf' },
    ],
  },
  ringtail: {
    label: 'Common ringtail possum',
    vitals: [['Body temperature', 'about 36.1°C (research average)'], ['Heart rate', '180-260 a minute']],
    warmth: POSSUM_POUCH,
    notes: [],
    sources: [NSW_POSSUMS, { title: 'Facultative hyperthermia during a heatwave delays injurious dehydration of an arboreal marsupial', publisher: 'Journal of Experimental Biology', date: '2020', authors: 'J. M. Turner', url: 'https://cob.silverchair.com/jeb/article-pdf/doi/10.1242/jeb.219378/1982117/jeb219378.pdf' }],
  },
  brushtail: {
    label: 'Common brushtail possum',
    vitals: [['Body temperature', 'about 36.2°C'], ['Heart rate', '150-220 a minute']],
    warmth: POSSUM_POUCH,
    notes: [],
    sources: [NSW_POSSUMS],
  },
  glider: {
    label: 'Sugar and squirrel gliders',
    vitals: [['Body temperature', 'about 36.3°C'], ['Heart rate', '200-300 a minute'], ['Breathing', '16-40 a minute']],
    warmth: POSSUM_POUCH,
    notes: [],
    sources: [NSW_POSSUMS, { title: 'Selected Physiological Data for Sugar Gliders', publisher: 'MSD Veterinary Manual', date: 'data from Carpenter’s Exotic Animal Formulary, 6th ed., 2023', authors: 'Brust DM, Mans C', url: 'https://www.msdvetmanual.com/multimedia/table/selected-physiological-data-for-sugar-gliders' }],
  },
  wombat: {
    label: 'Common (bare-nosed) wombat',
    vitals: [['Body temperature', 'Adult 34-35°C; pouch young 34-37°C'], ['Heart rate', '70-200 a minute (joeys, resting)'], ['Breathing', '10-15 a minute']],
    warmth: [['Unfurred', '28-30°C'], ['Fine fur', '28°C, then 24-26°C; no heating needed once fully furred']],
    notes: ['Wombats need less heat than other marsupials. Never put a heat source directly on the skin.', 'Breathing over 40 a minute may mean a breathing problem.'],
    sources: [
      { title: 'Guidelines for the initial treatment and care of rescued wombats', publisher: 'NSW DPIE', date: 'July 2021', authors: 'Dr Aditi Sriram, with Dr Scott Carver, Dr Michelle Campbell-Ward, Dr David Phalen, Dr Brianna Talbot, Dr Clare Death, Dr Ralph Howard', url: 'https://www.environment.nsw.gov.au/sites/default/files/rescued-wombats-treatment-care-guidelines-210230.pdf' },
      { title: 'Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Ch 10 Wombats', publisher: 'DEECA (Victoria)', date: 'no date printed', authors: 'none named', url: 'https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0022/671251/Part-B-Mammals-Chapter-10.pdf' },
    ],
  },
  koala: {
    label: 'Koala',
    vitals: [['Body temperature', '35.5-36.5°C (below 34.5°C is too cold)'], ['Heart rate', '65-90 a minute (adult; joeys may be higher)'], ['Breathing', '10-15 a minute']],
    warmth: { vic: [['Unfurred (in a humidicrib)', '34°C'], ['Lightly furred', '30-32°C'], ['Fully furred', '25-28°C']], qld: [['Unfurred', '34-36°C'], ['Furred', '28-32°C']] },
    notes: ['A humidicrib is recommended for unfurred joeys; the sources give no humidity setting.'],
    sources: [
      { title: 'Code of practice for injured, sick and orphaned koalas', publisher: 'NSW DCCEEW', date: 'July 2025', authors: 'none named', url: 'https://www.environment.nsw.gov.au/sites/default/files/2025-07/code-of-practice-for-injured-sick-and-orphaned-koalas-250194.pdf' },
      { title: 'Code of Practice: Rehabilitation of Sick, Injured, or Orphaned Koalas in Queensland', publisher: 'Queensland Department of Environment and Science', date: 'approved 30 June 2023', authors: 'none named', url: 'https://environment.desi.qld.gov.au/__data/assets/pdf_file/0023/316427/code-of-practice-rehabilitation-sick-orphaned-koalas.pdf' },
      { title: 'Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Ch 5 Koalas', publisher: 'DEECA (Victoria)', date: 'no date printed', authors: 'none named', url: 'https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0026/671246/Part-B-Mammals-Chapter-5.pdf' },
    ],
  },
  echidna: {
    label: 'Short-beaked echidna',
    vitals: [['Body temperature', '31-33°C (adult)'], ['Heart rate', '50-68 a minute (resting adult)']],
    warmth: [['Pouch-young puggle', '24-25°C'], ['Burrow-young puggle', '20-25°C']],
    notes: ['Do not use marsupial pouch temperatures for puggles. Echidnas overheat easily above 25°C.'],
    sources: [
      { title: 'Code of practice for injured, sick and orphaned monotremes', publisher: 'NSW DCCEEW', date: 'July 2025', authors: 'none named', url: 'https://www.environment.nsw.gov.au/sites/default/files/2025-08/code-of-practice-for-injured-sick-and-oprhaned-monotremes-250251_2.pdf' },
      { title: 'Initial treatment and care guidelines for rescued echidnas', publisher: 'NSW DPIE', date: 'August 2021', authors: 'Dr Peggy Rismiller, with Dr Gabrielle Tobias, Dr Katherine Adriaanse, Dr Aditi Sriram', url: 'https://www.environment.nsw.gov.au/sites/default/files/rescued-echidnas-treatment-care-guidelines-210315.pdf' },
    ],
  },
  flyingfox: {
    label: 'Flying-foxes',
    vitals: [['Body temperature', 'Adult 36-37°C; pups 37.5-38°C']],
    warmth: [['Newborn or no fur on the front', '29-31°C (Victoria: about 30-32°C on a heat pad with a thermometer)'], ['Older orphans', '28°C; no extra heat from about 5 weeks']],
    notes: ['Only vaccinated, trained carers handle flying-foxes.'],
    sources: [
      { title: 'Initial treatment and care guidelines for rescued flying-foxes', publisher: 'NSW DPIE', date: 'September 2021', authors: 'Dr Tania Bishop, with Dr Derek Spielman, Dr Keren Cox-Witton, Dr Aditi Sriram, WIRES, NSW Wildlife Council', url: 'https://www.environment.nsw.gov.au/sites/default/files/flying-foxes-initial-treatment-care-guidelines-210417.pdf' },
      { title: 'Victorian Wildlife Rehabilitation Guidelines, Part B Mammals, Ch 4 Flying Foxes', publisher: 'DEECA (Victoria)', date: 'no date printed', authors: 'none named', url: 'https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0025/671245/Part-B-Mammals-Chapter-4.pdf' },
    ],
  },
  bird: {
    label: 'Native birds (general)',
    vitals: [['Body temperature', '40-44°C (can be about 38.5°C at rest)']],
    warmth: [['Hatchlings and nestlings', '28-32°C, warmer with fewer feathers'], ['Fledglings and adults', '28°C'], ['Sick adult birds', '28-33°C with 50-70% humidity'], ['Head injury', 'keep cooler, 21-23°C']],
    notes: ['Birds’ breathing is subtle; the sources give no normal heart or breathing rates.'],
    sources: [NSW_BIRDS, { title: 'Hospitalised Avian Patients: A Challenge', publisher: 'WSAVA World Congress Proceedings', date: '2007', authors: 'Michelle Rouffignac, RVN', url: 'https://www.vin.com/doc/?id=3860719' }],
  },
  raptor: {
    label: 'Birds of prey (owls, hawks, kites, falcons)',
    vitals: [['Body temperature', '40-44°C (general bird range)']],
    warmth: [['Chicks', '32-34°C, depending on stage and feathers'], ['Adults', '28-30°C (owls that cannot keep warm: 29°C)']],
    notes: [],
    sources: [{ title: 'Initial treatment and care guidelines for rescued birds of prey', publisher: 'NSW Department of Planning and Environment', date: 'February 2022', authors: 'Dr Aditi Sriram, with Dr Michael Pyne, Dr Gabrielle Tobias, Dr Jana Schader, Dr Beth Mott, Dr Tania Bishop', url: 'https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf' }],
  },
  waterbird: {
    label: 'Ducks and waterbirds',
    vitals: [['Body temperature', '40-44°C (general bird range)']],
    warmth: [['Ducklings and small waterbirds', '28-30°C'], ['Adults', '28°C']],
    notes: [],
    sources: [NSW_BIRDS],
  },
  bluetongue: {
    label: 'Blue-tongue and shingleback lizards',
    reptile: true,
    warmth: [['Preferred body temperature', '28-32°C (NSW eastern blue-tongue 27-32°C)'], ['Basking spot', 'blue-tongue 30-40°C; shingleback 35-40°C']],
    notes: ['Put a thermometer at each end of the enclosure.'],
    sources: [VIC_LIZARDS, NSW_REPTILES],
  },
  dragon: {
    label: 'Bearded and water dragons',
    reptile: true,
    warmth: [['Bearded dragon', '28-36°C, basking 35-40°C'], ['Eastern water dragon', '25-35°C (NSW 27-33°C), basking 32-40°C']],
    notes: ['Put a thermometer at each end of the enclosure.'],
    sources: [VIC_LIZARDS, NSW_REPTILES],
  },
  python: {
    label: 'Carpet and diamond pythons',
    reptile: true,
    warmth: [['Preferred body temperature', '28-30°C (NSW diamond python 26-29°C)'], ['Basking spot', '32-35°C'], ['Humidity', '40-80%']],
    notes: [],
    sources: [{ title: 'Victorian Wildlife Rehabilitation Guidelines, Part B Reptiles and Amphibians, Ch 2 Snakes', publisher: 'DEECA (Victoria)', date: 'no date printed', authors: 'none named', url: 'https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0024/671253/Part-B-Reptiles-Amphibians-Chapter-2.pdf' }, NSW_REPTILES],
  },
  turtle: {
    label: 'Freshwater turtles',
    reptile: true,
    warmth: [['Preferred body temperature', '20-26°C (NSW long-necked 22-26°C)'], ['Basking spot', '26-30°C'], ['Water', '20-26°C; change water within 2-3°C of the tank']],
    notes: [],
    sources: [{ title: 'Victorian Wildlife Rehabilitation Guidelines, Part B Reptiles and Amphibians, Ch 3 Turtles', publisher: 'DEECA (Victoria)', date: 'no date printed', authors: 'none named', url: 'https://www.wildlife.vic.gov.au/__data/assets/pdf_file/0025/671254/Part-B-Reptiles-Amphibians-Chapter-3.pdf' }, NSW_REPTILES],
  },
};

Object.assign(SPECIES_RANGES, EXTRA_RANGES);

export const SPECIES_GROUP_IDS = Object.keys(SPECIES_RANGES);

/** For the prompt: just the ids and what they cover, so Claude can pick one. */
export const speciesGroupsForPrompt = () => SPECIES_GROUP_IDS.map((id) => `${id} (${SPECIES_RANGES[id].label})`).join(', ');

/** The figures to show for a group in the chosen state (state-specific warmth where the sources differ). */
// Rows written for babies (unfurred joeys, puggles, nestlings): an adult's plan leaves them out, so it only shows what applies.
const YOUNG_CONTEXT = /\b(joeys?|pouch young|puggles?|nestlings?|hatchlings?|fledglings?|chicks?|ducklings?|cygnets?|babies|baby|orphan(ed)?|pups?|pinkies|pinky|squabs?|squeakers?)\b/i;
const YOUNG_ROW = /unfurred|furless|velvet|fine fur|pouch|puggle|nestling|hatchling|branchling|joey|duckling|chick|squab/i;
export function rangesForAnimal(id, state = 'vic', context = '') {
  const g = rangesFor(id, state);
  if (!g || YOUNG_CONTEXT.test(String(context))) return g;
  const keep = ([k]) => !YOUNG_ROW.test(k) || /adult|juvenile/i.test(k);
  return { ...g, warmth: g.warmth.filter(keep), vitals: g.vitals.filter(keep) };
}
export function rangesFor(id, state = 'vic') {
  const g = SPECIES_RANGES[id];
  if (!g) return null;
  const warmth = Array.isArray(g.warmth) ? g.warmth : g.warmth[state] || g.warmth.vic;
  return { ...g, id, vitals: g.vitals || [], warmth };
}
