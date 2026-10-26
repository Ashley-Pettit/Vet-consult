// A veterinary prescription as a Word document: the vet's practice details at the top, then the animal, owner or
// carer, the medicines, and a signature line the vet signs by hand. Plain and businesslike, no app branding.
import { AlignmentType, BorderStyle, Document, Packer, Paragraph, ShadingType, Table, TableCell, TableLayoutType, TableRow, TextRun, WidthType } from 'docx';

const FONT = 'Arial';
const INK = '1C1C1C';
const MUTED = '555555';
const LINE = 'BFBFBF';
const RED = 'B42318';
const W = 9638; // A4 text width at 2 cm margins, in twips

const run = (text, o = {}) => new TextRun({ text: String(text), font: FONT, size: o.size || 21, bold: o.bold, italics: o.italics, color: o.color || INK, allCaps: o.caps });
const para = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], spacing: { before: o.before || 0, after: o.after == null ? 60 : o.after, line: 276 }, alignment: o.align, keepNext: o.keepNext, border: o.border });
const label = (t) => run(t, { size: 16, bold: true, color: MUTED, caps: true });
const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };

function cell(children, width, o = {}) {
  return new TableCell({
    children,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 90, bottom: 90, left: 120, right: 120 },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    borders: o.borders || { top: thin, bottom: thin, left: thin, right: thin },
    columnSpan: o.span,
  });
}
// "Label: value" pairs in a two-column grid.
function grid(pairs) {
  const half = W / 2;
  const rows = [];
  for (let i = 0; i < pairs.length; i += 2) {
    rows.push(new TableRow({ children: [pairs[i], pairs[i + 1]].map((p) => cell(p ? [para(label(p[0]), { after: 20 }), para(run(p[1] || '—'), { after: 0 })] : [para(run(''))], half)) }));
  }
  return new Table({ rows, width: { size: W, type: WidthType.DXA }, columnWidths: [half, half], layout: TableLayoutType.FIXED });
}
const heading = (t) => para(run(t, { size: 22, bold: true }), { before: 220, after: 80, keepNext: true });

export async function buildPrescription(m) {
  const p = m.prescriber;
  const testBanner = m.test ? [para(run('TEST ONLY: NOT A VALID PRESCRIPTION. Made with a pretend vet account for testing.', { bold: true, color: RED, size: 22 }), { after: 120, border: { top: { style: BorderStyle.SINGLE, size: 12, color: RED }, bottom: { style: BorderStyle.SINGLE, size: 12, color: RED } } })] : [];
  const items = m.items.map((i, n) =>
    new Table({
      width: { size: W, type: WidthType.DXA },
      columnWidths: [W],
      layout: TableLayoutType.FIXED,
      rows: [
        new TableRow({
          children: [
            cell([
              para([run(`${m.items.length > 1 ? `${n + 1}.  ` : ''}${i.medicine}`, { bold: true, size: 23 }), run(`   ${i.schedule === 'S8' ? 'Schedule 8 (controlled drug)' : 'Schedule 4'}`, { size: 18, color: MUTED })], { after: 80 }),
              para([label('Quantity  '), run(i.quantity)], { after: 40 }),
              para([label('Directions  '), run(i.directions)], { after: 40 }),
              para([label('Repeats  '), run(i.repeats), ...(i.interval ? [label('   Interval  '), run(i.interval)] : [])], { after: 0 }),
            ], W, { fill: 'F7F7F5' }),
          ],
        }),
      ],
    }),
  );
  const spaced = items.flatMap((tbl, n) => (n ? [para(run(''), { after: 60 }), tbl] : [tbl]));
  const doc = new Document({
    creator: p.name,
    title: `Veterinary prescription ${m.number}`,
    styles: { default: { document: { run: { font: FONT, size: 21, color: INK } } } },
    sections: [
      {
        properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 1000, left: 1134, right: 1134 } } },
        children: [
          ...testBanner,
          // The prescriber's details, like a letterhead.
          para(run(p.name.startsWith('Dr') ? p.name : `Dr ${p.name}`, { size: 30, bold: true }), { after: 20 }),
          para(run(`Veterinary surgeon · Registration ${p.reg}${p.regState ? ` (${p.regState})` : ''}`, { color: MUTED }), { after: 20 }),
          ...(p.clinic ? [para(run(p.clinic, { bold: true }), { after: 20 })] : []),
          para(run([p.address, p.phone ? `Phone ${p.phone}` : ''].filter(Boolean).join(' · ')), { after: 160, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: INK, space: 8 } } }),
          para([run('VETERINARY PRESCRIPTION', { size: 26, bold: true }), run(`      No. ${m.number}`, { color: MUTED })], { after: 20 }),
          para([label('Date  '), run(m.date)], { after: 60 }),
          para(run('For animal treatment only', { bold: true, color: RED, caps: true, size: 19 }), { after: 120 }),
          heading('Animal'),
          grid([
            ['Species', m.animal.species],
            ['Name or ID', m.animal.name],
            ['Age', m.animal.age],
            ['Sex', m.animal.sex],
            ['Breed or description', m.animal.breed],
          ]),
          heading('Owner or carer'),
          grid([
            ['Name', m.owner.name],
            ['Address', m.owner.address],
          ]),
          heading(m.items.length > 1 ? 'Medicines' : 'Medicine'),
          ...spaced,
          // Signed by hand: the law doesn't allow a printed or pre-signed signature on a paper script.
          para(run(''), { before: 520, after: 0 }),
          new Table({
            width: { size: W, type: WidthType.DXA },
            columnWidths: [W * 0.62, W * 0.38],
            layout: TableLayoutType.FIXED,
            rows: [
              new TableRow({
                children: [
                  cell([para(run(''), { after: 260 }), para(label('Signature of prescriber, in their own handwriting'), { after: 0 })], W * 0.62, { borders: { top: { style: BorderStyle.SINGLE, size: 8, color: INK }, bottom: none, left: none, right: none } }),
                  cell([para(run(''), { after: 260 }), para(label('Date signed'), { after: 0 })], W * 0.38, { borders: { top: { style: BorderStyle.SINGLE, size: 8, color: INK }, bottom: none, left: none, right: none } }),
                ],
              }),
            ],
          }),
          para(run('Not valid until signed by the prescriber in their own handwriting. Pharmacist: please check with the prescriber if anything is unclear.', { size: 17, italics: true, color: MUTED }), { before: 160, after: 0 }),
          ...(m.hasS8 ? [para(run('Schedule 8: quantities and repeats are written in words and figures.', { size: 17, italics: true, color: MUTED }), { before: 40, after: 0 })] : []),
          ...(m.test ? [para(run('TEST ONLY: NOT A VALID PRESCRIPTION.', { bold: true, color: RED }), { before: 200, align: AlignmentType.CENTER })] : []),
        ],
      },
    ],
  });
  return Packer.toBlob(doc);
}
