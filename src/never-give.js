// "Never give / never do" warnings for wildlife in care. Every entry comes from a checked source.
// The app never recommends a drug or dose; it only picks which of these warnings apply, and shows them word for word.
export const NEVER_GIVE_FOOTER = 'Always check with a vet.';

const RAW = [];

export const NEVER_GIVE = RAW.map((w, i) => ({ id: `ng-${i + 1}`, ...w }));
const byId = new Map(NEVER_GIVE.map((w) => [w.id, w]));
export const NEVER_GIVE_IDS = () => new Set(byId.keys());
export const lookupNeverGive = (id) => byId.get(id) || null;

/** Compact list for prompts: id | species | warning. */
export function neverGiveForPrompt() {
  return NEVER_GIVE.map((w) => `${w.id} | ${w.species} | ${w.warning}`).join('\n');
}
