// Reference library for carer plans. Bunurong Wildlife Care edition: Victorian sources first, national where Victoria has none.
// The app's AI can't browse, so plans are grounded in these checked sources and cite them by id.
import { VIC_SOURCES } from './sources-vic.js';
export const SOURCES = VIC_SOURCES;

const byId = new Map();
export function lookupSource(id) {
  if (!byId.size) for (const s of SOURCES) byId.set(s.id, s);
  return byId.get(id) || null;
}
export const SOURCE_IDS = () => new Set(SOURCES.map((s) => s.id));

/** Compact text block for the prompt: Victoria first. */
export function sourcesForPrompt() {
  const order = (s) => (s.scope === 'vic' ? 0 : 1);
  return [...SOURCES]
    .sort((a, b) => order(a) - order(b))
    .map((s) => `${s.id} | ${s.scope} | ${s.title} (${s.publisher}) | ${s.points.join(' / ')}`)
    .join('\n');
}
