// Pick the house-style examples from a bake log (FULL=1 not needed): the reply Opus gave for each kind of
// document on its own built-in example, per state. Writes src/template-examples.js.
//   node scripts/make-templates.mjs /path/to/bake-log.json [more logs…]
import fs from 'fs';
import { templateKind } from '../src/templates.js';

// The built-in example each kind's house style comes from.
const SOURCE = { vetnotes: 'WOMBAT_VET', caresheet: 'WOMBAT_VET', 'carer-vet': 'VET_PLAN', 'carer-carer': 'JOEY_CARER', intake: 'INTAKE', log: 'LOG', mop: 'MOP', tovet: 'TOVET', media: 'MEDIA', witness: 'WITNESS', funding: 'FUNDING' };
const out = {};
for (const file of process.argv.slice(2)) {
  for (const e of JSON.parse(fs.readFileSync(file, 'utf8'))) {
    // The log keeps only the start of each prompt; a document's title can sit past it, so the tab tells us instead.
    const kind = templateKind(e.head) || (/^You are a scribe for /.test(e.head) && ['intake', 'log', 'mop', 'tovet', 'media', 'witness', 'funding'].includes(e.mode) ? e.mode : null);
    if (!kind || SOURCE[kind] !== e.ex) continue;
    const m = String(e.reply).match(/\{[\s\S]*\}/);
    let json;
    try { json = JSON.stringify(JSON.parse(m[0])); } catch { continue; }
    (out[e.region] ||= {})[kind] = json; // later logs win
  }
}
fs.writeFileSync(new URL('../src/template-examples.js', import.meta.url), `// Made by scripts/make-templates.mjs: one excellent Opus reply per kind of document, per state.\nexport default ${JSON.stringify(out, null, 1)};\n`);
for (const [r, k] of Object.entries(out)) console.log(r, Object.keys(k).sort().join(', '));
