// QA through the real app (dist/) with Claude answering its exact prompts, because this container can't reach the proxy.
// Each round: run every scenario; a prompt with a saved reply is answered with it, an unknown one is saved to prompts/
// and fails fast. Answer the saved prompts (replies/<key>.txt), then run again until nothing is pending.
// Run: npm run build && SCEN=scenarios.vet.json node scripts/qa/sim.mjs (prompts, replies and results in qa-out/sim/)
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
const APP = fileURLToPath(new URL('../../', import.meta.url));
const HERE = APP + 'qa-out/sim/';
const require = createRequire(APP + 'package.json');
const { chromium } = require('playwright');
const PROXY = 'https://care-scribe-proxy.ashley-98e.workers.dev';
for (const d of ['prompts', 'replies', 'out']) fs.mkdirSync(HERE + d, { recursive: true });
const SCEN = JSON.parse(fs.readFileSync(new URL('./' + (process.env.SCEN || 'scenarios.vet.json'), import.meta.url), 'utf8'));
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
const stripTail = (s) => String(s).replace(/\n\nToday is \d{2}\/\d{2}\/\d{4}\.\nWork efficiently\.[\s\S]*$/, '');
const keyOf = (text) => crypto.createHash('sha1').update(stripTail(text)).digest('hex').slice(0, 16);
const srv = spawn('node', [APP + 'scripts/serve.mjs', APP + 'dist', '4186'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 1500));
const browser = await chromium.launch();
const summary = [];

async function run(sc) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.addInitScript((s) => { localStorage.setItem('css.settings', JSON.stringify(s)); localStorage.setItem('css.nobake', '1'); }, { role: sc.role, mode: sc.mode, region: sc.region || 'vic' });
  let inflight = 0, last = Date.now();
  const calls = [], pending = [];
  await page.route((u) => u.href.startsWith(PROXY), async (route) => {
    const req = route.request();
    if (req.method() !== 'POST') return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*' }, body: '' });
    inflight++;
    const body = JSON.parse(req.postData() || '{}');
    const c = body.messages[0].content;
    const text = typeof c === 'string' ? c : c.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
    const key = keyOf(text);
    const file = HERE + 'replies/' + key + '.txt';
    const cors = { 'access-control-allow-origin': 'http://localhost:4186', 'access-control-allow-credentials': 'true' };
    if (fs.existsSync(file)) {
      calls.push({ key, model: body.model, answered: true });
      const reply = fs.readFileSync(file, 'utf8');
      await route.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify({ content: [{ type: 'text', text: reply }], stop_reason: 'end_turn', usage: { input_tokens: 0, output_tokens: 0 } }) }).catch(() => {});
    } else {
      if (!pending.includes(key)) pending.push(key);
      calls.push({ key, model: body.model, answered: false });
      const pf = HERE + 'prompts/' + key + '.json';
      if (!fs.existsSync(pf)) fs.writeFileSync(pf, JSON.stringify({ scenario: sc.id, model: body.model, text: stripTail(text) }, null, 1));
      // 400 is not retried, so the app gives up straight away.
      await route.fulfill({ status: 400, contentType: 'application/json', headers: cors, body: JSON.stringify({ error: { type: 'invalid_request_error', message: 'pending' } }) }).catch(() => {});
    }
    inflight--; last = Date.now();
  });
  await page.goto('http://localhost:4186/');
  await page.waitForTimeout(600);
  await page.locator('#transcript').fill(sc.text);
  await page.locator('#create').click();
  const settle = async (ms) => {
    const until = Date.now() + ms;
    while (Date.now() < until) { await page.waitForTimeout(500); if (calls.length && inflight === 0 && Date.now() - last > 5000) break; }
  };
  await settle(60000);
  let view = await page.evaluate(() => document.body.dataset.view);
  if (sc.change && !pending.length && view !== 'record') {
    const btn = page.locator('#care-back-2:visible, #doc-change:visible, button:has-text("Change"):visible').first();
    await btn.click();
    await page.locator('#more-text').fill(sc.change);
    const before = calls.length;
    await page.locator('#more-go').click();
    const until = Date.now() + 60000;
    while (Date.now() < until) { await page.waitForTimeout(500); if (calls.length > before && inflight === 0 && Date.now() - last > 4000) break; }
    view = await page.evaluate(() => document.body.dataset.view);
  }
  if (!pending.length) {
    const text = await page.evaluate((v) => { const root = document.getElementById(`view-${v}`) || document.querySelector('main'); const boxes = [...root.querySelectorAll('textarea')].filter((t) => t.offsetParent).map((t) => `[${t.getAttribute('aria-label') || t.id}]\n${t.value}`); return root.innerText + (boxes.length ? '\n\n=== TEXT BOXES ===\n' + boxes.join('\n\n') : ''); }, view);
    fs.writeFileSync(HERE + 'out/' + sc.id + '.txt', `INPUT (${sc.role}/${sc.mode}/${sc.region || 'vic'}): ${sc.text}\n${sc.change ? 'CHANGE: ' + sc.change + '\n' : ''}VIEW: ${view}\n\n${text}`);
    await page.screenshot({ path: HERE + 'out/' + sc.id + '.png', fullPage: true });
  }
  summary.push({ id: sc.id, view, calls: calls.length, pending });
  await ctx.close();
}
const list = SCEN.filter((s) => !only || only.includes(s.id));
for (let i = 0; i < list.length; i += 5) await Promise.all(list.slice(i, i + 5).map((s) => run(s).catch((e) => summary.push({ id: s.id, error: e.message.split('\n')[0] }))));
for (const s of summary) console.log(s.id, s.error ? 'ERR ' + s.error : `view=${s.view} calls=${s.calls} pending=${s.pending.join(',') || '-'}`);
await browser.close(); srv.kill();
