// Checks every baked example opens with no AI call (expect all OK, 82 lines). Run after npm run bake.
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
const APP = fileURLToPath(new URL('../../', import.meta.url));
import { spawn } from 'child_process';
import * as N from '../../src/note.js';
const srv = spawn('node', ['scripts/serve.mjs', 'dist', '4196'], { cwd: APP, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 1500));
const CARER_TABS = ['carer', 'intake', 'log', 'tovet', 'mop'];
const VET_TABS = ['carer', 'vet', 'media', 'witness'];
const clash = (a, b) => (a === 'media' && b === 'witness') || (a === 'witness' && b === 'media');
const JOBS = [
  ...['INTAKE', 'LOG', 'JOEY_CARER', 'TOVET', 'MOP'].flatMap((ex) => CARER_TABS.map((m) => ['carer', m, ex])),
  ['carer', 'funding', 'FUNDING'],
  ...[['vet', 'WOMBAT_VET'], ['carer', 'VET_PLAN'], ['media', 'MEDIA'], ['witness', 'WITNESS']].flatMap(([home, ex]) => VET_TABS.filter((m) => !clash(home, m)).map((m) => ['vet', m, ex, m === 'vet'])),
  ['vet', 'polish', 'POLISH'],
];
const b = await chromium.launch();
const all = ['vic', 'qld'].flatMap((region) => JOBS.map((j) => [region, ...j]));
const results = [];
const one = async ([region, role, mode, ex, care]) => {
  const ctx = await b.newContext();
  const p = await ctx.newPage();
  await p.addInitScript((s) => localStorage.setItem('css.settings', JSON.stringify(s)), { role, mode, region });
  let calls = 0;
  await p.route(/workers\.dev|anthropic\.com/, (r) => { if (r.request().method() === 'POST') calls++; r.abort(); });
  await p.goto('http://localhost:4196/'); await p.waitForTimeout(600);
  await p.locator('#transcript').fill(N[`EXAMPLE_${ex}_DICTATION`]);
  const t0 = Date.now();
  await p.locator('#create').click();
  let ok = true, msg = '';
  try {
    await p.locator('#view-note:visible, #view-care:visible, #view-doc:visible, #view-polish:visible').first().waitFor({ timeout: 20000 });
    if (care) { await p.locator('#care').click(); await p.locator('#view-care').waitFor({ state: 'visible', timeout: 15000 }); }
    if (mode === 'polish') msg = await p.locator('#polish-soap').getAttribute('data-state');
  } catch (e) { ok = false; msg = (await p.locator('.banner').first().textContent().catch(() => '')) || e.message.split('\n')[0]; }
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  await ctx.close();
  return `${ok ? 'OK ' : 'BAD'} ${region} ${role}/${mode} ${ex} ${secs}s calls=${calls} ${msg}`;
};
await Promise.all(Array.from({ length: 10 }, async () => { while (all.length) results.push(await one(all.shift())); }));
console.log(results.join('\n'));
await b.close(); srv.kill();
