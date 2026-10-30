// Which state's guidance Wildlife Welfare Companion follows. Chosen at the top of the app and remembered on the device.
// Everything state-specific lives here: sources, emergency line, case numbers and how prompts describe the carer.
import { VIC_SOURCES } from './sources-vic.js';
import { QLD_SOURCES } from './sources-qld.js';
import { AU_SOURCES } from './sources-au.js';

// Signs of H5 bird flu (Wildlife Health Australia, Agriculture Victoria, Business Queensland; checked October 2026).
export const BIRD_FLU_SIGNS = [
  'Sudden death, often within a day, especially several birds at once',
  'Fluffed-up or droopy, tiredness or fatigue, eyes closed',
  'Trouble standing, walking or flying',
  'Wobbly or trembling, an odd head or neck position, or swimming in circles',
  'Trouble breathing, coughing or sneezing',
  'Diarrhoea',
];
// In mammals: most at risk are seals, sea lions, dolphins and scavengers or predators such as foxes, quolls and devils.
export const MAMMAL_FLU_SIGNS = [
  'Sudden illness or death',
  'Weakness, tiredness or fatigue',
  'Trouble walking or breathing',
  'Seizures or tremors',
  'Drooling or a runny nose',
];
const WHA_LINK = { text: 'Wildlife Health Australia: H5 bird flu resources for wildlife carers', url: 'https://wildlifehealthaustralia.com.au/Resource-Centre/H5-bird-flu' };

export const REGIONS = {
  vic: {
    code: 'vic',
    name: 'Victoria',
    adj: 'Victorian',
    org: 'Bunurong Wildlife Care, a registered wildlife shelter in Inverloch, Victoria',
    hotline: 'Wildlife Victoria',
    hotlineHours: '24/7',
    phone: '03 8400 7300',
    tel: '+61384007300',
    caseLabel: 'Wildlife Victoria case number',
    primary: 'Victorian Government (DEECA) guidance and the Victorian code of practice',
    sources: [...VIC_SOURCES, ...AU_SOURCES],
    // Bird flu (H5) for Victoria, from Agriculture Victoria and DEECA (checked October 2026). Update the situation line as it changes.
    birdFlu: {
      situation: 'H5 bird flu is in wild birds along much of the Victorian coast and at some inland sites (Agriculture Victoria, October 2026).',
      report: 'Emergency Animal Disease Hotline, 1800 675 888 (24 hours), or the Agriculture Victoria online form',
      when: '5 or more sick or dead wild birds of any species in one place, or even one sick or dead seabird (such as a penguin), waterbird (such as a pelican or black swan), shorebird, bird of prey or marine mammal',
      rules: [
        'You don’t have to take in an animal that may have bird flu: confirm first that a vet or shelter with quarantine can take it.',
        'Quarantine every new animal before it mixes with others in care, as your authorisation requires.',
        'Don’t release a suspected case until Agriculture Victoria says it can go.',
        'After handling a suspected case, stay away from backyard poultry and other captive birds for 48 hours.',
        'Authorised rehabilitators can apply for a grant of up to $500 for protective equipment and disinfectant.',
      ],
      links: [
        { text: 'Agriculture Victoria: report sick or dead wild birds', url: 'https://agriculture.vic.gov.au/biosecurity/animal-diseases/poultry-diseases/H5N1-avian-influenza-H5-bird-flu/report-sick-or-dead-wild-birds-and-wildlife' },
        { text: 'Agriculture Victoria: guidance for vets and wildlife rehabilitators', url: 'https://agriculture.vic.gov.au/biosecurity/animal-diseases/poultry-diseases/H5N1-avian-influenza-H5-bird-flu/avian-influenza-information-for-veterinarians' },
        WHA_LINK,
      ],
    },
  },
  qld: {
    code: 'qld',
    name: 'Queensland',
    adj: 'Queensland',
    org: 'a wildlife care group in Queensland',
    hotline: 'RSPCA Queensland wildlife',
    hotlineHours: '7am to 7pm',
    phone: '1300 ANIMAL (1300 264 625)',
    tel: '+611300264625',
    caseLabel: 'RSPCA Queensland case or job number',
    primary: 'RSPCA Queensland guidance, then the Queensland code of practice and Queensland Government guidance',
    sources: [...QLD_SOURCES, ...AU_SOURCES],
    // Bird flu (H5) for Queensland, from the Queensland Government and Biosecurity Queensland (checked October 2026).
    birdFlu: {
      situation: 'H5 bird flu has been found in wild birds in Queensland, first in a petrel on Moreton Island in July 2026. Check the current situation page for the latest.',
      report: 'Emergency Animal Disease Hotline, 1800 675 888 (24 hours), or Biosecurity Queensland, 13 25 23 (business hours)',
      when: 'any bird or animal you suspect has bird flu (you have a legal duty to report it), and 5 or more sick or dead wild birds in one place',
      rules: [
        'You don’t have to take in a suspected case; there is no known treatment and few recover.',
        'Keep birds in care away from pet birds and other animals, and clean enclosures, bedding and equipment.',
        'Stay away from domestic birds and poultry for 48 hours before and after handling wild birds.',
      ],
      links: [
        { text: 'Biosecurity Queensland: current situation', url: 'https://www.business.qld.gov.au/industries/farms-fishing-forestry/agriculture/alerts/avian-influenza/current-situation' },
        { text: 'Queensland Government: bird flu for wildlife rehabilitators', url: 'https://www.qld.gov.au/initiative/birdflu/wildlife-rehabilitators' },
        WHA_LINK,
      ],
    },
  },
};

let current = 'vic';
export const region = () => REGIONS[current];
export function setRegion(code) {
  current = REGIONS[code] ? code : 'vic';
  return region();
}

/** Where a source sits in the prompt: RSPCA Queensland first in Queensland, then the state, then national. */
export function sourceRank(s, code = current) {
  if (code === 'qld' && /RSPCA Queensland/.test(s.publisher)) return 0;
  return s.scope === code ? 1 : 2;
}
