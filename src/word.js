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

// Handout styles, chosen in Settings. Colours are set per printout from the chosen style.
const THEMES = {
  bunurong: { name: 'Bunurong Wildlife Care Inc', sub: 'Wildlife Shelter 15147751  ·  Registered Charity  ·  Inverloch, Victoria', primary: '647C50', accent: 'AB6555', tint: 'EEF2E8', line: 'D9DCCF', logo: true, motto: 'Forever home is best', creator: 'Bunurong Wildlife Care' },
  plain: { name: 'Animal Welfare Companion', sub: 'Wildlife care record', primary: '2F3B45', accent: '2F3B45', tint: 'F1F3F5', line: 'D8DCE0', logo: false, motto: '', creator: 'Animal Welfare Companion' },
  rspca: { name: '', sub: 'Wildlife care handout', primary: '0B4F8A', accent: '0B4F8A', tint: 'E8F1F9', line: 'CFDDEA', logo: false, wordmark: 'RSPCA', motto: '', creator: 'RSPCA' },
};
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
const PAGE_W = 9638; // A4 minus 2 cm margins, in twentieths of a point

const logoBytes = () => Uint8Array.from(atob(LOGO_PNG_BASE64), (c) => c.charCodeAt(0));

const run = (text, o = {}) => new TextRun({ text: String(text ?? ''), font: BODY_FONT, size: 21, color: INK, ...o });

function heading(text) {
  return new Paragraph({
    keepNext: true,
    spacing: { before: 260, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 2 } },
    children: [new TextRun({ text: String(text).toUpperCase(), font: HEAD_FONT, bold: true, size: 24, color: OLIVE, characterSpacing: 20 })],
  });
}
const para = (text) => new Paragraph({ spacing: { after: 100, line: 300 }, children: [run(text)] });
const check = (text) => new Paragraph({ spacing: { after: 80, line: 288 }, indent: { left: 120 }, children: [new TextRun({ text: '☐  ', font: 'Segoe UI Symbol', size: 26, color: '7A847A' }), run(text)] });
const bullet = (text) => new Paragraph({ numbering: { reference: 'dots', level: 0 }, spacing: { after: 60, line: 288 }, children: [run(text)] });

