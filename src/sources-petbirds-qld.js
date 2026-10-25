// Pet (companion, aviary and backyard) birds in Queensland: welfare law, housing standards, native bird licensing,
// biosecurity and council rules. Researched October 2026 from Queensland Government, council and AVA pages.
// Used ONLY by the Expert opinion feature, and only when the opinion is about pet birds in Queensland: the rest of
// the app is about wildlife and never sees these. Figures are as the sources gave them; penalty dollar amounts are
// indexed to penalty units and change each year. Details the research couldn't confirm are left out.
export const PET_BIRD_QLD_SOURCES = [
  {
    id: 'qld-acpa-2001',
    title: 'Animal Care and Protection Act 2001',
    publisher: 'Queensland Government (legislation.qld.gov.au)',
    authors: 'none named',
    date: 'In force 27 April 2026',
    scope: 'qld',
    url: 'https://www.legislation.qld.gov.au/view/whole/html/inforce/2026-04-27/act-2001-064',
    points: [
      "Section 17: a person in charge of an animal owes it a duty of care and must not breach it. They breach it by not taking reasonable steps to provide the animal's needs in an appropriate way: food and water; accommodation or living conditions; the ability to display normal patterns of behaviour; treatment of disease or injury; and appropriate handling, which since 2020 includes any confinement or transportation of the animal.",
      'Section 18: a person must not be cruel to an animal. Cruelty includes confining or transporting an animal in a way that is inappropriate for its welfare, without appropriate food, rest, shelter or water, or with too few, too many or incompatible animals; causing unjustifiable, unnecessary or unreasonable pain; and overcrowding.',
      "Under the Act, 'confine' includes caging and other captivity.",
      'Since 2022, a breach of duty of care that causes death, serious deformity, serious disability or prolonged suffering is an aggravated offence with a higher maximum penalty (2,000 penalty units or 3 years imprisonment), the same maximum as cruelty.',
    ],
  },
  {
    id: 'bq-cruelty-duty-abandoning',
    title: 'Cruelty, duty of care and abandoning animals',
    publisher: 'Business Queensland (Queensland Government)',
    authors: 'none named',
    date: 'Accessed October 2026 (penalty amounts indexed)',
    scope: 'qld',
    url: 'https://www.business.qld.gov.au/industries/farms-fishing-forestry/agriculture/animal/health/welfare/qld/cruelty',
    points: [
      "Maximum penalties for an individual (as shown in 2026): breach of duty of care $51,810 or 1 year's imprisonment; aggravated breach of duty of care $345,400 or 3 years; cruelty $345,400 or 3 years; unreasonable abandonment or release of an animal $51,810 or 1 year.",
      "Serious animal cruelty is a separate offence under Queensland's Criminal Code, with a maximum of 7 years' imprisonment.",
    ],
  },
  {
    id: 'bq-enforcing-acpa',
    title: 'Enforcing the Animal Care and Protection Act',
    publisher: 'Business Queensland (Queensland Government)',
    authors: 'none named',
    date: 'Accessed October 2026',
    scope: 'qld',
    url: 'https://www.business.qld.gov.au/industries/farms-fishing-forestry/agriculture/animal/health/welfare/qld/enforce',
    points: [
      'Inspectors appointed under the Act can enter places, inspect and seize animals, and issue animal welfare directions requiring a person to fix a welfare problem.',
      'A person given an animal welfare direction, seizure direction or forfeiture notice can ask for the decision to be reviewed.',
      'Amendments from 12 December 2022 strengthened inspectors’ powers to enforce animal welfare directions.',
    ],
  },
  {
    id: 'qld-acpr-2023-domestic-fowl',
    title: 'Animal Care and Protection Regulation 2023: Schedule 1, Code of practice about domestic fowl',
    publisher: 'Queensland Government (legislation.qld.gov.au)',
    authors: 'none named',
    date: 'SL 2023 No. 117 (replaced the 2012 Regulation)',
    scope: 'qld',
    url: 'https://www.legislation.qld.gov.au/view/pdf/2023-09-01/sl-2023-0117',
    points: [
      "Queensland's compulsory welfare codes are in the 2023 Regulation; Schedule 1 is the compulsory code for domestic fowl (chickens), which applies to backyard hens as well as farms.",
      'Fowl must have access to food and water at least once every 24 hours; the food and water must be adequate in nutrition and quantity and not harmful, and the water drinkable for the birds.',
      'Fowl, their cages, and their water and feed equipment must be checked at least once every 24 hours.',
      'Free-range fowl must have shade, shelter and protection from predators.',
    ],
  },
  {
    id: 'bq-poultry-welfare-code',
    title: 'Poultry welfare code',
    publisher: 'Business Queensland (Queensland Government)',
    authors: 'none named',
    date: 'Accessed October 2026',
    scope: 'qld',
    url: 'https://www.business.qld.gov.au/industries/farms-fishing-forestry/agriculture/animal/health/welfare/codes/poultry',
    points: [
      'The Model Code of Practice for the Welfare of Animals: Domestic Poultry (4th edition) is an adopted code in Queensland and applies to all ages and types of poultry, whether kept commercially or as a hobby, so it covers backyard flocks.',
      'The Australian Animal Welfare Standards and Guidelines for Poultry (endorsed nationally in 2023) are to replace the model code once adopted in Queensland.',
    ],
  },
  {
    id: 'qld-exempt-native-birds',
    title: "What animals don't need a licence (keeping native animals)",
    publisher: 'Queensland Government (qld.gov.au)',
    authors: 'none named',
    date: 'Accessed October 2026 (Nature Conservation (Animals) Regulation 2020)',
    scope: 'qld',
    url: 'https://www.qld.gov.au/environment/plants-animals/wildlife-permits/permit-types/keeping-native-animals/animals-that-dont-need-a-licence',
    points: [
      'In Queensland, native birds can be kept as pets only if the species is exempt or the keeper holds a licence. The exempt list has 68 bird species, but the exemption only covers captive-bred birds whose parents were lawfully kept; taking any native bird from the wild needs authorisation.',
      "Whether a particular native species needs a licence is checked with the Queensland Government's 'What animals can I keep?' tool; buying a native bird from an unlicensed seller can lead to the bird being seized.",
    ],
  },
  {
    id: 'qld-native-animal-licences',
    title: 'Licences to keep, use or display native animals',
    publisher: 'Queensland Government (qld.gov.au)',
    authors: 'none named',
    date: 'Accessed October 2026 (framework since 22 August 2020)',
    scope: 'qld',
    url: 'https://www.qld.gov.au/environment/plants-animals/wildlife-permits/permit-types/keeping-native-animals/native-animal',
    points: [
      'Since 22 August 2020 there are three licences for keeping protected native animals: Standard (up to 10 Class 1 animals, no breeding), Specialised (up to 50 Class 1 and Class 2 birds, reptiles and amphibians) and Advanced. Licence holders keep records online and lodge returns.',
      'It is illegal to take and keep native animals from the wild.',
    ],
  },
  {
    id: 'bq-biosecurity-entity-registration',
    title: 'Who must be registered as a biosecurity entity',
    publisher: 'Business Queensland (Queensland Government)',
    authors: 'none named',
    date: 'Accessed October 2026',
    scope: 'qld',
    url: 'https://www.business.qld.gov.au/industries/farms-fishing-forestry/agriculture/biosecurity/entity-registration/who',
    points: [
      'Under the Biosecurity Act 2014 (Qld), a person who keeps 100 or more birds raised for meat or eggs for people to eat, or birds released into free flight after being kept in captivity (such as poultry or pigeons), must register as a biosecurity entity. Registration lasts 3 years.',
    ],
  },
  {
    id: 'qld-bird-disease-reporting',
    title: 'Reportable diseases; Newcastle disease',
    publisher: 'Department of Primary Industries and Business Queensland (Queensland Government)',
    authors: 'none named',
    date: 'Accessed October 2026',
    scope: 'qld',
    url: 'https://www.dpi.qld.gov.au/business-priorities/biosecurity/animal-biosecurity-welfare/animal-health-pests-diseases/reportable',
    points: [
      'Everyone who owns, treats or manages birds has a general biosecurity obligation under the Biosecurity Act 2014 (Qld) to take reasonable and practical steps to prevent or minimise biosecurity risks; not doing so is an offence.',
      'Avian influenza and Newcastle disease in birds are reportable in Queensland: report within 24 hours, even without a diagnosis, to Biosecurity Queensland on 13 25 23 or the Emergency Animal Disease Hotline on 1800 675 888.',
      'Psittacosis (parrot fever) is a notifiable disease in people under Queensland public health law.',
    ],
  },
  {
    id: 'qld-council-bird-rules',
    title: 'Council rules for keeping birds: Brisbane City Council (Animals Local Law 2017), City of Gold Coast (Local Law No. 12 Animal Management 2013) and City of Moreton Bay (Animal Management Local Law 2023)',
    publisher: 'Brisbane City Council; City of Gold Coast; City of Moreton Bay',
    authors: 'none named',
    date: 'Accessed October 2026 (Moreton Bay fact sheets November 2023 and January 2024)',
    scope: 'qld',
    url: 'https://www.goldcoast.qld.gov.au/Services/Animals-pets/Animal-ownership-requirements/Bird-poultry-requirements-permits',
    points: [
      'Each Queensland council sets its own limits on how many birds can be kept, where aviaries and coops can go, and roosters; they vary by council and lot size.',
      'Brisbane: a permit is needed for poultry in residential areas (up to 6 birds on lots up to 800 m², 20 on larger lots); no roosters in residential areas; enclosures at least 1 m from any dividing fence.',
      'Gold Coast: small birds such as budgies and canaries, 4 on lots under 300 m² and 20 on 300 to 1,999 m²; cockatiel-sized birds 2 and 10; cockatoos and galahs 1 and 2. Aviaries more than 1 m from side and rear boundaries; more birds than the limit needs a permit.',
      'Moreton Bay: roofed or caged animal enclosures at least 1.5 m from any boundary; pet birds other than poultry need a leg band or microchip; poultry limits rise with lot size (none under 300 m², 6 on 600 to 1,000 m²).',
      'Under all three, birds must not cause a noise, smell or other nuisance to neighbours.',
    ],
  },
  {
    id: 'vic-code-housing-caged-birds',
    title: 'Code of Practice for the Housing of Caged Birds',
    publisher: 'Agriculture Victoria (Victorian Government)',
    authors: 'none named',
    date: 'Accessed October 2026',
    scope: 'vic',
    url: 'https://agriculture.vic.gov.au/livestock-and-animals/animal-welfare-victoria/pocta-act-1986/victorian-codes-of-practice-for-animal-welfare/code-of-practice-for-the-housing-of-caged-birds',
    points: [
      'A Victorian code, not law in Queensland, but the most detailed Australian minimum standard for cage and aviary birds and widely used as a benchmark.',
      'Caged birds need space to fly, roost and get away from other birds; a cage should be at least twice as long and wide as the length of the largest bird in it.',
      'Minimum indoor cage sizes by bird length: 200 mm birds such as budgerigars 1,600 sq cm floor and 34 cm high (plus 800 sq cm per extra bird); 400 mm birds such as galahs 10,000 sq cm and 90 cm high (plus 5,000 sq cm per bird); 500 mm birds such as sulphur-crested cockatoos 15,000 sq cm and 150 cm high (plus 7,500 sq cm per bird). Outdoor aviaries at least 1.5 m high.',
      'Housing must protect birds from extremes of weather and from predators, give a draught-free shelter, perches of different diameters that let every bird perch comfortably without blocking flight, and separate food and water stations. A cage shared by different species must suit the largest bird.',
    ],
  },
  {
    id: 'ava-avian-policies',
    title: 'Native animals as pets; Sale of unweaned altricial birds (policies)',
    publisher: 'Australian Veterinary Association',
    authors: 'none named',
    date: 'Accessed October 2026',
    scope: 'au',
    url: 'https://www.ava.com.au/policy-advocacy/policies/unusual-pets-and-avian/native-animals-as-pets/',
    points: [
      'Native animals should be kept as pets only by keepers who are licensed where required and able to keep the species well, with animals ethically sourced from captive populations, not taken from the wild.',
      'Unweaned altricial birds (chicks still being hand-fed) should not be sold; selling them to inexperienced buyers compromises their welfare.',
    ],
  },
];

