// What goes into each Word printout (plain data, no Word library), so the app can prepare a printout without loading
// the Word library. The library itself (word-docx.js) loads only when someone actually asks for a Word file.
import { dueLabel, formatDate, NOT_RECORDED, rehydrationTable, REHYDRATION_NOTE, careAiNote, feedAmounts } from './note.js';
import { chartByKey } from './feeding.js';
import { rangesFor } from './species-ranges.js';
import { region } from './region.js';

export const PAGE_W = 9638; // A4 minus 2 cm margins, in twentieths of a point

// Handout styles, chosen in Settings. Colours are set per printout from the chosen style.
export const THEMES = {
  bunurong: { name: 'Bunurong Wildlife Care Inc', sub: 'Wildlife Shelter 15147751  ·  Registered Charity  ·  Inverloch, Victoria', primary: '647C50', accent: 'AB6555', tint: 'EEF2E8', line: 'D9DCCF', logo: true, motto: 'Forever home is best', creator: 'Bunurong Wildlife Care' },
  plain: { name: 'Animal Welfare Companion', sub: 'Wildlife care record', primary: '2F3B45', accent: '2F3B45', tint: 'F1F3F5', line: 'D8DCE0', logo: false, motto: '', creator: 'Animal Welfare Companion' },
  rspca: { name: '', sub: 'Wildlife care handout', primary: '0B4F8A', accent: '0B4F8A', tint: 'E8F1F9', line: 'CFDDEA', logo: false, wordmark: 'RSPCA', motto: '', creator: 'RSPCA' },
};

export function docModel(d, kindLabel, note = '', { forPublic = false, video = null } = {}) {
  return {
    docType: kindLabel,
    // A printout for a member of the public reads as plain instructions, not an internal plan name.
    title: forPublic ? (d.title || kindLabel).replace(/^short-term care plan:\s*/i, 'Looking after the ') : d.title || kindLabel,
    subtitle: d.subtitle,
    aiNote: note,
    watch: video,
    blocks: [
      // The ready-to-send text message is for the phone, not the printout.
      ...d.sections.filter((s) => !/^text to (your vet|send)/i.test(s.heading)).map((s) => {
        // "Field: value" lists (like the register entry) print as a two-column table an auditor can scan.
        const items = s.items || [];
        const pairs = items.map((x) => /^([^:]{1,40}):\s+(.+)$/.exec(x));
        if (items.length >= 3 && pairs.every(Boolean)) return { heading: s.heading, table: { head: ['Field', 'Detail'], rows: pairs.map((m) => [m[1], m[2]]), widths: [2800, PAGE_W - 2800] } };
        // The parts people must not miss stand out in a box.
        const tone = /^(text to send)/i.test(s.heading) ? 'summary' : /^(not for publication|keep out of the story)/i.test(s.heading) ? 'urgent' : /^(quote|suggested quote)/i.test(s.heading) ? 'warn' : /^what the photo shows/i.test(s.heading) ? 'photo' : /straight away|urgent|emergenc/i.test(s.heading) ? 'urgent' : /keep yourself safe|within a day/i.test(s.heading) ? 'warn' : undefined;
        return { heading: s.heading, text: s.text, items, tone };
      }),
      ...(d.due.length && !forPublic ? [{ heading: 'What’s due', table: { head: ['What', 'When'], rows: d.due.map((x) => [x.what, x.when ? dueLabel(x.when) : '']), widths: [5800, PAGE_W - 5800] } }] : []),
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

export function careModel(c, lookup, photos = []) {
  const meds = c.medications.map((m) => [m.name, m.how, m.how_often, m.how_long]);
  const blocks = [
    { heading: 'Summary', text: c.summary, tone: 'summary' },
    ...(meds.length ? [{ heading: 'Medications', table: { head: ['Medication', 'How', 'How often', 'How long'], rows: meds, widths: [2600, 2600, 2400, PAGE_W - 7600] }, note: c.medications.map((m) => (m.tip ? `${m.name}: ${m.tip}` : '')).filter(Boolean).join('  ') || undefined }] : []),
    ...rangesBlocks(c.species_group),
    ...rehydrationBlocks(c.rehydration),
    // The day-by-day plan as one table, rather than a scatter of small headed sections.
    ...(c.plan.length ? [{ heading: 'Day-by-day plan', table: { head: ['When', 'What to do'], rows: c.plan.map((p) => [p.when, p.tasks.length > 1 ? p.tasks.map((x) => `•  ${x}`).join('\n') : p.tasks.join('')]), widths: [2700, PAGE_W - 2700] } }] : []),
    { heading: 'Housing', items: c.housing },
    { heading: 'Feeding', items: c.feeding },
    ...feedBlocks(c.feed_calc),
    { heading: 'Activity and handling', items: c.activity },
    { heading: 'Other care', items: c.care },
    { heading: 'What the photo shows', items: c.photo_findings || [], tone: 'photo', photos },
  ];
  const tickDays = Math.min(c.log_days || 7, 14);
  if (c.daily_checks.length) blocks.push({ heading: 'Daily tick sheet', text: `On the last page, sized to print and stick on the fridge (${tickDays} days).` });
  if (c.release.ready_when.length || c.release.how.length || c.release.where) {
    if (c.release.target_weight) blocks.push({ heading: 'Target release weight', text: c.release.target_weight });
    blocks.push({ heading: 'Release checklist', checks: c.release.ready_when });
    blocks.push({ heading: 'How to release', items: c.release.how });
    blocks.push({ heading: 'Where to release', text: c.release.where });
  }
  blocks.push({ heading: 'Call the vet within a day if', items: c.escalate.vet, tone: 'warn' });
  blocks.push({ heading: 'Get vet help straight away if', items: c.escalate.urgent, tone: 'urgent' });
  if (c.next_visit) blocks.push({ heading: 'Next vet visit', text: c.next_visit });
  return {
    docType: 'Care plan',
    title: c.animal ? `Care plan: ${c.animal}` : 'Care plan',
    aiNote: careAiNote(c),
    blocks,
    tickSheet: c.daily_checks.length ? { items: c.daily_checks, days: tickDays, urgent: c.escalate.urgent } : null,
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
