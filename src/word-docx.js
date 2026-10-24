// Word printouts in Bunurong Wildlife Care branding: logo and shelter details in the header,
// olive section headings, tables for registers, due dates and tick sheets, motto and page numbers in the footer.
import {
  AlignmentType, BorderStyle, Document, ExternalHyperlink, Footer, Header, ImageRun, LevelFormat, Packer, PageNumber,
  Paragraph, ShadingType, Table, TableCell, TableLayoutType, TableRow, TextRun, VerticalAlign, WidthType,
} from 'docx';
import { LOGO_PNG_BASE64 } from './brand-logo.js';
import { dueLabel, formatDate, NOT_RECORDED, rehydrationTable, REHYDRATION_NOTE, careAiNote, feedAmounts } from './note.js';
import { chartByKey } from './feeding.js';
import { rangesFor } from './species-ranges.js';
import { region } from './region.js';
import { THEMES, PAGE_W } from './word.js';


let THEME = THEMES.bunurong;
let OLIVE = THEME.primary;
let TERRA = THEME.accent;
let TINT = THEME.tint;
let LINE = THEME.line;
const INK = '1C1C1C';
const MUTED = '666666';
// One font throughout, so every printout looks the same on any computer.
const HEAD_FONT = 'Arial';
const BODY_FONT = 'Arial';
function useTheme(id) {
  THEME = { ...(THEMES[id] || THEMES.bunurong) };
  if (id === 'rspca') THEME.name = region().code === 'qld' ? 'RSPCA Queensland' : 'RSPCA Victoria';
  OLIVE = THEME.primary;
  TERRA = THEME.accent;
  TINT = THEME.tint;
  LINE = THEME.line;
}

const logoBytes = () => Uint8Array.from(atob(LOGO_PNG_BASE64), (c) => c.charCodeAt(0));

const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const run = (text, o = {}) => new TextRun({ text: String(text ?? ''), font: BODY_FONT, size: 21, color: INK, ...o });

function heading(text) {
  return new Paragraph({
    keepNext: true,
    spacing: { before: 300, after: 100 },
    indent: { left: 140 },
    border: { left: { style: BorderStyle.SINGLE, size: 24, color: TERRA, space: 8 } },
    children: [new TextRun({ text: String(text).toUpperCase(), font: HEAD_FONT, bold: true, size: 23, color: OLIVE, characterSpacing: 24 })],
  });
}

// Callouts: a tinted box with a coloured bar down the left, for the parts people must not miss.
const TONES = {
  summary: () => ({ fill: TINT, bar: OLIVE, label: OLIVE }),
  photo: () => ({ fill: TINT, bar: OLIVE, label: OLIVE }),
  warn: () => ({ fill: 'FFF6E5', bar: 'D99A2B', label: '8A5A00' }),
  urgent: () => ({ fill: 'FBEFEB', bar: TERRA, label: TERRA }),
};
// A photo's size in points, kept in proportion, at most `max` on its longest side (reads the JPEG's own size).
function photoSize(data, max) {
  let w = 4;
  let h = 3;
  for (let i = 2; i < data.length - 9; ) {
    if (data[i] !== 0xff) break;
    const marker = data[i + 1];
    const len = (data[i + 2] << 8) + data[i + 3];
    if (marker >= 0xc0 && marker <= 0xc3) {
      h = (data[i + 5] << 8) + data[i + 6];
      w = (data[i + 7] << 8) + data[i + 8];
      break;
    }
    i += 2 + len;
  }
  const scale = max / Math.max(w, h);
  return { width: Math.round(w * scale), height: Math.round(h * scale) };
}
function callout(b) {
  const t = TONES[b.tone]();
  const kids = [
    new Paragraph({ keepNext: true, spacing: { after: 60 }, children: [new TextRun({ text: String(b.heading).toUpperCase(), font: HEAD_FONT, bold: true, size: 19, color: t.label, characterSpacing: 24 })] }),
    ...(b.text ? String(b.text).split(/\n+/).map((x) => new Paragraph({ spacing: { after: 60, line: 300 }, children: [run(x)] })) : []),
    ...(b.photos && b.photos.length ? [new Paragraph({ spacing: { after: 80 }, children: b.photos.slice(0, 3).map((data) => new ImageRun({ type: 'jpg', data, transformation: photoSize(data, 190) })) })] : []),
    ...(b.items || []).map((x) => bullet(x)),
  ];
  return new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: [PAGE_W],
    borders: { top: NONE, bottom: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE, left: { style: BorderStyle.SINGLE, size: 36, color: t.bar } },
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({ width: { size: PAGE_W, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, color: 'auto', fill: t.fill }, margins: { top: 140, bottom: 120, left: 220, right: 200 }, children: kids })] })],
  });
}
const para = (text) => new Paragraph({ spacing: { after: 120, line: 312 }, children: [run(text)] });
const check = (text) => new Paragraph({ spacing: { after: 80, line: 288 }, indent: { left: 120 }, children: [new TextRun({ text: '☐  ', font: 'Segoe UI Symbol', size: 26, color: '7A847A' }), run(text)] });
const bullet = (text) => new Paragraph({ numbering: { reference: 'dots', level: 0 }, spacing: { after: 70, line: 300 }, children: [run(text)] });
// An item that already carries its number ("1. In my opinion…") keeps it, with a hanging indent instead of a bullet.
const numbered = (text) => {
  const m = String(text).match(/^(\d+[.)])\s+([\s\S]*)$/);
  return new Paragraph({ indent: { left: 400, hanging: 400 }, spacing: { after: 90, line: 300 }, children: [run(`${m[1]}\t`, { bold: true }), run(m[2])], tabStops: [{ type: 'left', position: 400 }] });
};
const itemPara = (text) => (/^\d+[.)]\s+/.test(String(text)) ? numbered(text) : bullet(text));

