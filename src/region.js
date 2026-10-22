// Which state's guidance Care Scribe follows. Chosen at the top of the app and remembered on the device.
// Everything state-specific lives here: sources, emergency line, case numbers and how prompts describe the carer.
import { VIC_SOURCES } from './sources-vic.js';
import { QLD_SOURCES } from './sources-qld.js';

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
    sources: VIC_SOURCES,
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
    sources: QLD_SOURCES,
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