function cell(text, { head = false, width, shade } = {}) {
  return new TableCell({
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    shading: head ? { type: ShadingType.CLEAR, color: 'auto', fill: OLIVE } : shade ? { type: ShadingType.CLEAR, color: 'auto', fill: shade } : undefined,
    children: [
      new Paragraph({
        children: [head ? new TextRun({ text: String(text).toUpperCase(), font: HEAD_FONT, bold: true, size: 19, color: 'FFFFFF' }) : run(text, { size: 20 })],
      }),
    ],
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

const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
// Header like the website: a coloured band with the logo (or wordmark) in the middle and the name under it.
function header() {
  const top = THEME.logo
    ? new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 40 }, children: [new ImageRun({ type: 'png', data: logoBytes(), transformation: { width: 92, height: 92 } })] })
    : new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 0 }, children: [new TextRun({ text: THEME.wordmark || THEME.name.toUpperCase(), font: HEAD_FONT, bold: true, size: THEME.wordmark ? 64 : 36, color: 'FFFFFF', characterSpacing: THEME.wordmark ? 60 : 30 })] });
  return new Header({
    children: [
      new Table({
        width: { size: PAGE_W, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        columnWidths: [PAGE_W],
        borders: { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: PAGE_W, type: WidthType.DXA },
                shading: { type: ShadingType.CLEAR, color: 'auto', fill: OLIVE },
                margins: { top: 80, bottom: 120, left: 200, right: 200 },
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

/**
 * model: { docType, title, subtitle, meta: [[label, value]], blocks: [{ heading, text?, items?, table?: { head, rows, widths? }, note? }], sources?: [{ title, publisher, url }] }
 */
export async function buildWord(model, { preparedBy = '', date = new Date(), template = 'bunurong' } = {}) {
  useTheme(template);
  const meta = [['Document', model.docType], ['Date', formatDate(date)], ...(preparedBy ? [['Prepared by', preparedBy]] : []), ...(model.meta || []).filter((m) => !(m[0] === 'Vet' && m[1] === preparedBy))].filter((m) => m[1]);
  const body = [
    new Paragraph({ spacing: { before: 120, after: 0 }, children: [new TextRun({ text: String(model.docType).toUpperCase(), font: HEAD_FONT, bold: true, size: 20, color: TERRA, characterSpacing: 40 })] }),
    new Paragraph({ spacing: { after: model.subtitle ? 40 : 160 }, children: [new TextRun({ text: model.title, font: HEAD_FONT, bold: true, size: 44, color: INK })] }),
    ...(model.subtitle ? [new Paragraph({ spacing: { after: 160 }, children: [run(model.subtitle, { color: MUTED, size: 22 })] })] : []),
    new Table({
      width: { size: PAGE_W, type: WidthType.DXA },
      layout: TableLayoutType.FIXED,
      columnWidths: [2200, PAGE_W - 2200],
      borders: {
        top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
        left: { style: BorderStyle.SINGLE, size: 24, color: OLIVE }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
        insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      },
      rows: meta.map(([k, v]) => new TableRow({
        children: [
          new TableCell({ shading: { type: ShadingType.CLEAR, color: 'auto', fill: TINT }, margins: { top: 50, bottom: 50, left: 160, right: 80 }, children: [new Paragraph({ children: [new TextRun({ text: String(k).toUpperCase(), font: HEAD_FONT, bold: true, size: 17, color: OLIVE })] })] }),
          new TableCell({ shading: { type: ShadingType.CLEAR, color: 'auto', fill: TINT }, margins: { top: 50, bottom: 50, left: 80, right: 120 }, children: [new Paragraph({ children: [run(v, { size: 20 })] })] }),
        ],
      })),
    }),
  ];
  // The AI note sits quietly under the details, not as a section of its own.
  if (model.aiNote) body.push(new Paragraph({ spacing: { before: 140, after: 40 }, children: [run(`ⓘ  ${model.aiNote}`, { italics: true, color: MUTED, size: 18 })] }));
  for (const b of model.blocks) {
    if (!b.heading || (!b.text && !(b.items && b.items.length) && !(b.checks && b.checks.length) && !b.table && !(b.labels && b.labels.length))) continue;
    body.push(heading(b.heading));
    if (b.note && b.noteFirst) body.push(new Paragraph({ spacing: { after: 80 }, children: [run(b.note, { italics: true, color: TERRA, size: 19 })] }));
    if (b.text) String(b.text).split(/\n+/).forEach((t) => body.push(para(t)));
    if (b.items) b.items.forEach((t) => body.push(bullet(t)));
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
        children: [run(`${s.title} (${s.publisher}). `, { size: 18 }), new ExternalHyperlink({ link: s.url, children: [run(s.url, { size: 18, color: OLIVE, underline: {} })] })],
      })),
    );
  }
  const sections = [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 2900, bottom: 1300, left: 1134, right: 1134, header: 400, footer: 450 } } },
    headers: { default: header() },
    footers: { default: footer(model.docType) },
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
  const LAND_W = 16838 - 2 * 1000;
  const first = 4200;
  const dayW = Math.floor((LAND_W - first) / t.days);
  const border = { style: BorderStyle.SINGLE, size: 8, color: '9AA39A' };
  const big = (text, o = {}) => new TextRun({ text: String(text), font: BODY_FONT, size: 26, color: INK, ...o });
  const rows = [
    new TableRow({
      tableHeader: true,
      height: { value: 700, rule: 'atLeast' },
      children: [
        new TableCell({ width: { size: first, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, shading: { type: ShadingType.CLEAR, color: 'auto', fill: OLIVE }, margins: { left: 140 }, children: [new Paragraph({ children: [big('EACH DAY', { bold: true, color: 'FFFFFF', size: 22 })] })] }),
        ...Array.from({ length: t.days }, (_, d) => new TableCell({ width: { size: dayW, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, shading: { type: ShadingType.CLEAR, color: 'auto', fill: OLIVE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [big(`Day ${d + 1}`, { bold: true, color: 'FFFFFF', size: 22 })] })] })),
      ],
    }),
    ...t.items.map((item, i) => new TableRow({
      cantSplit: true,
      height: { value: 1150, rule: 'atLeast' },
      children: [
        new TableCell({ width: { size: first, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, shading: i % 2 ? { type: ShadingType.CLEAR, color: 'auto', fill: TINT } : undefined, margins: { left: 140, right: 100 }, children: [new Paragraph({ children: [big(item, { bold: true })] })] }),
        ...Array.from({ length: t.days }, () => new TableCell({ width: { size: dayW, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, shading: i % 2 ? { type: ShadingType.CLEAR, color: 'auto', fill: TINT } : undefined, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [big('☐', { size: 44, color: '7A847A' })] })] })),
      ],
    })),
  ];
  return {
    properties: { page: { size: { width: 11906, height: 16838, orientation: 'landscape' }, margin: { top: 900, bottom: 800, left: 1000, right: 1000, header: 300, footer: 300 } } },
    // Its own empty header and footer, so the fridge sheet is all tick boxes.
    headers: { default: new Header({ children: [new Paragraph({ children: [] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ children: [] })] }) },
    children: [
      new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: 'DAILY TICK SHEET', font: HEAD_FONT, bold: true, size: 22, color: TERRA, characterSpacing: 40 })] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: title, font: HEAD_FONT, bold: true, size: 40, color: INK })] }),
      new Table({ width: { size: LAND_W, type: WidthType.DXA }, layout: TableLayoutType.FIXED, columnWidths: [first, ...Array.from({ length: t.days }, () => dayW)], borders: { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border }, rows }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'Tick each box when it is done. Stick it on the fridge or the enclosure.', font: BODY_FONT, size: 20, color: MUTED })] }),
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

