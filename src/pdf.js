// PDF printouts: the same printout model as Word (word.js), laid out to match the Word house style: a full-width
// brand band on page one, a slim band after it, olive section headings, tinted tables and coloured callouts.
// Loaded only when someone taps "Share as PDF" (it brings its own fonts, so it's big).
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { LOGO_PNG_BASE64 } from './brand-logo.js';
import { THEMES } from './word.js';
import { formatDate } from './note.js';
import { region } from './region.js';

pdfMake.vfs = (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) || (pdfFonts && pdfFonts.vfs) || pdfFonts;

const INK = '#1C1C1C';
const MUTED = '#666666';
const hex = (c) => `#${String(c).replace('#', '')}`;
const LOGO = `data:image/png;base64,${LOGO_PNG_BASE64}`;
const A4 = { w: 595.28, h: 841.89 };
const SIDE = 42; // side margin in points
const twips = (n) => n / 20; // Word widths are in twentieths of a point

function bytesToDataUrl(data) {
  if (typeof data === 'string') return data.startsWith('data:') ? data : `data:image/jpeg;base64,${data}`;
  let s = '';
  for (let i = 0; i < data.length; i += 0x8000) s += String.fromCharCode.apply(null, data.subarray(i, i + 0x8000));
  return `data:image/jpeg;base64,${btoa(s)}`;
}

function themeColours(id) {
  const t = { ...(THEMES[id] || THEMES.bunurong) };
  return { t, OLIVE: hex(t.primary), TERRA: hex(t.accent), TINT: hex(t.tint), LINE: hex(t.line) };
}

