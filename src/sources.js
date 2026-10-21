// Reference library for carer plans. Queensland sources first, Australian where Queensland has none.
// The app's AI can't browse, so plans are grounded in these checked sources and cite them by id.
export const SOURCES = [];

const byId = new Map();
export function lookupSource(id) {
  if (!byId.size) for (const s of SOURCES) byId.set(s.id, s);
  return byId.get(id) || null;
}
export const SOURCE_IDS = () => new Set(SOURCES.map((s) => s.id));

/** Compact text block for the prompt: Queensland first. */
export function sourcesForPrompt() {
  const order = (s) => (s.scope === 'qld' ? 0 : 1);
  return [...SOURCES]
    .sort((a, b) => order(a) - order(b))
    .map((s) => `${s.id} | ${s.scope} | ${s.title} (${s.publisher}) | ${s.points.join(' / ')}`)
    .join('\n');
}