export function docModel(d, kindLabel, note = '') {
  return {
    docType: kindLabel,
    title: d.title || kindLabel,
    subtitle: d.subtitle,
    aiNote: note,
    blocks: [
      ...d.sections.filter((s) => !/^text to your vet$/i.test(s.heading)).map((s) => {
        // "Field: value" lists (like the register entry) print as a two-column table an auditor can scan.
        const items = s.items || [];
        const pairs = items.map((x) => /^([^:]{1,40}):\s+(.+)$/.exec(x));
        if (items.length >= 3 && pairs.every(Boolean)) return { heading: s.heading, table: { head: ['Field', 'Detail'], rows: pairs.map((m) => [m[1], m[2]]), widths: [2800, PAGE_W - 2800] } };
        return { heading: s.heading, text: s.text, items };
      }),
      ...(d.due.length ? [{ heading: 'What’s due', table: { head: ['What', 'When'], rows: d.due.map((x) => [x.what, x.when ? dueLabel(x.when) : '']), widths: [5800, PAGE_W - 5800] } }] : []),
    ],
  };
}

function rangesBlocks(id) {
  const g = id ? rangesFor(id, region().code) : null;
  if (!g) return [];
  return [{
    heading: `Normal ranges: ${g.label}`,
    table: { head: ['Measure', 'Normal or target'], rows: [...g.vitals, ...g.warmth] },
    items: g.notes,
    note: `From: ${g.sources.map((x) => `${x.title} (${x.publisher}, ${x.date})`).join('; ')}`,
  }];
}

function rehydrationBlocks(r) {
  if (!r || !r.needed) return [];
  const t = rehydrationTable(r);
  return [{
    heading: 'Rehydration',
    ...(t ? { table: { head: ['Day', 'Total', 'Every 4 hours', 'Every 6 hours'], rows: t.days.map((d) => [String(d.day), `${d.total} mL`, `${d.every4h} mL`, `${d.every6h} mL`]) } } : {}),
    items: r.steps,
    note: `${t ? `For ${r.weight_g} g, ${t.assumed ? `assuming ${t.deficit}% dehydrated` : `${t.deficit}% dehydrated`}. ` : ''}${REHYDRATION_NOTE}`,
  }];
}

