// Reference library for carer plans: the chosen state's checked sources first, national where the state has none.
// The app's AI can't browse, so plans are grounded in these checked sources and cite them by id.
import { VIC_SOURCES } from './sources-vic.js';
import { QLD_SOURCES } from './sources-qld.js';
import { AU_SOURCES } from './sources-au.js';
import { region, sourceRank } from './region.js';

/** Sources for the state currently chosen. */
export const currentSources = () => region().sources;
// Kept for older callers and tests: the Victorian library.
export const SOURCES = VIC_SOURCES;

// Look-ups work across both states, so a plan made under one still shows its sources after switching.
const byId = new Map([...VIC_SOURCES, ...QLD_SOURCES, ...AU_SOURCES].map((s) => [s.id, s]));
export const lookupSource = (id) => byId.get(id) || null;
/** Ids a plan may cite: only the chosen state's library. */
export const SOURCE_IDS = () => new Set(currentSources().map((s) => s.id));

/** Compact text block for the prompt, most important first (RSPCA Queensland leads in Queensland). */
export function sourcesForPrompt() {
  return [...currentSources()]
    .sort((a, b) => sourceRank(a) - sourceRank(b))
    .map((s) => `${s.id} | ${s.scope} | ${s.title} (${s.publisher}) | ${s.points.join(' / ')}`)
    .join('\n');
}
