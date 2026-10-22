// Feeding guidance for the prompt and a check on the feed calculator, from the checked rows in feeding-data.js.
import { FEEDING, FEED_CHARTS } from './feeding-data.js';
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
 * Is the plan's daily percentage one the checked rows support for this group? true or false.
 */
export function feedFigureChecked(group, pct) {
  if (!group || !Number.isFinite(Number(pct))) return null;
  const rows = rowsFor([group]).filter((r) => r.group !== 'general');
  const ranges = rows.map((r) => nums(r.pct)).filter((n) => n.length === 2);
  if (!ranges.length) return false; // no checked percentage for this group: the plan's figure can't be backed
  const p = Number(pct);
  return ranges.some(([lo, hi]) => p >= lo * 0.9 && p <= hi * 1.1);
}

const has = (t, w) => new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s?([^a-z]|$)`).test(t);

/** The Wombaroo growth chart for the animal named (the most specific match wins), or null. */
export function chartFor(text = '', regionCode = 'vic') {
  const t = String(text).toLowerCase();
  let best = null;
  for (const c of FEED_CHARTS) {
    if (c.region && c.region !== regionCode) continue;
    const w = c.words.filter((x) => has(t, x)).sort((a, b) => b.length - a.length)[0];
    if (w && (!best || w.length > best.len)) best = { chart: c, len: w.length };
  }
  return best ? best.chart : null;
}
export const chartByKey = (key) => FEED_CHARTS.find((c) => c.key === key) || null;

/** Millilitres a day from the chart at this weight, read between the two nearest points; null outside the chart. */
export function chartAmount(chart, weightG) {
  const w = Number(weightG);
  if (!chart || !Number.isFinite(w) || w <= 0) return null;
  const pts = chart.points;
  if (w < pts[0][0] || w > pts[pts.length - 1][0]) return null;
  for (let i = 1; i < pts.length; i++) {
    const [w0, m0, p0] = pts[i - 1];
    const [w1, m1, p1] = pts[i];
    if (w <= w1) {
      const ml = w1 === w0 ? m1 : m0 + ((w - w0) / (w1 - w0)) * (m1 - m0);
      // The milk stage at this weight: the stage of the segment it falls in (the heavier point's stage on a change-over plateau).
      return { perDay: ml, product: w === w1 ? p1 : m0 === m1 && p0 !== p1 ? p1 : p0 };
    }
  }
  return null;
}