function cell(text, { head = false, width, shade } = {}) {
  return new TableCell({
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    shading: head ? { type: ShadingType.CLEAR, color: 'auto', fill: OLIVE } : shade ? { type: ShadingType.CLEAR, color: 'auto', fill: shade } : undefined,
    children: head
      ? [new Paragraph({ children: [new TextRun({ text: String(text).toUpperCase(), font: HEAD_FONT, bold: true, size: 19, color: 'FFFFFF' })] })]
      : String(text ?? '').split('\n').map((line, i, all) => new Paragraph({ spacing: { after: i < all.length - 1 ? 60 : 0 }, children: [run(line, { size: 20 })] })),
  });
}

function table(head, rows, widths) {
  const w = widths || head.map(() => Math.floor(PAGE_W / head.length));
  const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
  return new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: w,
    borders: { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border },
    rows: [
      new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, { head: true, width: w[i] })) }),
      ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, { width: w[i], shade: ri % 2 ? 'F7F8F3' : undefined })) })),
    ],
  });
}

// The brand band runs the full width of the page, edge to edge, from the top edge.
const SIDE = 1134; // the side margins
const FULL_W = PAGE_W + 2 * SIDE;

// Header like the website: a coloured band with the logo (or wordmark) in the middle and the name under it.
function header() {
  const top = THEME.logo
    ? new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 40 }, children: [new ImageRun({ type: 'png', data: logoBytes(), transformation: { width: 92, height: 92 } })] })
    : new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 0 }, children: [new TextRun({ text: THEME.wordmark || THEME.name.toUpperCase(), font: HEAD_FONT, bold: true, size: THEME.wordmark ? 64 : 36, color: 'FFFFFF', characterSpacing: THEME.wordmark ? 60 : 30 })] });
  return new Header({
    children: [
      new Table({
        width: { size: FULL_W, type: WidthType.DXA },
        indent: { size: -SIDE, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        columnWidths: [FULL_W],
        borders: { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: FULL_W, type: WidthType.DXA },
                shading: { type: ShadingType.CLEAR, color: 'auto', fill: OLIVE },
                margins: { top: 260, bottom: 200, left: SIDE, right: SIDE },
                children: [
                  top,
                  ...(THEME.logo || THEME.wordmark ? [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [new TextRun({ text: THEME.name.toUpperCase(), font: HEAD_FONT, bold: true, size: 24, color: 'FFFFFF', characterSpacing: 40 })] })] : []),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: THEME.sub, font: BODY_FONT, size: 16, color: 'FFFFFF' })] }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// Pages after the first: a slim band, so the brand stays but the page is for the content.
function slimHeader(label) {
  const left = [
    ...(THEME.logo ? [new ImageRun({ type: 'png', data: logoBytes(), transformation: { width: 30, height: 30 } }), new TextRun({ text: '   ', size: 16 })] : []),
    new TextRun({ text: (THEME.wordmark || THEME.name || '').toUpperCase(), font: HEAD_FONT, bold: true, size: 17, color: 'FFFFFF', characterSpacing: 30 }),
  ];
  return new Header({
    children: [
      new Table({
        width: { size: FULL_W, type: WidthType.DXA },
        indent: { size: -SIDE, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        columnWidths: [FULL_W],
        borders: { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE },
        rows: [new TableRow({ children: [new TableCell({
          width: { size: FULL_W, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, color: 'auto', fill: OLIVE },
          margins: { top: 140, bottom: 120, left: SIDE, right: SIDE },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ tabStops: [{ type: 'right', position: PAGE_W }], children: [...left, new TextRun({ text: `\t${String(label).toUpperCase()}`, font: HEAD_FONT, size: 15, color: 'FFFFFF', characterSpacing: 20 })] })],
        })] })],
      }),
    ],
  });
}

