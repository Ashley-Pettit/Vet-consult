// Live QA: realistic inputs through the real app (dist/), every AI call timed (wait, thinking, writing).
// Run: npm run build && SCEN=scenarios.example.json TAG=L1 PAR=3 node scripts/qa/run.mjs
// Scenario: {id, role: carer|vet, mode, region?: vic|qld, text, change?: text for the Change plan step}
// Output in qa-out/<TAG>/: <id>.txt (on-screen text), <id>.png, <id>.callN.json (prompt and output), timings.json
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import fs from 'fs';
const APP = fileURLToPath(new URL('../../', import.meta.url));
const OUT = APP + 'qa-out/' + (process.env.TAG || 'run') + '/';
fs.mkdirSync(OUT, { recursive: true });
const PROXY = 'https://care-scribe-proxy.ashley-98e.workers.dev';
const SCEN = JSON.parse(fs.readFileSync(new URL('./' + (process.env.SCEN || 'scenarios.example.json'), import.meta.url)));
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
const srv = spawn('node', [APP + 'scripts/serve.mjs', APP + 'dist', '4199'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 1500));
const browser = await chromium.launch();
const all = [];

async function timedCall(body) {
  const t0 = Date.now();
  const r = await fetch(PROXY, { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://ashley-pettit.github.io' }, body: JSON.stringify(body) });
  const tHead = Date.now() - t0;
  const m = { status: r.status, tHead, tStart: null, tThink: null, tText: null, tEnd: null, thinkChars: 0, textChars: 0, blocks: [], usage: {} };
  if (!r.ok || !/event-stream/.test(r.headers.get('content-type') || '')) { const raw = await r.text(); m.tEnd = Date.now() - t0; return { m, raw, ctype: r.headers.get('content-type') || 'application/json' }; }
  const reader = r.body.getReader(); const dec = new TextDecoder(); let raw = '', buf = '';
  for (;;) {
    const { value, done } = await reader.read(); if (done) break;
    const chunk = dec.decode(value, { stream: true }); raw += chunk; buf += chunk;
    let i; while ((i = buf.indexOf('\n\n')) >= 0) {
      const ev = buf.slice(0, i); buf = buf.slice(i + 2);
      const line = ev.split('\n').find((l) => l.startsWith('data:')); if (!line) continue;
      let d; try { d = JSON.parse(line.slice(5)); } catch { continue; }
      const now = Date.now() - t0;
      if (d.type === 'message_start') { m.tStart = now; Object.assign(m.usage, d.message.usage); }
      if (d.type === 'content_block_start') m.blocks.push(d.content_block.type);
      if (d.type === 'content_block_delta') {
        if (d.delta.type === 'thinking_delta' || d.delta.type === 'signature_delta') { m.tThink ??= now; m.thinkChars += (d.delta.thinking || '').length; }
        if (d.delta.type === 'text_delta') { m.tText ??= now; m.textChars += d.delta.text.length; }
      }
      if (d.type === 'message_delta' && d.usage) Object.assign(m.usage, d.usage);
    }
  }
  m.tEnd = Date.now() - t0;
  return { m, raw, ctype: 'text/event-stream' };
}

async function run(sc) {
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 1000 } });
  const page = await ctx.newPage();
  await page.addInitScript((s) => { localStorage.setItem('css.settings', JSON.stringify(s)); localStorage.setItem('css.nobake', '1'); }, { role: sc.role, mode: sc.mode, region: sc.region || 'vic', ...(sc.settings || {}) });
  let inflight = 0, last = Date.now(); const calls = [];
  const T0 = Date.now();
  await page.route((u) => u.href.startsWith(PROXY), async (route) => {
    const req = route.request();
    if (req.method() !== 'POST') return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*' }, body: '' });
    inflight++;
    const body = JSON.parse(req.postData() || '{}');
    const c = body.messages[0].content; const texts = typeof c === 'string' ? [c] : c.filter((b) => b.type === 'text').map((b) => b.text);
    const started = Date.now() - T0;
    if (process.env.HINT && typeof c !== 'string') { const last = c[c.length - 1]; last.text += '\n\n' + process.env.HINT; }
    const { m, raw, ctype } = await timedCall(body);
    const outText = raw.split('\n').filter((l) => l.startsWith('data:')).map((l) => { try { const d = JSON.parse(l.slice(5)); return d.delta && d.delta.type === 'text_delta' ? d.delta.text : ''; } catch { return ''; } }).join('');
    fs.writeFileSync(OUT + sc.id + `.call${calls.length}.json`, JSON.stringify({ prompt: texts, output: outText }, null, 1));
    calls.push({ started, model: body.model, max_tokens: body.max_tokens, stream: body.stream, promptChars: texts.join('').length, cachedBlock: typeof c !== 'string' && Boolean(c[0] && c[0].cache_control), head: texts[texts.length - 1].slice(0, 140).replace(/\s+/g, ' '), ...m });
    inflight--; last = Date.now();
    await route.fulfill({ status: m.status, headers: { 'content-type': ctype, 'access-control-allow-origin': 'http://localhost:4199', 'access-control-allow-credentials': 'true' }, body: raw }).catch(() => {});
  });
  await page.goto('http://localhost:4199/');
  await page.locator('#transcript').fill(sc.text);
  const t1 = Date.now();
  await page.locator(sc.button || '#create').click();
  // Done when nothing has been in flight for 6 s after at least one call (background calls included).
  const deadline = Date.now() + 240000;
  let shown = null;
  while (Date.now() < deadline) {
    await page.waitForTimeout(500);
    const v = await page.evaluate(() => document.body.dataset.view);
    if (!shown && v && v !== 'record' && v !== 'working') shown = Date.now() - t1;
    if (calls.length && inflight === 0 && Date.now() - last > 6000 && shown) break;
  }
  if (sc.change) {
    // Use "Change plan" (or "Change" on documents) to amend the result, then wait for the new version.
    const btn = page.locator('#care-back-2:visible, #doc-change:visible, button:has-text("Change"):visible').first();
    await btn.click();
    await page.locator('#more-text').fill(sc.change);
    const before = calls.length;
    await page.locator('#more-go').click();
    const until = Date.now() + 180000;
    while (Date.now() < until) { await page.waitForTimeout(500); if (calls.length > before && inflight === 0 && Date.now() - last > 4000) break; }
  }
  const view = await page.evaluate(() => document.body.dataset.view);
  const text = await page.evaluate((v) => { const root = document.getElementById(`view-${v}`) || document.querySelector('main'); root.querySelectorAll('textarea').forEach((t) => { const d = document.createElement('pre'); d.textContent = `[${t.getAttribute('aria-label') || t.id}]\n${t.value}`; t.replaceWith(d); }); return root.innerText; }, view);
  fs.writeFileSync(OUT + sc.id + '.txt', `INPUT (${sc.role}/${sc.mode}): ${sc.text}\nVIEW: ${view}  shown after ${shown} ms\n\n${text}`);
  await page.screenshot({ path: OUT + sc.id + '.png', fullPage: true });
  all.push({ id: sc.id, role: sc.role, mode: sc.mode, shownMs: shown, view, calls });
  console.log(sc.id, 'shown', shown, 'calls', calls.map((c) => `${c.model} ${c.tEnd}ms out=${c.usage.output_tokens} think=${c.tText && c.tStart ? c.tText - c.tStart : '?'}`).join(' | '));
  await ctx.close();
}
const list = SCEN.filter((s) => !only || only.includes(s.id));
const PAR = Number(process.env.PAR || 3);
for (let i = 0; i < list.length; i += PAR) await Promise.all(list.slice(i, i + PAR).map((s) => run(s).catch((e) => console.log(s.id, 'ERR', e.message))));
fs.writeFileSync(OUT + 'timings.json', JSON.stringify(all, null, 1));
await browser.close(); srv.kill();