function feedBlocks(f) {
  if (!f || !f.applies) return [];
  const a = feedAmounts(f, f.weight_g);
  const chart = f.chart ? chartByKey(f.chart) : null;
  if (chart) {
    // The chart itself, so the carer can read the next amount off the printout as the joey grows.
    const rows = chart.points.map(([g, ml, product]) => [g >= 1000 ? `${(g / 1000).toFixed(g % 1000 ? 2 : 0)} kg` : `${g} g`, `${ml} mL a day`, product.replace(/^Wombaroo /, '')]);
    return [{
      heading: 'Feed calculator',
      text: `${a && a.perDay ? `For ${f.weight_g} g: about ${a.perDay} mL a day of ${a.product}, as ${a.feeds} feeds of about ${a.perFeed} mL. ` : ''}Feed ${f.feeds} times a day. Weigh daily and read the amount for the new weight from the chart below (in between two weights, use an amount in between).`,
      table: { head: ['Weight', 'Milk a day', 'Milk'], rows, widths: [2200, 2400, PAGE_W - 4600] },
      note: `From the Wombaroo growth chart for the ${chart.label} (${chart.source.title}${chart.source.section ? `, ${chart.source.section}` : ''}).`,
    }];
  }
  const rows = [
    ['Feed', [f.what, f.stage].filter(Boolean).join(', ') || 'Milk'],
    ['Daily amount', `${f.pct}% of body weight a day, in ${f.feeds} feeds`],
    ...(a && a.perDay ? [[`For ${f.weight_g} g`, `about ${a.perDay} mL a day, as ${a.feeds} feeds of about ${a.perFeed} mL`]] : []),
    ...(f.basis ? [['Based on', f.basis]] : []),
  ];
  return [{
    heading: 'Feed calculator',
    table: { head: ['', 'Amount'], rows, widths: [2600, PAGE_W - 2600] },
    note: `${f.sure ? '' : 'Not sure of this figure for this species and age. Check it with your vet or the feeding guide first. '}Weigh daily and re-work the amounts: weight in grams × ${f.pct} ÷ 100 = mL a day.`,
  }];
}

export function careModel(c, lookup) {
  const meds = c.medications.map((m) => [m.name, m.how, m.how_often, m.how_long]);
  const blocks = [
    { heading: 'Summary', text: c.summary },
    ...(meds.length ? [{ heading: 'Medications', table: { head: ['Medication', 'How', 'How often', 'How long'], rows: meds, widths: [2600, 2600, 2400, PAGE_W - 7600] }, note: c.medications.map((m) => (m.tip ? `${m.name}: ${m.tip}` : '')).filter(Boolean).join('  ') || undefined }] : []),
    ...rangesBlocks(c.species_group),
    ...rehydrationBlocks(c.rehydration),
    ...c.plan.map((p) => ({ heading: p.when, items: p.tasks })),
    { heading: 'Housing', items: c.housing },
    { heading: 'Feeding', items: c.feeding },
    ...feedBlocks(c.feed_calc),
    { heading: 'Activity and handling', items: c.activity },
    { heading: 'Other care', items: c.care },
  ];
  const tickDays = Math.min(c.log_days || 7, 14);
  if (c.daily_checks.length) blocks.push({ heading: 'Daily tick sheet', text: `On the last page, sized to print and stick on the fridge (${tickDays} days).` });
  if (c.release.ready_when.length || c.release.how.length || c.release.where) {
    if (c.release.target_weight) blocks.push({ heading: 'Target release weight', text: c.release.target_weight });
    blocks.push({ heading: 'Release checklist', checks: c.release.ready_when });
    blocks.push({ heading: 'How to release', items: c.release.how });
    blocks.push({ heading: 'Where to release', text: c.release.where });
  }
  blocks.push({ heading: 'Call the vet within a day if', items: c.escalate.vet });
  blocks.push({ heading: 'Get vet help straight away if', items: c.escalate.urgent });
  if (c.next_visit) blocks.push({ heading: 'Next vet visit', text: c.next_visit });
  return {
    docType: 'Care plan',
    title: c.animal ? `Care plan: ${c.animal}` : 'Care plan',
    aiNote: careAiNote(c),
    blocks,
    tickSheet: c.daily_checks.length ? { items: c.daily_checks, days: tickDays } : null,
    sources: c.sources.map(lookup).filter(Boolean),
  };
}

