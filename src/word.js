// Word printouts in Bunurong Wildlife Care branding: logo and shelter details in the header,
// olive section headings, tables for registers, due dates and tick sheets, motto and page numbers in the footer.
import {
  AlignmentType, BorderStyle, Document, ExternalHyperlink, Footer, Header, ImageRun, LevelFormat, Packer, PageNumber,
  Paragraph, ShadingType, Table, TableCell, TableLayoutType, TableRow, TextRun, VerticalAlign, WidthType,
} from 'docx';
import { LOGO_PNG_BASE64 } from './brand-logo.js';
import { dueLabel, formatDate, NOT_RECORDED, rehydrationTable, REHYDRATION_NOTE } from './note.js';

const OLIVE = '647C50';
const TERRA = 'AB6555';
const INK = '1C1C1C';
const MUTED = '666666';
const LINE = 'D9DCCF';
const TINT = 'EEF2E8';
const HEAD_FONT = 'Arial Narrow';
const BODY_FONT = 'Arial';
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

function header() {
  return new Header({
    children: [
      new Table({
        width: { size: PAGE_W, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        columnWidths: [1300, PAGE_W - 1300],
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
          right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
          insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
          bottom: { style: BorderStyle.SINGLE, size: 18, color: OLIVE },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 1300, type: WidthType.DXA },
                margins: { bottom: 100 },
                children: [new Paragraph({ children: [new ImageRun({ type: 'png', data: logoBytes(), transformation: { width: 62, height: 62 } })] })],
              }),
              new TableCell({
                verticalAlign: VerticalAlign.CENTER,
                margins: { bottom: 100 },
                children: [
                  new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'BUNURONG WILDLIFE CARE INC', font: HEAD_FONT, bold: true, size: 26, color: OLIVE, characterSpacing: 30 })] }),
                  new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Wildlife Shelter 15147751  ·  Registered Charity  ·  Inverloch, Victoria', font: BODY_FONT, size: 16, color: MUTED })] }),
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
          new TextRun({ text: 'FOREVER HOME IS BEST', font: HEAD_FONT, bold: true, size: 16, color: TERRA, characterSpacing: 20 }),
          new TextRun({ text: `   ${label}`, font: BODY_FONT, size: 15, color: MUTED }),
          new TextRun({ children: ['\tPage ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES], font: BODY_FONT, size: 15, color: MUTED }),
        ],
      }),
      new Paragraph({ children: [new TextRun({ text: 'Wildlife emergencies: Wildlife Victoria 24/7 on 03 8400 7300', font: BODY_FONT, size: 15, color: MUTED })] }),
    ],
  });
}

/**
 * model: { docType, title, subtitle, meta: [[label, value]], blocks: [{ heading, text?, items?, table?: { head, rows, widths? }, note? }], sources?: [{ title, publisher, url }] }
 */
export async function buildWord(model, { preparedBy = '', date = new Date() } = {}) {
  const meta = [['Document', model.docType], ['Date', formatDate(date)], ...(preparedBy ? [['Prepared by', preparedBy]] : []), ...(model.meta || [])].filter((m) => m[1]);
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
  for (const b of model.blocks) {
    if (!b.heading || (!b.text && !(b.items && b.items.length) && !b.table)) continue;
    body.push(heading(b.heading));
    if (b.note && b.noteFirst) body.push(new Paragraph({ spacing: { after: 80 }, children: [run(b.note, { italics: true, color: TERRA, size: 19 })] }));
    if (b.text) String(b.text).split(/\n+/).forEach((t) => body.push(para(t)));
    if (b.items) b.items.forEach((t) => body.push(bullet(t)));
    if (b.table) body.push(table(b.table.head, b.table.rows, b.table.widths), new Paragraph({ spacing: { after: 60 }, children: [] }));
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
  const doc = new Document({
    creator: 'Bunurong Wildlife Care',
    title: model.title,
    styles: { default: { document: { run: { font: BODY_FONT, size: 21 } } } },
    numbering: {
      config: [{ reference: 'dots', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 260 } }, run: { color: OLIVE } } }] }],
    },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1900, bottom: 1300, left: 1134, right: 1134, header: 500, footer: 450 } } },
      headers: { default: header() },
      footers: { default: footer(model.docType) },
      children: body,
    }],
  });
  return Packer.toBlob(doc);
}

/* ---------------- adapters: each screen's content into the printout model ---------------- */

export function docModel(d, kindLabel, note = '') {
  return {
    docType: kindLabel,
    title: d.title || kindLabel,
    subtitle: d.subtitle,
    blocks: [
      ...(note ? [{ heading: 'Please note', text: note }] : []),
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

export function careModel(c, lookup) {
  const meds = c.medications.map((m) => [m.name, m.how, m.how_often, m.how_long]);
  const blocks = [
    { heading: 'Summary', text: c.summary },
    ...(meds.length ? [{ heading: 'Medications', table: { head: ['Medication', 'How', 'How often', 'How long'], rows: meds, widths: [2600, 2600, 2400, PAGE_W - 7600] }, note: c.medications.map((m) => (m.tip ? `${m.name}: ${m.tip}` : '')).filter(Boolean).join('  ') || undefined }] : []),
    ...rehydrationBlocks(c.rehydration),
    ...c.plan.map((p) => ({ heading: p.when, items: p.tasks })),
    { heading: 'Housing', items: c.housing },
    { heading: 'Feeding', items: c.feeding },
    { heading: 'Activity and handling', items: c.activity },
    { heading: 'Other care', items: c.care },
  ];
  if (c.daily_checks.length) {
    const days = Math.min(c.log_days || 7, 14);
    const first = 900;
    const rest = Math.floor((PAGE_W - first) / c.daily_checks.length);
    blocks.push({
      heading: `Daily tick sheet (${days} days)`,
      table: { head: ['Day', ...c.daily_checks], rows: Array.from({ length: days }, (_, i) => [String(i + 1), ...c.daily_checks.map(() => '☐')]), widths: [first, ...c.daily_checks.map(() => rest)] },
    });
  }
  if (c.release.ready_when.length || c.release.how.length || c.release.where) {
    blocks.push({ heading: 'Ready for release when', items: c.release.ready_when });
    blocks.push({ heading: 'How to release', items: c.release.how });
    blocks.push({ heading: 'Where to release', text: c.release.where });
  }
  blocks.push({ heading: 'Call the vet within a day if', items: c.escalate.vet });
  blocks.push({ heading: 'Get vet help straight away if', items: c.escalate.urgent });
  if (c.next_visit) blocks.push({ heading: 'Next vet visit', text: c.next_visit });
  return {
    docType: 'Care plan',
    title: c.animal ? `Care plan: ${c.animal}` : 'Care plan',
    blocks,
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