function footer(label) {
  return new Footer({
    children: [
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 4 } },
        tabStops: [{ type: 'right', position: PAGE_W }],
        children: [
          ...(THEME.motto ? [new TextRun({ text: THEME.motto.toUpperCase(), font: HEAD_FONT, bold: true, size: 16, color: TERRA, characterSpacing: 20 }), new TextRun({ text: '   ', font: BODY_FONT, size: 15 })] : []),
          new TextRun({ text: label, font: BODY_FONT, size: 15, color: MUTED }),
          new TextRun({ children: ['\tPage ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES], font: BODY_FONT, size: 15, color: MUTED }),
        ],
      }),
      new Paragraph({ children: [new TextRun({ text: `Wildlife emergencies: ${region().hotline} (${region().hotlineHours}) on ${region().phone}`, font: BODY_FONT, size: 15, color: MUTED })] }),
    ],
  });
}

// The details (date, prepared by, case) side by side on one tinted line, up to three pairs a row.
function metaTable(meta) {
  const per = Math.min(3, Math.max(1, meta.length));
  const lab = 1300;
  const val = Math.floor(PAGE_W / per) - lab;
  const rows = [];
  for (let i = 0; i < meta.length; i += per) rows.push(meta.slice(i, i + per));
  const tint = { type: ShadingType.CLEAR, color: 'auto', fill: TINT };
  return new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: Array.from({ length: per }, () => [lab, val]).flat(),
    borders: { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'FFFFFF' }, insideVertical: NONE },
    rows: rows.map((r) => new TableRow({
      children: Array.from({ length: per }, (_, i) => r[i] || ['', '']).flatMap(([k, v]) => [
        new TableCell({ shading: tint, margins: { top: 60, bottom: 60, left: 160, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: String(k).toUpperCase(), font: HEAD_FONT, bold: true, size: 16, color: OLIVE })] })] }),
        new TableCell({ shading: tint, margins: { top: 60, bottom: 60, left: 60, right: 120 }, children: [new Paragraph({ children: [run(v, { size: 19 })] })] }),
      ]),
    })),
  });
}

function cleanTitle(title, docType) {
  const t = String(title || '');
  const m = t.match(/^([^:]{3,45}):\s+(.+)$/);
  if (!m) return t;
  const words = (x) => x.toLowerCase().replace(/[^a-z ]/g, '').trim();
  if (!words(String(docType)).includes(words(m[1]))) return t;
  return m[2].charAt(0).toUpperCase() + m[2].slice(1);
}

/**
 * model: { docType, title, subtitle, meta: [[label, value]], blocks: [{ heading, text?, items?, table?: { head, rows, widths? }, note? }], sources?: [{ title, publisher, url }] }
 */
