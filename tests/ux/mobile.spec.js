// Mobile UX captures, simulating the Claude app: keyboard voice typing and Claude's runtime.
import { test, expect } from '@playwright/test';
import { SAMPLE_NOTE } from '../e2e/helpers.js';
import { EXAMPLE_BATCH_NOTES, EXAMPLE_CARE_SHEET } from '../../src/note.js';

const OUT = 'test-results/ux';
const claudeStub = `
  const note = ${JSON.stringify(JSON.stringify(SAMPLE_NOTE))};
  const batch = ${JSON.stringify(JSON.stringify({ animals: EXAMPLE_BATCH_NOTES }))};
  const care = ${JSON.stringify(JSON.stringify(EXAMPLE_CARE_SHEET))};
  const sample = Object.assign(async (p) => {
    await new Promise((r) => setTimeout(r, 700));
    return { text: p.includes('home-care') ? care : p.includes('Litter of three') ? batch : note };
  }, { limits: async () => ({ images: { maxCount: 5 } }) });
  window.claude = { use: async (n) => (n === 'sample' ? sample : null) };`;

for (const scheme of ['light', 'dark']) {
  test.describe(`iphone ${scheme}`, () => {
    test.use({ viewport: { width: 390, height: 844 }, colorScheme: scheme, hasTouch: true, isMobile: true, deviceScaleFactor: 2,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
    const shot = (page, n, full = false) => page.screenshot({ path: `${OUT}/m-${scheme}-${n}.png`, fullPage: full });
    test('mobile flow', async ({ page }) => {
      await page.addInitScript({ content: claudeStub });
      await page.goto('./');
      await shot(page, '01-home');
      await page.locator('#mic').click();
      await page.keyboard.type('Rusty kelpie cross stray, temp 39.4, heart rate 120');
      await shot(page, '02-voice-typing');
      await page.locator('#create').click();
      await page.waitForTimeout(250);
      await shot(page, '03-working');
      await expect(page.locator('#view-note')).toBeVisible();
      await shot(page, '04-note');
      await page.mouse.wheel(0, 700);
      await shot(page, '05-note-scrolled');
      await page.locator('#care').click();
      await expect(page.locator('#view-care')).toBeVisible();
      await shot(page, '06-care');
      await page.locator('#care-back').click();
      await page.locator('#new').click();
      await shot(page, '07-new-consult-toast');
      await page.locator('#load-batch-example').click();
      await page.locator('#create').click();
      await expect(page.locator('#animals')).toBeVisible();
      await shot(page, '08-batch');
      await page.locator('#open-settings').click();
      await shot(page, '09-settings');
      await page.keyboard.press('Escape');
      await page.locator('#open-about').click();
      await shot(page, '10-about');
    });
  });
}
