// Mobile UX pass: every screen as it runs inside the Claude app (keyboard voice, Claude runtime).
import { test, expect } from '@playwright/test';
import { SAMPLE_NOTE } from '../e2e/helpers.js';
import { EXAMPLE_CARER_PLAN, EXAMPLE_INSPECTOR_DOC, EXAMPLE_ADOPTION_DOC } from '../../src/note.js';

const stub = `
  const note = ${JSON.stringify(JSON.stringify(SAMPLE_NOTE))};
  const care = ${JSON.stringify(JSON.stringify(EXAMPLE_CARER_PLAN))};
  const insp = ${JSON.stringify(JSON.stringify(EXAMPLE_INSPECTOR_DOC))};
  const adopt = ${JSON.stringify(JSON.stringify(EXAMPLE_ADOPTION_DOC))};
  const sample = Object.assign(async (p) => {
    await new Promise((r) => setTimeout(r, 600));
    const t = p.includes('<comments>') ? (p.includes('inspector') ? insp : p.includes('new owner') ? adopt : care) : note;
    return { text: t };
  }, { limits: async () => ({ images: { maxCount: 5 } }) });
  window.claude = { use: async (n) => (n === 'sample' ? sample : null) };`;

for (const scheme of ['light', 'dark']) {
  test.describe(scheme, () => {
    test.use({ viewport: { width: 390, height: 844 }, colorScheme: scheme, hasTouch: true, isMobile: true, deviceScaleFactor: 2,
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36' });
    const shot = (page, n, full = false) => page.screenshot({ path: `test-results/ux/p-${scheme}-${n}.png`, fullPage: full });
    test('all screens', async ({ page }) => {
      await page.addInitScript({ content: stub });
      await page.goto('./');
      await shot(page, '01-home');
      await page.locator('#mic').click();
      await shot(page, '02-voice');
      await page.keyboard.type('Rusty kelpie cross stray temp 39.4 heart rate 120 laceration left fore sutured cephalexin');
      await page.locator('#create').click();
      await page.waitForTimeout(200);
      await shot(page, '03-working');
      await expect(page.locator('#view-note')).toBeVisible();
      await shot(page, '04-note');
      await page.locator('#checks summary').click();
      await shot(page, '05-review-open');
      await shot(page, '06-note-full', true);
      await page.locator('#back').click();
      for (const m of ['Carer plan', 'Inspector report', 'Adoption summary']) {
        await page.getByRole('radio', { name: m }).check();
        await shot(page, `07-home-${m.split(' ')[0].toLowerCase()}`);
      }
      await page.getByRole('radio', { name: 'Carer plan' }).check();
      await page.locator('#create').click();
      await expect(page.locator('#view-care')).toBeVisible();
      await shot(page, '08-care');
      await page.locator('#care-back').click();
      await page.getByRole('radio', { name: 'Inspector report' }).check();
      await page.locator('#create').click();
      await expect(page.locator('#view-doc')).toBeVisible();
      await shot(page, '09-inspector');
      await page.locator('#open-settings').click();
      await shot(page, '10-settings');
      await page.keyboard.press('Escape');
      await page.locator('#open-about').click();
      await shot(page, '11-about');
    });
  });
}