export async function buildWord(model, { preparedBy = '', date = new Date(), template = 'bunurong' } = {}) {
  useTheme(template);
  // The document type is already the coloured line above the title, so it isn't repeated here.
  const meta = [['Date', formatDate(date)], ...(preparedBy ? [['Prepared by', preparedBy]] : []), ...(model.meta || []).filter((m) => !(m[0] === 'Vet' && m[1] === preparedBy))].filter((m) => m[1]);
  // "Care plan: Ringtail joey" under a CARE PLAN label says it twice: keep just the animal or subject.
  const title = cleanTitle(model.title, model.docType);
  const body = [
    new Paragraph({ spacing: { before: 120, after: 0 }, children: [new TextRun({ text: String(model.docType).toUpperCase(), font: HEAD_FONT, bold: true, size: 20, color: TERRA, characterSpacing: 40 })] }),
    new Paragraph({ spacing: { after: model.subtitle ? 40 : 160 }, children: [new TextRun({ text: title, font: HEAD_FONT, bold: true, size: 44, color: INK })] }),
    ...(model.subtitle ? [new Paragraph({ spacing: { after: 160 }, children: [run(model.subtitle, { color: MUTED, size: 22 })] })] : []),
    metaTable(meta),
  ];
  // The AI note sits quietly under the details, not as a section of its own.
  if (model.aiNote) body.push(new Paragraph({ spacing: { before: 140, after: 40 }, children: [run(`ⓘ  ${model.aiNote}`, { italics: true, color: MUTED, size: 18 })] }));
  // A video worth watching, as one short linked line under the details.
  if (model.watch) body.push(new Paragraph({ spacing: { before: 40, after: 40 }, children: [run('▶  Watch: ', { bold: true, size: 18, color: OLIVE }), new ExternalHyperlink({ link: model.watch.url, children: [run(`${model.watch.title} (${model.watch.channel}${model.watch.date ? `, ${model.watch.date}` : ''})`, { size: 18, color: OLIVE, underline: {} })] })] }));
  for (const b of model.blocks) {
    if (!b.heading || (!b.text && !(b.items && b.items.length) && !(b.checks && b.checks.length) && !b.table && !(b.labels && b.labels.length) && !(b.photos && b.photos.length))) continue;
    if (b.tone && TONES[b.tone]) {
      body.push(new Paragraph({ spacing: { before: 200 }, keepNext: true, children: [] }), callout(b));
      continue;
    }
    body.push(heading(b.heading));
    if (b.note && b.noteFirst) body.push(new Paragraph({ spacing: { after: 80 }, children: [run(b.note, { italics: true, color: TERRA, size: 19 })] }));
    if (b.text) String(b.text).split(/\n+/).forEach((t) => body.push(b.table ? new Paragraph({ keepNext: true, keepLines: true, spacing: { after: 120, line: 312 }, children: [run(t)] }) : para(t)));
    if (b.items) b.items.forEach((t) => body.push(itemPara(t)));
    if (b.checks) b.checks.forEach((t) => body.push(check(t)));
    if (b.table) body.push(table(b.table.head, b.table.rows, b.table.widths), new Paragraph({ spacing: { after: 60 }, children: [] }));
    if (b.labels) b.labels.forEach((l) => body.push(medLabel(l), new Paragraph({ spacing: { after: 120 }, children: [] })));
    if (b.note && !b.noteFirst) body.push(new Paragraph({ spacing: { before: 60 }, children: [run(b.note, { italics: true, color: MUTED, size: 18 })] }));
  }
  if (model.sources && model.sources.length) {
    body.push(heading('Based on'));
    model.sources.forEach((s) =>
      body.push(new Paragraph({
        numbering: { reference: 'dots', level: 0 },
        spacing: { after: 60 },
        children: [s.url ? new ExternalHyperlink({ link: s.url, children: [run(s.title, { size: 18, color: OLIVE, underline: {} })] }) : run(s.title, { size: 18 }), run(` (${s.publisher})`, { size: 18, color: MUTED })],
      })),
    );
  }
  // The fridge sheet on its own is just the tick sheet page.
  const sections = model.fridgeOnly ? [] : [{
    properties: { titlePage: true, page: { size: { width: 11906, height: 16838 }, margin: { top: 1250, bottom: 1300, left: 1134, right: 1134, header: 0, footer: 450 } } },
    headers: { first: header(), default: slimHeader(model.docType) },
    footers: { first: footer(model.docType), default: footer(model.docType) },
    children: body,
  }];
  if (model.tickSheet && model.tickSheet.items.length) sections.push(tickSheetSection(model.tickSheet, model.title));
  const doc = new Document({
    creator: THEME.creator,
    title: model.title,
    styles: { default: { document: { run: { font: BODY_FONT, size: 21 } } } },
    numbering: {
      config: [{ reference: 'dots', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 260 } }, run: { color: OLIVE } } }] }],
    },
    sections,
  });
  return Packer.toBlob(doc);
}

