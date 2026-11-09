// The cage chart: the vet's intake chart, kept by the connection with an edit key, so the QR code on the cage opens
// the same chart on any phone and whoever scans it can add to it (feeds, weights, medicines given, how it's doing).
export const LOG_MAX = 300;
const PHOTO_RE = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/;

/** What's stored: the chart (the intake document), a small photo, and the entries added at the cage. */
export function cageRecord(d, photo = null, log = []) {
  const { cage, ...chart } = d || {};
  return { type: 'doc', kind: 'cage', d: chart, photo: typeof photo === 'string' && PHOTO_RE.test(photo) ? photo : null, log: normaliseLog(log) };
}

const s = (v, n) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n);
const pick = (v, list) => (list.includes(v) ? v : '');
export const ATE = ['None', 'Some', 'Most', 'All'];
export const WEE = ['Yes', 'No'];
export const POO = ['Normal', 'Abnormal', 'None'];
export const MOOD = ['Bright', 'Quiet', 'Dull', 'Unresponsive'];
export const STATUSES = ['In care', 'Intensive care', 'Quarantine', 'Isolation', 'Pre-release', 'Released', 'Transferred', 'Died', 'Euthanased'];

/** One entry in the daily record: when, who, and any of weight, eating, toileting, demeanour, medicines given,
 *  a status change and notes. An entry with none of these is dropped. */
function entry(e) {
  const x = e && typeof e === 'object' ? e : {};
  const g = Number(x.weight_g);
  const out = {
    at: Number(x.at) || 0,
    by: s(x.by, 60),
    weight_g: Number.isFinite(g) && g > 0 && g < 1e6 ? Math.round(g * 10) / 10 : null,
    ate: pick(x.ate, ATE),
    wee: pick(x.wee, WEE),
    poo: pick(x.poo, POO),
    mood: pick(x.mood, MOOD),
    meds: (Array.isArray(x.meds) ? x.meds : []).map((m) => s(m, 160)).filter(Boolean).slice(0, 12),
    status: pick(x.status, STATUSES),
    text: s(x.text, 1000),
  };
  const any = out.weight_g != null || out.ate || out.wee || out.poo || out.mood || out.meds.length || out.status || out.text;
  return out.at && any ? out : null;
}
export function normaliseLog(log) {
  return (Array.isArray(log) ? log : []).map(entry).filter(Boolean).slice(-LOG_MAX);
}

/** The record with one more entry (oldest first, as stored). */
export const withEntry = (log, e, at = Date.now()) => normaliseLog([...normaliseLog(log), { ...e, at }]);

/** The chart's status now: the latest status entry, otherwise the one set at intake. */
export const currentStatus = (log, start = 'In care') => [...normaliseLog(log)].reverse().find((e) => e.status)?.status || start;

/** "2.1 kg", "410 g" or "410" (grams) as grams; null if it isn't a weight. */
export function grams(text) {
  const m = /(\d+(?:\.\d+)?)\s*(kg|g)?\b/i.exec(String(text || ''));
  if (!m) return null;
  return /kg/i.test(m[2] || '') ? Math.round(Number(m[1]) * 1000 * 10) / 10 : Number(m[1]);
}
export const showWeight = (g) => (g >= 1000 ? `${Math.round(g / 10) / 100} kg` : `${g} g`);

/** Weights over time: admission, then each weighed entry. Change is from the first to the latest. */
export function weightTrend(admission, log) {
  const pts = [...(admission ? [{ at: 0, g: admission }] : []), ...normaliseLog(log).filter((e) => e.weight_g != null).map((e) => ({ at: e.at, g: e.weight_g }))];
  if (!pts.length) return null;
  const first = pts[0].g;
  const last = pts[pts.length - 1].g;
  return { first, last, count: pts.length, change: pts.length > 1 ? Math.round(((last - first) / first) * 1000) / 10 : 0 };
}

/** The last time each medicine was ticked as given: { name: entry }. */
export function lastGiven(log) {
  const out = {};
  for (const e of normaliseLog(log)) for (const m of e.meds) out[m] = e;
  return out;
}

/** The QR code as an SVG element: dark squares drawn as one path, with a quiet zone around it. The QR library loads
 *  only when a chart is shown, so it doesn't slow the app down otherwise. */
export async function qrSvg(text, doc = document) {
  const { default: qrcode } = await import('qrcode-generator');
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  const pad = 4;
  let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c + pad} ${r + pad}h1v1h-1z`;
  const ns = 'http://www.w3.org/2000/svg';
  const svg = doc.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', `0 0 ${n + pad * 2} ${n + pad * 2}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'QR code that opens this chart');
  svg.setAttribute('shape-rendering', 'crispEdges');
  const bg = doc.createElementNS(ns, 'rect');
  bg.setAttribute('width', '100%');
  bg.setAttribute('height', '100%');
  bg.setAttribute('fill', '#fff');
  const p = doc.createElementNS(ns, 'path');
  p.setAttribute('d', d);
  p.setAttribute('fill', '#000');
  svg.append(bg, p);
  return svg;
}

/** "Mon 9 Nov, 3:10 pm" */
export const entryTime = (at) =>
  new Date(at).toLocaleString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