// Words that put an opinion about birds in a pet, aviary or backyard setting rather than the wild.
const PET_BIRD = /\b(budgies?|budgerigars?|cockatiels?|canar(y|ies)|lovebirds?|aviar(y|ies)|bird ?cages?|caged birds?|backyard (hens|chickens|poultry|flock)|chickens?|hens|roosters?|poultry|racing pigeons?|pet (birds?|parrots?|cockatoos?|galahs?|corellas?|pigeons?|doves?|ducks?)|(parrots?|cockatoos?|galahs?|corellas?|finch(es)?|pigeons?|doves?) (kept|in a cage|as a pet|as pets))\b/i;
const QLD = /\b(queensland|qld|brisbane|gold coast|sunshine coast|moreton bay|logan|ipswich|toowoomba|cairns|townsville|mackay|rockhampton|bundaberg|redland)\b/i;

/** Is this expert opinion about pet birds in Queensland? (The state chosen in the app counts as well as the words.) */
export const isPetBirdQld = (text = '', regionCode = '') => PET_BIRD.test(text) && (regionCode === 'qld' || QLD.test(text));

/** The pet bird sources as prompt lines (same layout as the main library), or '' when they don't apply. */
export function petBirdSourcesForPrompt(text = '', regionCode = '') {
  if (!isPetBirdQld(text, regionCode)) return '';
  return PET_BIRD_QLD_SOURCES.map((s) => `${s.id} | ${s.scope} | ${s.title} (${s.publisher}, ${s.date}) | ${s.points.join(' / ')} | ${s.url}`).join('\n');
}