export function noteModel(n) {
  const p = n.patient;
  const v = n.objective.vitals;
  const nr = (x) => x || NOT_RECORDED;
  const given = n.plan.treatments.filter((t) => t.when === 'given').map((t) => [t.drug, t.dose, t.route].filter(Boolean).join(' '));
  const rx = n.plan.treatments.filter((t) => t.when !== 'given').map((t) => [t.drug, [t.dose, t.route].filter(Boolean).join(' '), t.frequency, t.duration]);
  return {
    docType: 'Clinical notes',
    title: [p.name, p.species].filter(Boolean).join(', ') || 'Clinical notes',
    subtitle: n.visit.type,
    meta: [['Vet', n.visit.clinician], ['Animal ID', p.animal_id]],
    blocks: [
      { heading: 'Patient', table: { head: ['Species', 'Sex', 'Age', 'Weight'], rows: [[nr(p.species), nr(p.sex), nr(p.age), p.weight_kg ? `${p.weight_kg} kg` : NOT_RECORDED]] } },
      { heading: 'History', text: n.subjective },
      { heading: 'Vitals', table: { head: ['Temp', 'Heart rate', 'Resp rate', 'BCS', 'Hydration'], rows: [[v.temp_c ? `${v.temp_c} °C` : '-', v.hr_bpm ? `${v.hr_bpm} bpm` : '-', v.rr_bpm ? `${v.rr_bpm} bpm` : '-', v.bcs || '-', v.hydration || '-']] } },
      { heading: 'Findings', items: [...n.objective.findings, ...n.objective.photo_findings] },
      { heading: 'Assessment', items: [...n.assessment.problems, ...(n.assessment.prognosis ? [`Prognosis: ${n.assessment.prognosis}`] : [])] },
      { heading: 'Diagnostics', items: n.plan.diagnostics },
      { heading: 'Treatment given', items: [...n.plan.procedures, ...given] },
      ...(rx.length ? [{ heading: 'Dispensed', table: { head: ['Drug', 'Dose and route', 'Frequency', 'Duration'], rows: rx, widths: [2800, 2600, 2200, PAGE_W - 7600] } }] : []),
      { heading: 'Hospitalisation plan', items: n.plan.hospital_plan || [] },
      { heading: 'Follow-up', items: n.plan.follow_up },
      { heading: 'Welfare notes', text: n.welfare_notes },
    ],
  };
}

export function wordFileName(title) {
  const base = String(title || 'Bunurong Wildlife Care').replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
  const d = new Date();
  const pad = (x) => String(x).padStart(2, '0');
  return `${base} ${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}.docx`;
}


/** Discharge pack for the vet: clinical summary (when the notes are ready), medication labels, the carer plan and the fridge tick sheet. */
export function dischargeModel(c, note, lookup, vet = '', date = new Date()) {
  const care = careModel(c, lookup);
  const animal = c.animal || (note && [note.patient.name, note.patient.species].filter(Boolean).join(', ')) || 'Animal in care';
  const fromNote = note ? note.plan.treatments.filter((t) => t.when !== 'given') : [];
  const labels = (fromNote.length
    ? fromNote.map((t) => ({ drug: t.drug, directions: [t.dose, t.route, t.frequency].filter(Boolean).join(', '), duration: t.duration ? `For ${t.duration}` : '' }))
    : c.medications.map((m) => ({ drug: m.name, directions: [m.how, m.how_often].filter(Boolean).join(', '), duration: m.how_long })))
    .filter((l) => l.drug)
    .map((l) => ({ ...l, animal, vet: vet || (note && note.visit.clinician) || '', date: formatDate(date) }));
  const clinical = note
    ? noteModel(note).blocks
        .filter((b) => ['History', 'Findings', 'Assessment', 'Treatment given', 'Dispensed', 'Follow-up'].includes(b.heading))
        .map((b) => ({ ...b, heading: b.heading === 'History' ? 'Clinical summary: history' : b.heading }))
    : [];
  return {
    docType: 'Discharge pack',
    title: `Discharge pack: ${animal}`,
    aiNote: care.aiNote,
    meta: [['Vet', vet || (note && note.visit.clinician) || '']],
    blocks: [
      ...clinical,
      ...(labels.length ? [{ heading: 'Medication labels', labels, text: 'Cut out and attach to each medication.' }] : []),
      { heading: 'Care plan for the carer', text: 'The carer’s plan follows, in plain English.' },
      ...care.blocks,
    ],
    tickSheet: care.tickSheet,
    sources: care.sources,
  };
}
