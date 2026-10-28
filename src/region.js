// Which state's guidance Wildlife Welfare Companion follows. Chosen at the top of the app and remembered on the device.
// Everything state-specific lives here: sources, emergency line, case numbers and how prompts describe the carer.
import { VIC_SOURCES } from './sources-vic.js';
import { QLD_SOURCES } from './sources-qld.js';
import { AU_SOURCES } from './sources-au.js';

// Signs of H5 bird flu in birds, the same in both states (Agriculture Victoria; Business Queensland).
export const BIRD_FLU_SIGNS = [
  'Sudden death, often within a day',
  'Ruffled feathers, sleepy, eyes closed',
  'Can’t stand or fly',
  'Wobbly, trembling, twisted neck or swimming in circles',
  'Trouble breathing, coughing or sneezing',
  'Diarrhoea',
];

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
    // Bird flu (H5): what bird plans show, from Agriculture Victoria (checked October 2026).
    birdFlu: {
      report: 'Emergency Animal Disease Hotline, 1800 675 888 (24 hours), or the Agriculture Victoria online form',
      when: '5 or more sick or dead wild birds in one place, or even one penguin, pelican, bird of prey, black swan, seal or dolphin',
      link: { text: 'Agriculture Victoria: report sick or dead wild birds', url: 'https://agriculture.vic.gov.au/biosecurity/animal-diseases/poultry-diseases/avian-influenza-bird-flu/report-sick-or-dead-wild-birds-and-wildlife' },
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
    // Bird flu (H5): from the Queensland Government and Biosecurity Queensland (checked October 2026).
    birdFlu: {
      report: 'Emergency Animal Disease Hotline, 1800 675 888 (24 hours), or Biosecurity Queensland, 13 25 23 (business hours)',
      when: '5 or more sick or dead wild birds in one place, or any bird you suspect has bird flu (you have a legal duty to report it)',
      link: { text: 'Queensland Government: bird flu for wildlife rehabilitators', url: 'https://www.qld.gov.au/initiative/birdflu/wildlife-rehabilitators' },
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