/** model: the same printout model Word uses. Returns a Blob. */
export async function buildPdf(model, { preparedBy = '', date = new Date(), template = 'bunurong' } = {}) {
  const { t, OLIVE, TERRA, TINT, LINE } = themeColours(template);
  const TONES = {
    summary: { fill: TINT, bar: OLIVE, label: OLIVE },
    photo: { fill: TINT, bar: OLIVE, label: OLIVE },
    warn: { fill: '#FFF6E5', bar: '#D99A2B', label: '#8A5A00' },
    urgent: { fill: '#FBEFEB', bar: TERRA, label: TERRA },
  };
  const brandName = (t.wordmark || t.name || '').toUpperCase();

  // Bands drawn behind the page, edge to edge: big on page one, slim after. None on the landscape tick sheet.
  const background = (page, size) => {
    if (size.orientation === 'landscape') return '';
    if (page === 1 && !model.fridgeOnly) {
      return [
        { canvas: [{ type: 'rect', x: 0, y: 0, w: size.width, h: 108, color: OLIVE }] },
        ...(t.logo ? [{ image: LOGO, width: 56, absolutePosition: { x: (size.width - 56) / 2, y: 10 } }] : []),
        { text: t.logo || t.wordmark ? (t.name || '').toUpperCase() : brandName, color: '#FFFFFF', bold: true, fontSize: t.wordmark && !t.logo ? 22 : 11.5, characterSpacing: 2, alignment: 'center', absolutePosition: { x: 0, y: t.logo ? 70 : 40 } },
        { text: t.sub, color: '#FFFFFF', fontSize: 7.5, alignment: 'center', absolutePosition: { x: 0, y: t.logo ? 86 : 70 } },
      ];
    }
    return [
      { canvas: [{ type: 'rect', x: 0, y: 0, w: size.width, h: 30, color: OLIVE }] },
      ...(t.logo ? [{ image: LOGO, width: 18, absolutePosition: { x: SIDE, y: 6 } }] : []),
      { text: brandName, color: '#FFFFFF', bold: true, fontSize: 8, characterSpacing: 1.5, absolutePosition: { x: SIDE + (t.logo ? 26 : 0), y: 11 } },
      { text: String(model.docType || '').toUpperCase(), color: '#FFFFFF', fontSize: 7, characterSpacing: 1, alignment: 'right', absolutePosition: { x: 0, y: 12 }, margin: [0, 0, SIDE, 0] },
    ];
  };

  const footer = (page, pages, size) => (size && size.orientation === 'landscape') ? '' : {
    margin: [SIDE, 6, SIDE, 0],
    stack: [
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: A4.w - 2 * SIDE, y2: 0, lineWidth: 0.5, lineColor: LINE }] },
      { margin: [0, 4, 0, 0], columns: [
        { text: [...(t.motto ? [{ text: `${t.motto.toUpperCase()}   `, bold: true, color: TERRA, fontSize: 7.5, characterSpacing: 1 }] : []), { text: model.docType, color: MUTED, fontSize: 7 }] },
        { text: `Page ${page} of ${pages}`, alignment: 'right', color: MUTED, fontSize: 7, width: 80 },
      ] },
      { text: `Wildlife emergencies: ${region().hotline} (${region().hotlineHours}) on ${region().phone}`, color: MUTED, fontSize: 7 },
    ],
  };

  const heading = (text) => ({
    margin: [0, 12, 0, 5],
    columns: [
      { width: 3, canvas: [{ type: 'rect', x: 0, y: 0, w: 3, h: 11, color: TERRA }] },
      { text: String(text).toUpperCase(), bold: true, color: OLIVE, fontSize: 10, characterSpacing: 1.2, margin: [6, 0, 0, 0] },
    ],
    unbreakable: true,
  });
  const NUM = /^(\d+[.)])\s+([\s\S]*)$/;
  const item = (x) => {
    const m = String(x).match(NUM);
    return m
      ? { columns: [{ width: 16, text: m[1], bold: true }, { text: m[2] }], margin: [0, 0, 0, 3] }
      : { columns: [{ width: 12, text: '•', color: OLIVE }, { text: String(x) }], margin: [6, 0, 0, 3] };
  };
  const checkbox = (size = 8) => ({ width: size + 6, canvas: [{ type: 'rect', x: 0, y: 1.5, w: size, h: size, lineWidth: 0.8, lineColor: '#7A847A' }] });
  const check = (x) => ({ columns: [checkbox(), { text: String(x) }], margin: [4, 0, 0, 4] });
  const table = ({ head, rows, widths }) => {
    const total = (widths || head.map(() => 1)).reduce((a, b) => a + b, 0);
    const w = (widths || head.map(() => 1)).map((x) => `${(x / total) * 100}%`);
    return {
      margin: [0, 2, 0, 6],
      table: {
        headerRows: 1,
        keepWithHeaderRows: 1,
        dontBreakRows: true,
        widths: w,
        body: [
          head.map((h) => ({ text: String(h).toUpperCase(), bold: true, color: '#FFFFFF', fontSize: 7.5, fillColor: OLIVE, margin: [3, 2, 3, 2] })),
          ...rows.map((r, ri) => r.map((c) => ({ text: String(c ?? ''), fontSize: 8.5, margin: [3, 3, 3, 3], fillColor: ri % 2 ? '#F7F8F3' : null }))),
        ],
      },
      layout: { hLineColor: LINE, vLineColor: LINE, hLineWidth: () => 0.5, vLineWidth: () => 0.5 },
    };
  };
  const callout = (b) => {
    const tone = TONES[b.tone];
    return {
      margin: [0, 10, 0, 4],
      table: { widths: ['*'], body: [[{
        fillColor: tone.fill,
        margin: [8, 6, 8, 6],
        stack: [
          { text: String(b.heading).toUpperCase(), bold: true, color: tone.label, fontSize: 8.5, characterSpacing: 1.2, margin: [0, 0, 0, 4] },
          ...(b.text ? String(b.text).split(/\n+/).map((x) => ({ text: x, margin: [0, 0, 0, 3] })) : []),
          ...(b.items || []).map(item),
          ...(b.photos && b.photos.length ? [{ columns: b.photos.slice(0, 3).map((p) => ({ image: bytesToDataUrl(p), fit: [150, 150], width: 'auto' })), columnGap: 8, margin: [0, 4, 0, 0] }] : []),
        ],
      }]] },
      layout: { hLineWidth: () => 0, vLineWidth: (i) => (i === 0 ? 3 : 0), vLineColor: () => tone.bar },
      unbreakable: true,
    };
  };
  const label = (l) => ({
    margin: [0, 4, 0, 8],
    table: { widths: [300], body: [[{ margin: [8, 6, 8, 6], stack: [
      { text: l.animal, color: MUTED, fontSize: 8 },
      { text: l.drug, bold: true, fontSize: 11 },
      { text: l.directions },
      ...(l.duration ? [{ text: l.duration }] : []),
      { text: `${l.vet ? `${l.vet} · ` : ''}${l.date}`, color: MUTED, fontSize: 7.5 },
      { text: 'For animal treatment only. Keep out of reach of children.', color: MUTED, fontSize: 7.5, italics: true },
    ] }]] },
    layout: { hLineColor: OLIVE, vLineColor: OLIVE, hLineWidth: () => 1, vLineWidth: () => 1 },
    unbreakable: true,
  });

  // The page-one heading: document type, title, details on a tinted line, the AI note.
  const meta = [['Date', formatDate(date)], ...(preparedBy ? [['Prepared by', preparedBy]] : []), ...(model.meta || []).filter((m) => !(m[0] === 'Vet' && m[1] === preparedBy))].filter((m) => m[1]);
  const title = cleanTitle(model.title, model.docType);
  const content = [];
  if (!model.fridgeOnly) {
    content.push(
      { text: String(model.docType).toUpperCase(), bold: true, color: TERRA, fontSize: 9, characterSpacing: 2, margin: [0, 0, 0, 2] },
      { text: title, bold: true, fontSize: 20, color: INK, margin: [0, 0, 0, model.subtitle ? 2 : 8] },
      ...(model.subtitle ? [{ text: model.subtitle, color: MUTED, fontSize: 10.5, margin: [0, 0, 0, 8] }] : []),
      {
        table: { widths: meta.flatMap(() => [60, '*']).slice(0, Math.min(3, meta.length) * 2), body: chunk(meta, 3).map((row) => row.flatMap(([k, v]) => [
          { text: String(k).toUpperCase(), bold: true, color: OLIVE, fontSize: 7.5, fillColor: TINT, margin: [6, 3, 2, 3] },
          { text: String(v), fontSize: 9, fillColor: TINT, margin: [2, 3, 6, 3] },
        ]).concat(Array.from({ length: (Math.min(3, meta.length) - row.length) * 2 }, () => ({ text: '', fillColor: TINT })))) },
        layout: 'noBorders',
      },
    );
    if (model.aiNote) content.push({ text: model.aiNote, italics: true, color: MUTED, fontSize: 8.5, margin: [0, 6, 0, 2] });
    if (model.watch) content.push({ text: [{ text: 'Watch: ', bold: true, color: OLIVE }, { text: `${model.watch.title} (${model.watch.channel}${model.watch.date ? `, ${model.watch.date}` : ''})`, link: model.watch.url, color: OLIVE, decoration: 'underline' }], fontSize: 8.5, margin: [0, 2, 0, 2] });

    for (const b of model.blocks || []) {
      const has = b.text || (b.items && b.items.length) || (b.checks && b.checks.length) || b.table || (b.labels && b.labels.length) || (b.photos && b.photos.length);
      if (!b.heading || !has) continue;
      if (b.tone && TONES[b.tone]) { content.push(callout(b)); continue; }
      const parts = [heading(b.heading)];
      if (b.note && b.noteFirst) parts.push({ text: b.note, italics: true, color: TERRA, fontSize: 9, margin: [0, 0, 0, 4] });
      if (b.text) String(b.text).split(/\n+/).forEach((x) => parts.push({ text: x, margin: [0, 0, 0, 5] }));
      (b.items || []).forEach((x) => parts.push(item(x)));
      (b.checks || []).forEach((x) => parts.push(check(x)));
      if (b.table) parts.push(table(b.table));
      (b.labels || []).forEach((l) => parts.push(label(l)));
      if (b.note && !b.noteFirst) parts.push({ text: b.note, italics: true, color: MUTED, fontSize: 8, margin: [0, 2, 0, 0] });
      // A heading never sits alone at the bottom of a page.
      content.push({ stack: parts.slice(0, 2), unbreakable: true }, ...parts.slice(2));
    }
    if (model.sources && model.sources.length) {
      content.push(heading('Based on'));
      model.sources.forEach((s) => content.push({ columns: [{ width: 12, text: '•', color: OLIVE }, { text: [s.url ? { text: s.title, link: s.url, color: OLIVE, decoration: 'underline' } : { text: s.title }, { text: ` (${s.publisher})`, color: MUTED }], fontSize: 8 }], margin: [6, 0, 0, 2] }));
    }
  }
  if (model.tickSheet && model.tickSheet.items.length) content.push(...tickSheet(model.tickSheet, model.title, { OLIVE, TERRA, TINT, t, first: Boolean(model.fridgeOnly) }));

  const doc = {
    pageSize: 'A4',
    pageOrientation: model.fridgeOnly ? 'landscape' : 'portrait',
    pageMargins: model.fridgeOnly ? [SIDE, 34, SIDE, 40] : [SIDE, 48, SIDE, 52],
    background,
    footer,
    info: { title: model.title, author: t.creator, creator: t.creator },
    defaultStyle: { fontSize: 9.5, color: INK, lineHeight: 1.25 },
    // Page one starts below the big band.
    content: model.fridgeOnly ? content : [{ text: '', margin: [0, 66, 0, 0] }, ...content],
  };
  return new Promise((resolve, reject) => {
    try {
      pdfMake.createPdf(doc).getBlob((blob) => resolve(blob));
    } catch (e) {
      reject(e);
    }
  });
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out.length ? out : [[]];
}