// A landscape page for the fridge: one row per daily job, a big box per day.
function tickSheetSection(t, title) {
  const LAND_W = 16838 - 2 * 900;
  const first = 3900;
  const dayW = Math.floor((LAND_W - first) / t.days);
  const line = { style: BorderStyle.SINGLE, size: 6, color: 'B9C0B6' };
  const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  const txt = (text, o = {}) => new TextRun({ text: String(text), font: BODY_FONT, size: 24, color: INK, ...o });
  const cell = (children, o = {}) => new TableCell({ verticalAlign: VerticalAlign.CENTER, margins: { left: 120, right: 100, top: 40, bottom: 40 }, children, ...o });
  const fill = (c) => ({ type: ShadingType.CLEAR, color: 'auto', fill: c });
  const centre = (runs) => new Paragraph({ alignment: AlignmentType.CENTER, children: runs });
  const isWeight = (x) => /\bweigh|weight\b/i.test(x);

  // Header band: what it is and who it's for, with blanks to fill in by hand.
  const band = new Table({
    width: { size: LAND_W, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: [LAND_W - 5200, 5200],
    borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none },
    rows: [new TableRow({ children: [
      cell([
        ...(THEME.logo ? [new Paragraph({ spacing: { after: 60 }, children: [new ImageRun({ type: 'png', data: logoBytes(), transformation: { width: 54, height: 54 } })] })] : []),
        ...(THEME.wordmark ? [new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: THEME.wordmark, font: HEAD_FONT, bold: true, size: 40, color: 'FFFFFF', characterSpacing: 40 })] })] : []),
        new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: `DAILY TICK SHEET${THEME.name ? `  ·  ${THEME.name.toUpperCase()}` : ''}`, font: HEAD_FONT, bold: true, size: 18, color: 'FFFFFF', characterSpacing: 30 })] }),
        new Paragraph({ children: [new TextRun({ text: title, font: HEAD_FONT, bold: true, size: 36, color: 'FFFFFF' })] }),
      ], { shading: fill(OLIVE), margins: { left: 240, right: 120, top: 160, bottom: 160 } }),
      cell([
        new Paragraph({ spacing: { after: 120 }, children: [txt('Week starting  ____ / ____ / ______', { size: 20, color: 'FFFFFF' })] }),
        new Paragraph({ spacing: { after: 120 }, children: [txt('Carer  ______________________________', { size: 20, color: 'FFFFFF' })] }),
        new Paragraph({ children: [txt('Tick each box when it is done, and initial the day. Stick this on the fridge or the enclosure.', { size: 17, color: 'E8ECE2' })] }),
      ], { shading: fill(OLIVE), margins: { left: 120, right: 240, top: 160, bottom: 160 } }),
    ] })],
  });

  const head = new TableRow({
    tableHeader: true,
    height: { value: 760, rule: 'atLeast' },
    children: [
      cell([new Paragraph({ children: [txt('EACH DAY', { bold: true, size: 18, color: OLIVE })] })], { width: { size: first, type: WidthType.DXA }, shading: fill(TINT) }),
      ...Array.from({ length: t.days }, (_, d) => cell([
        centre([txt(`Day ${d + 1}`, { bold: true, size: 22 })]),
        centre([txt('__ / __', { size: 16, color: MUTED })]),
      ], { width: { size: dayW, type: WidthType.DXA }, shading: fill(TINT) })),
    ],
  });
  // Rows shrink a little when there are many jobs, so the sheet and its emergency box fit on one page.
  const rowH = Math.max(520, Math.min(780, Math.floor(3900 / Math.max(1, t.items.length))));
  const jobRow = (item, i) => new TableRow({
    cantSplit: true,
    height: { value: rowH, rule: 'atLeast' },
    children: [
      cell([new Paragraph({ children: [txt(item, { bold: true })] })], { width: { size: first, type: WidthType.DXA }, shading: i % 2 ? fill('F7F8F4') : undefined }),
      ...Array.from({ length: t.days }, () => cell([
        isWeight(item) ? centre([txt('_____ g', { size: 20, color: MUTED })]) : centre([txt('☐', { size: 48, color: '8A938A' })]),
      ], { width: { size: dayW, type: WidthType.DXA }, shading: i % 2 ? fill('F7F8F4') : undefined })),
    ],
  });
  const blankRow = (label, h) => new TableRow({
    cantSplit: true,
    height: { value: h, rule: 'atLeast' },
    children: [
      cell([new Paragraph({ children: [txt(label, { bold: true, size: 20, color: MUTED })] })], { width: { size: first, type: WidthType.DXA } }),
      ...Array.from({ length: t.days }, () => cell([new Paragraph({ children: [] })], { width: { size: dayW, type: WidthType.DXA } })),
    ],
  });
  const grid = new Table({
    width: { size: LAND_W, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: [first, ...Array.from({ length: t.days }, () => dayW)],
    borders: { top: line, bottom: line, left: line, right: line, insideHorizontal: line, insideVertical: line },
    rows: [head, ...t.items.map(jobRow), blankRow('Initials', 520), blankRow('Notes', 800)],
  });

  // Foot: when to get help, and the emergency line, so the sheet works on its own.
  const urgent = (t.urgent || []).slice(0, 3);
  const foot = new Table({
    width: { size: LAND_W, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: [LAND_W - 5200, 5200],
    borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: { style: BorderStyle.SINGLE, size: 6, color: 'FFFFFF' } },
    rows: [new TableRow({ cantSplit: true, children: [
      cell([
        new Paragraph({ spacing: { after: 60 }, children: [txt('GET VET HELP STRAIGHT AWAY IF', { bold: true, size: 17, color: TERRA })] }),
        ...(urgent.length ? urgent : ['It is cold, limp, not feeding or breathing with effort']).map((x) => new Paragraph({ spacing: { after: 20 }, children: [txt(`•  ${x}`, { size: 19 })] })),
      ], { shading: fill('FBEFEB'), margins: { left: 200, right: 160, top: 120, bottom: 120 } }),
      cell([
        new Paragraph({ spacing: { after: 60 }, children: [txt('WILDLIFE EMERGENCIES', { bold: true, size: 17, color: OLIVE })] }),
        new Paragraph({ children: [txt(region().hotline, { bold: true, size: 20 })] }),
        new Paragraph({ children: [txt(`${region().phone}  (${region().hotlineHours})`, { bold: true, size: 26, color: TERRA })] }),
      ], { shading: fill(TINT), margins: { left: 200, right: 160, top: 120, bottom: 120 } }),
    ] })],
  });

  return {
    properties: { page: { size: { width: 11906, height: 16838, orientation: 'landscape' }, margin: { top: 700, bottom: 600, left: 900, right: 900, header: 300, footer: 300 } } },
    // Its own empty header and footer, so the fridge sheet is all about the day's jobs.
    headers: { default: new Header({ children: [new Paragraph({ children: [] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ children: [] })] }) },
    children: [
      band,
      new Paragraph({ spacing: { after: 120 }, children: [] }),
      foot,
      new Paragraph({ spacing: { after: 120 }, children: [] }),
      grid,
      // Word needs a paragraph after a table; keep it tiny so it never spills onto a page of its own.
      new Paragraph({ spacing: { before: 0, after: 0, line: 20, lineRule: 'exact' }, children: [new TextRun({ text: '', size: 2 })] }),
    ],
  };
}

// A dispensing label, boxed so it can be cut out and stuck on the bottle.
function medLabel(l) {
  const border = { style: BorderStyle.SINGLE, size: 12, color: OLIVE };
  const line = (text, o = {}) => new Paragraph({ spacing: { after: 40 }, children: [run(text, { size: 20, ...o })] });
  return new Table({
    width: { size: 6200, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: [6200],
    borders: { top: border, bottom: border, left: border, right: border, insideHorizontal: NONE, insideVertical: NONE },
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: 6200, type: WidthType.DXA },
      margins: { top: 120, bottom: 120, left: 180, right: 180 },
      children: [
        line(l.animal, { size: 18, color: MUTED }),
        line(l.drug, { bold: true, size: 24 }),
        line(l.directions),
        ...(l.duration ? [line(l.duration)] : []),
        line(`${l.vet ? `${l.vet} · ` : ''}${l.date}`, { size: 16, color: MUTED }),
        line('For animal treatment only. Keep out of reach of children.', { size: 16, color: MUTED, italics: true }),
      ],
    })] })],
  });
}

/* ---------------- adapters: each screen's content into the printout model ---------------- */

export { THEMES };
