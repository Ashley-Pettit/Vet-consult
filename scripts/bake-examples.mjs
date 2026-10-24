// Make the ready-made example replies: runs each built-in example through the real app once, on Opus,
// and saves every reply by its prompt hash to src/baked-examples.json. Run after changing prompts or examples:
//   npm run build && node scripts/bake-examples.mjs
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import { bakeKey } from '../src/baked.js';
import * as N from '../src/note.js';

const PROXY = 'https://care-scribe-proxy.ashley-98e.workers.dev';
const OUT = new URL('../src/baked-examples.js', import.meta.url);
const LOG = process.env.BAKE_LOG || '/tmp/bake-log.json';
const regions = (process.env.REGIONS || 'vic,qld').split(',');
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;

// Every example, in its own tab and in every "Use the same notes for" button it offers, so no tap from an
// example ever needs a real call. Clinical notes also bake the "Make carer plan" step.
const CARER_TABS = ['carer', 'intake', 'log', 'tovet', 'mop'];
const VET_TABS = ['carer', 'vet', 'media', 'witness'];
const clash = (a, b) => (a === 'media' && b === 'witness') || (a === 'witness' && b === 'media');
const JOBS = [
  ...[['intake', 'INTAKE'], ['log', 'LOG'], ['carer', 'JOEY_CARER'], ['tovet', 'TOVET'], ['mop', 'MOP']]
    .flatMap(([home, ex]) => CARER_TABS.map((m) => ['carer', m, ex])),
  ['carer', 'funding', 'FUNDING'],
  ...[['vet', 'WOMBAT_VET'], ['carer', 'VET_PLAN'], ['media', 'MEDIA'], ['witness', 'WITNESS']]
    .flatMap(([home, ex]) => VET_TABS.filter((m) => !clash(home, m)).map((m) => ['vet', m, ex, m === 'vet' ? { openCare: true } : {}])),
  ['vet', 'polish', 'POLISH'],
].filter((j) => !only || only.includes(`${j[1]}:${j[2]}`));

const existing = (await import('../src/baked-examples.js')).default;
const replies = process.env.FRESH ? {} : { ...existing.replies };
const log = [];
const asked = new Map();

const srv = spawn('node', ['scripts/serve.mjs', 'dist', '4197'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 1500));
const browser = await chromium.launch();

async function run(region, [role, mode, ex, extra = {}]) {
  const text = N[`EXAMPLE_${ex}_DICTATION`];
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 900 } });
  const page = await ctx.newPage();
  // css.nobake: always ask Claude here, never answer from the replies baked into this build.
  await page.addInitScript((s) => { localStorage.setItem('css.settings', JSON.stringify(s)); localStorage.setItem('css.nobake', '1'); }, { role, mode, region, model: 'claude-opus-5-5' });
  let inflight = 0;
  await page.route((u) => u.href.startsWith(PROXY), async (route) => {
    const req = route.request();
    if (req.method() !== 'POST') return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*' }, body: '' });
    inflight++;
    try {
      const body = JSON.parse(req.postData() || '{}');
      const content = body.messages[0].content;
      const prompt = typeof content === 'string' ? content : content.filter((b) => b.type === 'text').map((b) => b.text).join('');
      body.model = 'claude-opus-5-5';
      body.stream = false;
      // Two examples can send the same prompt (a vet's care plan also starts the clinical notes in the background).
      // Ask once and give both the same reply, so anything built on that reply later matches what was baked.
      const k = bakeKey(prompt);
      if (!asked.has(k)) {
        asked.set(k, (async () => {
          let json;
          for (let i = 0; i < 3; i++) {
            const r = await fetch(PROXY, { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://ashley-pettit.github.io' }, body: JSON.stringify(body) });
            json = await r.json();
            if (r.ok) break;
            await new Promise((s) => setTimeout(s, 3000));
          }
          return json;
        })());
      }
      const json = await asked.get(k);
      const out = (json.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
      if (out) {
        replies[bakeKey(prompt)] = out;
        // A reply that needed the app's "reply with only the JSON" retry: answer the first ask with the good reply,
        // so the example shows after one wait, not two.
        const RETRY = '\n\nImportant: your last reply could not be read.';
        if (prompt.includes(RETRY)) replies[bakeKey(prompt.slice(0, prompt.indexOf(RETRY)))] = out;
        log.push({ region, role, mode, ex, head: prompt.slice(0, 160), key: bakeKey(prompt), reply: out, ...(process.env.FULL ? { prompt } : {}) });
      }
      await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': 'http://localhost:4197', 'access-control-allow-credentials': 'true' }, body: JSON.stringify(json) });
    } finally {
      inflight--;
    }
  });
  await page.goto('http://localhost:4197/');
  await page.waitForTimeout(800);
  await page.locator('#transcript').fill(text);
  await page.locator('#create').click();
  await page.locator('#view-note:visible, #view-care:visible, #view-doc:visible, #view-polish:visible, .banner.error:visible').first().waitFor({ timeout: 240000 });
  if (extra.openCare && (await page.locator('#view-note').isVisible())) {
    await page.locator('#care').click();
    await page.locator('#view-care').waitFor({ state: 'visible', timeout: 240000 });
  }
  // Let anything started alongside (the intake's care plan, Rapid polish SOAP) finish.
  for (let quiet = 0; quiet < 4; ) { await page.waitForTimeout(1000); quiet = inflight ? 0 : quiet + 1; }
  console.log('done', region, role, mode, ex);
  await ctx.close();
}

const queue = regions.flatMap((r) => JOBS.map((j) => [r, j]));
const workers = Array.from({ length: Number(process.env.PAR || 6) }, async () => {
  while (queue.length) {
    const [r, j] = queue.shift();
    try { await run(r, j); } catch (e) { console.log('FAILED', r, j.slice(0, 3).join(' '), e.message.split('\n')[0]); }
  }
});
await Promise.all(workers);
await browser.close();
srv.kill();
fs.writeFileSync(OUT, `// Made by scripts/bake-examples.mjs: ready-made replies for the built-in examples, keyed by prompt hash.\nexport default ${JSON.stringify({ replies }, null, 1)};\n`);
fs.writeFileSync(LOG, JSON.stringify(log, null, 1));
console.log('saved', Object.keys(replies).length, 'replies');
console.log(`House-style templates: node scripts/make-templates.mjs ${LOG}`);
