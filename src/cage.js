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
export function normaliseLog(log) {
  return (Array.isArray(log) ? log : [])
    .map((e) => ({ at: Number(e && e.at) || 0, text: s(e && e.text, 1000), by: s(e && e.by, 60) }))
    .filter((e) => e.text && e.at)
    .slice(-LOG_MAX);
}

/** The chart with one more entry (oldest first, as stored). */
export const withEntry = (log, text, by = '', at = Date.now()) => normaliseLog([...normaliseLog(log), { at, text, by }]);

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