function cleanTitle(title, docType) {
  const s = String(title || '');
  const m = s.match(/^([^:]{3,45}):\s+(.+)$/);
  if (!m) return s;
  const words = (x) => x.toLowerCase().replace(/[^a-z ]/g, '').trim();
  if (!words(String(docType)).includes(words(m[1]))) return s;
  return m[2].charAt(0).toUpperCase() + m[2].slice(1);
}

// The fridge sheet: its own landscape page with a big box per day.
function tickSheet(ts, title, { OLIVE, TERRA, TINT, t, first }) {
  const days = ts.days;
  const rows = sheetRows(ts);
  // Rows shrink a little for longer job lists, so the sheet always fits one landscape page.
  const extra = ts.help && ts.help.items.length ? Math.max(0, ts.help.items.length - 3) * 12 : 0;
  const rowH = Math.max(20, Math.min(36, Math.floor((175 - extra) / Math.max(1, rows.length))));
  const dayW = (A4.h - 2 * SIDE - 150) / days - 8; // usable width of one day's cell
  const box = (fill) => ({ canvas: [{ type: 'rect', x: Math.max(0, (dayW - 12) / 2), y: (rowH - 12) / 2 - 2, w: 12, h: 12, lineWidth: 0.9, lineColor: '#8A938A' }], fillColor: fill });
  const urgent = (ts.urgent || []).slice(0, 3);
  const help = ts.help && ts.help.items.length ? ts.help : null;
  const mid = (h) => Math.max(2, (rowH - h) / 2);
  const write = (label, fill) => ({ text: label, color: MUTED, fontSize: 8.5, alignment: 'center', margin: [0, mid(18), 0, 0], fillColor: fill });
  const cellFor = (r, fill) => (r.cell === 'g' ? write('_____ g', fill) : r.cell === 'ml' ? write('_____ mL', fill) : r.cell === 'text' ? { text: '', fillColor: fill } : box(fill));
  return [
    { text: '', pageBreak: first ? undefined : 'before', pageOrientation: 'landscape' },
    {
      table: { widths: ['*', 230], body: [[
        { fillColor: OLIVE, margin: [10, 8, 10, 8], stack: [
          ...(t.logo ? [{ image: LOGO, width: 26, margin: [0, 0, 0, 3] }] : []),
          { text: `${(ts.kicker || 'Daily tick sheet').toUpperCase()}  ·  ${(t.wordmark || t.name || '').toUpperCase()}`, color: '#FFFFFF', bold: true, fontSize: 7, characterSpacing: 1.5 },
          { text: title, color: '#FFFFFF', bold: true, fontSize: 14 },
        ] },
        { fillColor: OLIVE, margin: [10, 14, 10, 8], stack: [
          { text: 'Week starting  ____ / ____ / ______', color: '#FFFFFF', fontSize: 8.5, margin: [0, 0, 0, 6] },
          { text: 'Carer  ______________________________', color: '#FFFFFF', fontSize: 8.5 },
        ] },
      ]] },
      layout: 'noBorders',
      margin: [0, 0, 0, 8],
    },
    {
      table: { widths: ['*', 230], body: [[
        help
          ? { fillColor: TINT, margin: [8, 6, 8, 6], stack: [
              { text: help.title.toUpperCase(), bold: true, color: OLIVE, fontSize: 7.5, margin: [0, 0, 0, 3] },
              ...help.items.map((x) => ({ text: `•  ${x}`, fontSize: 8.5, margin: [0, 0, 0, 1] })),
            ] }
          : { fillColor: '#FBEFEB', margin: [8, 6, 8, 6], stack: [
              { text: 'GET VET HELP STRAIGHT AWAY IF', bold: true, color: TERRA, fontSize: 7.5, margin: [0, 0, 0, 3] },
              ...(urgent.length ? urgent : ['It is cold, limp, not feeding or breathing with effort']).map((x) => ({ text: `•  ${x}`, fontSize: 8.5 })),
            ] },
        { fillColor: TINT, margin: [8, 6, 8, 6], stack: [
          { text: 'WILDLIFE EMERGENCIES', bold: true, color: OLIVE, fontSize: 7.5, margin: [0, 0, 0, 3] },
          { text: region().hotline, bold: true, fontSize: 9 },
          { text: `${region().phone}  (${region().hotlineHours})`, bold: true, color: TERRA, fontSize: 12 },
        ] },
      ]] },
      layout: 'noBorders',
      margin: [0, 0, 0, 8],
    },
    {
      table: {
        widths: [150, ...Array.from({ length: days }, () => '*')],
        heights: (i) => (i === 0 ? 28 : i <= rows.length ? rowH : i === rows.length + 1 ? 20 : 30),
        body: [
          [{ text: 'EACH DAY', bold: true, color: OLIVE, fontSize: 7.5, fillColor: TINT, margin: [4, 9, 0, 0] }, ...Array.from({ length: days }, (_, d) => ({ stack: [{ text: `Day ${d + 1}`, bold: true, fontSize: 9 }, { text: '__ / __', color: MUTED, fontSize: 7 }], alignment: 'center', fillColor: TINT, margin: [0, 3, 0, 0] }))],
          ...rows.map((r, i) => {
            const fill = i % 2 ? '#F7F8F4' : null;
            return [
              { stack: [{ text: r.label, bold: true, fontSize: 9 }, ...(r.sub ? [{ text: r.sub, color: MUTED, fontSize: 7.5 }] : [])], margin: [4, mid(r.sub ? 28 : 22), 4, 0], fillColor: fill },
              ...Array.from({ length: days }, () => cellFor(r, fill)),
            ];
          }),
          [{ text: 'Initials', bold: true, color: MUTED, fontSize: 8, margin: [4, 5, 0, 0] }, ...Array.from({ length: days }, () => ({ text: '' }))],
          [{ text: 'Notes', bold: true, color: MUTED, fontSize: 8, margin: [4, 5, 0, 0] }, ...Array.from({ length: days }, () => ({ text: '' }))],
        ],
      },
      layout: { hLineColor: () => '#B9C0B6', vLineColor: () => '#B9C0B6', hLineWidth: () => 0.6, vLineWidth: () => 0.6 },
    },
    { text: ts.hint || 'Tick each box when it is done, and initial the day. Stick this on the fridge or the enclosure.', color: MUTED, fontSize: 7.5, margin: [0, 4, 0, 0] },
  ];
}

// Each row of a sheet: a job to tick, a weight to write in, or an amount of milk taken.
function sheetRows(ts) {
  return ts.items.map((x) => (typeof x === 'string' ? { label: x, cell: /\bweigh|weight\b/i.test(x) ? 'g' : 'box' } : x));
}
