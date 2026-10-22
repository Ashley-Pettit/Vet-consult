// Feeding guidance for the prompt and a check on the feed calculator, from the checked rows in feeding-data.js.
import { FEEDING } from './feeding-data.js';
import { groupsIn } from './species-vet.js';

const BIRD_CLASS = new Set(['bird', 'passerine', 'magpie', 'parrot', 'black-cockatoo', 'lorikeet', 'pigeon', 'frogmouth-owl', 'raptor', 'kookaburra', 'waterbird', 'seabird', 'penguin', 'shorebird', 'lapwing', 'curlew', 'brush-turkey', 'ibis', 'pelican', 'cuckoo', 'cassowary']);
// Groups that share rows (an ibis is fed like a waterbird, a shorebird like a lapwing chick).
const SHARES = { ibis: 'waterbird', pelican: 'waterbird', shorebird: 'lapwing' };

const rowsFor = (groups) => {
  const want = new Set(groups.flatMap((g) => [g, SHARES[g]]).filter(Boolean));
  if (groups.some((g) => BIRD_CLASS.has(g))) want.add('general');
  return FEEDING.filter((r) => want.has(r.group));
};

const fmt = (r) => [
  `${r.group} | ${r.stage}`,
  r.food && `food: ${r.food}`,
  r.how_often && `how often: ${r.how_often}`,
  r.amount && `amount: ${r.amount}`,
  r.warmth && `warmth: ${r.warmth}`,
  r.other && `notes: ${r.other}`,
  r.never && r.never.length && `never: ${r.never.join('; ')}`,
].filter(Boolean).join(' | ') + ` [${r.source}${r.section ? `, ${r.section}` : ''}]`;

/** Checked feeding rows for the animals named, with the rules for using them. Empty when none apply. */
export function feedingForPrompt(text = '') {
  const rows = rowsFor(groupsIn(text));
  if (!rows.length) return '';
  return `Checked feeding guidance for this animal (group | stage | details [source]). Use it for the feeding section, warmth and the feed calculator:
- Pick the row for this species and stage (age, weight, fur or feather stage). Follow its food, how often and amount; where rows from different sources differ, follow the Victorian or Queensland source for the user's state, then the most specific one.
- feed_calc: when a row gives the daily amount as a percentage of body weight and the feeds a day for this stage, use exactly those figures, name the source in "basis" and set "sure" true. If a row gives an amount per feed as a percentage of body weight, multiply it by the feeds a day. If no row matches this stage exactly, use the nearest row and set "sure" false.
- Never give a food, product or figure that conflicts with these rows.
${rows.map(fmt).join('\n')}`;
}

const nums = (v) => (Array.isArray(v) ? v.map(Number) : v == null ? [] : [Number(v), Number(v)]).filter((n) => Number.isFinite(n));

/**
 * Is the plan's daily percentage one the checked rows support for this group? true / false,
 * or null when the rows give no percentage for this group (nothing to check against).
 */
export function feedFigureChecked(group, pct) {
  if (!group || !Number.isFinite(Number(pct))) return null;
  const rows = rowsFor([group]).filter((r) => r.group !== 'general');
  const ranges = rows.map((r) => nums(r.pct)).filter((n) => n.length === 2);
  if (!ranges.length) return rows.length ? null : false;
  const p = Number(pct);
  return ranges.some(([lo, hi]) => p >= lo * 0.9 && p <= hi * 1.1);
}
