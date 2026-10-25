// TEMPORARY UI sweep: screenshots + simple audits. Delete after use.
import { test, expect } from '@playwright/test';
import { fakeSpeech, mergeSettings, openApp, mockApi, withKey, textReply } from './helpers.js';
import { mkdirSync, appendFileSync } from 'node:fs';

const OUT = '/tmp/claude-0/-home-user/761e0207-a3e8-5abf-bbe2-032044c54101/scratchpad/sweep/';
mkdirSync(OUT, { recursive: true });
const LOG = OUT + 'audit.jsonl';

test.use({
  viewport: { width: 390, height: 844 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
});
test.setTimeout(120000);

async function audit(page, name) {
  const r = await page.evaluate(() => {
    const vis = (e) => {
      const s = getComputedStyle(e);
      if (s.visibility === 'hidden' || s.display === 'none') return false;
      const b = e.getBoundingClientRect();
      return b.width > 0 && b.height > 0 && e.closest('[hidden]') == null;
    };
    const label = (e) => (e.id ? '#' + e.id : '') + '.' + String(e.className || '').split(' ')[0] + ' "' + (e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 30) + '"';
    const small = [];
    const dialog = document.querySelector('dialog[open]');
    const root = dialog || document;
    root.querySelectorAll('button, a[href], label.tool-btn, .seg label, .mode label, summary, input[type=checkbox], select').forEach((e) => {
      if (!vis(e)) return;
      if (e.matches('.sr-only') ) return;
      const b = e.getBoundingClientRect();
      if (b.height < 44 || b.width < 44) small.push(`${label(e)} ${Math.round(b.width)}x${Math.round(b.height)}`);
    });
    const doc = document.documentElement;
    const overflow = doc.scrollWidth > doc.clientWidth ? doc.scrollWidth - doc.clientWidth : 0;
    const wide = [];
    document.querySelectorAll('main *').forEach((e) => {
      if (!vis(e)) return;
      const b = e.getBoundingClientRect();
      if (b.right > window.innerWidth + 1 && !e.closest('.tick-wrap, .animals, .types, .tbl, .usage')) wide.push(label(e) + ' r=' + Math.round(b.right));
    });
    const smallInputs = [];
    root.querySelectorAll('input, textarea, select').forEach((e) => {
      if (!vis(e)) return;
      const fs = parseFloat(getComputedStyle(e).fontSize);
      if (fs < 16 && e.type !== 'checkbox' && e.type !== 'radio') smallInputs.push(label(e) + ' ' + fs + 'px');
    });
    return { small: small.slice(0, 40), overflow, wide: wide.slice(0, 10), smallInputs, h: doc.scrollHeight };
  });
  appendFileSync(LOG, JSON.stringify({ name, ...r }) + '\n');
}

async function shot(page, name, { full = false } = {}) {
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}${name}.png`, fullPage: full });
  await audit(page, name);
}

for (const theme of ['dark', 'light']) {
  test.describe(theme, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript({ content: `try { localStorage.setItem('css.theme', '${theme}'); localStorage.setItem('css.hometip', '1'); } catch (e) {}` });
      await fakeSpeech(page);
    });

    test(`carer screens ${theme}`, async ({ page }) => {
      await openApp(page);
      await page.waitForTimeout(600);
      await shot(page, `${theme}-01-record-carer`);
      await shot(page, `${theme}-01b-record-carer-full`, { full: true });
      // mic listening
      await page.locator('#mic').click();
      await page.waitForTimeout(200);
      await page.evaluate(() => window.__fakeSay('Ringtail possum joey about 120 grams, cat attack', { final: false }));
      await shot(page, `${theme}-02-record-listening`);
      await page.locator('#mic').click();
      await page.waitForTimeout(300);
      await page.locator('#transcript').fill('');
      // example
      await page.locator('#load-joey-example').click();
      await page.waitForTimeout(300);
      await shot(page, `${theme}-03-record-example`);
      await page.locator('#create').click();
      await page.waitForTimeout(500);
      await shot(page, `${theme}-04-working`);
      await expect(page.locator('#view-care')).toBeVisible({ timeout: 15000 });
      await page.waitForTimeout(500);
      await shot(page, `${theme}-05-care`);
      await shot(page, `${theme}-05b-care-full`, { full: true });
      await page.locator('#care-copy').click();
      await shot(page, `${theme}-06-share-sheet`);
      await page.keyboard.press('Escape');
      await page.locator('#care-back-2').click();
      await page.waitForTimeout(400);
      await shot(page, `${theme}-07-more-sheet`);
      await page.locator('#more-cancel').click();
      // library
      await page.locator('#open-library').click();
      await page.waitForTimeout(500);
      await shot(page, `${theme}-08-library`);
      await shot(page, `${theme}-08b-library-full`, { full: true });
      // recent
      await page.locator('#home').click();
      await page.waitForTimeout(400);
      await shot(page, `${theme}-09-record-after`);
      if (await page.locator('#confirm-new').isVisible()) {
        await shot(page, `${theme}-09a-confirm-new`);
        await page.keyboard.press('Escape');
      }
      if (await page.locator('#open-recent').isVisible()) {
        await page.locator('#open-recent').click();
        await shot(page, `${theme}-10-recent`);
        await page.keyboard.press('Escape');
      }
      // settings
      await page.locator('#open-settings').click();
      await page.waitForTimeout(300);
      await shot(page, `${theme}-11-settings`);
      await page.locator('#settings').evaluate((d) => d.scrollTo(0, 99999));
      await shot(page, `${theme}-11b-settings-bottom`);
      await page.keyboard.press('Escape');
      // about
      await page.locator('#open-about').click();
      await page.waitForTimeout(400);
      await shot(page, `${theme}-12-about`);
      await shot(page, `${theme}-12b-about-full`, { full: true });
    });

    test(`carer docs ${theme}`, async ({ page }) => {
      await openApp(page);
      for (const [mode, chip] of [['intake', '#load-intake-example'], ['log', '#load-log-example'], ['tovet', '#load-tovet-example'], ['mop', '#load-mop-example']]) {
        await page.locator('#home').click().catch(() => {});
        if (await page.locator('#confirm-new').isVisible()) await page.locator('#confirm-new button[value=new]').click();
        await page.evaluate((m) => { const i = document.querySelector(`input[name=mode][value=${m}]`); i.checked = true; i.dispatchEvent(new Event('change')); }, mode);
        await page.waitForTimeout(200);
        await shot(page, `${theme}-20-record-${mode}`);
        await page.locator(chip).click();
        await page.locator('#create').click();
        await expect(page.locator('#view-doc')).toBeVisible({ timeout: 15000 });
        await page.waitForTimeout(400);
        await shot(page, `${theme}-21-doc-${mode}`);
        await shot(page, `${theme}-21b-doc-${mode}-full`, { full: true });
      }
    });

    test(`vet screens ${theme}`, async ({ page }) => {
      await mergeSettings(page, { role: 'vet', mode: 'vet' });
      await openApp(page);
      await page.waitForTimeout(400);
      await shot(page, `${theme}-30-record-vet`);
      await page.locator('#load-example').click();
      await page.locator('#create').click();
      await expect(page.locator('#view-note')).toBeVisible({ timeout: 15000 });
      await page.waitForTimeout(400);
      await shot(page, `${theme}-31-note`);
      await shot(page, `${theme}-31b-note-full`, { full: true });
      if (await page.locator('#review-open-toggle').isVisible()) {
        await page.locator('#review-open-toggle').click();
        await shot(page, `${theme}-32-note-review-open`);
        await page.locator('#review-open').click();
        await page.waitForTimeout(400);
        await shot(page, `${theme}-33-more-questions`);
        await page.locator('#more-cancel').click();
      }
      // polish
      await page.locator('#back').click();
      await page.waitForTimeout(300);
      await page.locator('#mode input[value=polish]').check({ force: true });
      await page.locator('#transcript').fill('');
      await page.locator('#load-polish-example').click();
      await page.locator('#create').click();
      await expect(page.locator('#view-polish')).toBeVisible({ timeout: 15000 });
      await page.waitForTimeout(2500);
      await shot(page, `${theme}-34-polish-full`, { full: true });
      // advanced
      await page.locator('#polish-back').click();
      await page.waitForTimeout(300);
      await page.locator('#adv-tab').click();
      await page.waitForTimeout(300);
      await shot(page, `${theme}-35-record-advanced`);
      await page.locator('#adv-seg input[value=witness]').check({ force: true });
      await page.waitForTimeout(300);
      await shot(page, `${theme}-36-record-witness-full`, { full: true });
    });

    test(`error state ${theme}`, async ({ page }) => {
      await withKey(page);
      await mockApi(page, { status: 529, body: { type: 'error', error: { type: 'overloaded_error', message: 'Overloaded' } } });
      await openApp(page);
      await page.locator('#transcript').fill('Brushtail possum, adult male, found on road, limping on right hind leg, bright.');
      await page.locator('#create').click();
      await expect(page.locator('#banner')).toBeVisible({ timeout: 15000 });
      await shot(page, `${theme}-40-error`);
    });
  });
}

test.describe('desktop', () => {
  test.use({ viewport: { width: 1280, height: 860 }, isMobile: false, hasTouch: false, userAgent: undefined, deviceScaleFactor: 1 });
  test('desktop screens', async ({ page }) => {
    await page.addInitScript({ content: `try { localStorage.setItem('css.hometip', '1'); } catch (e) {}` });
    await fakeSpeech(page);
    await openApp(page);
    await page.waitForTimeout(500);
    await shot(page, `desk-01-record`, { full: true });
    await page.locator('#load-joey-example').click();
    await page.locator('#create').click();
    await expect(page.locator('#view-care')).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(400);
    await shot(page, `desk-02-care`);
    await shot(page, `desk-02b-care-full`, { full: true });
    await page.locator('#open-settings').click();
    await shot(page, `desk-03-settings`);
    await page.keyboard.press('Escape');
    await page.locator('#care-back-2').click();
    await shot(page, `desk-04-more`);
  });
  test('desktop vet', async ({ page }) => {
    await mergeSettings(page, { role: 'vet', mode: 'vet', theme: 'light' });
    await page.addInitScript({ content: `try { localStorage.setItem('css.theme', 'light'); localStorage.setItem('css.hometip', '1'); } catch (e) {}` });
    await openApp(page);
    await shot(page, `desk-05-record-vet`);
    await page.locator('#load-example').click();
    await page.locator('#create').click();
    await expect(page.locator('#view-note')).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(400);
    await shot(page, `desk-06-note-full`, { full: true });
  });
});
