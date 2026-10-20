import { test, expect } from '@playwright/test';
import { SAMPLE_NOTE } from '../e2e/helpers.js';
import { EXAMPLE_CARE_SHEET } from '../../src/note.js';
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
test('full note and care sheet', async ({ page }) => {
  await page.addInitScript({ content: `const n=${JSON.stringify(JSON.stringify(SAMPLE_NOTE))};const c=${JSON.stringify(JSON.stringify(EXAMPLE_CARE_SHEET))};const s=Object.assign(async(p)=>({text:p.includes('home-care')?c:n}),{limits:async()=>({})});window.claude={use:async()=>s};` });
  await page.goto('./');
  await page.locator('#transcript').fill('Rusty kelpie cross');
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'test-results/ux/c-note.png', fullPage: true });
  await page.locator('#checks summary').click();
  await page.locator('#check-list > li').first().locator('.check-row').click();
  await page.screenshot({ path: 'test-results/ux/c-review-open.png' });
  await page.locator('#care').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await page.screenshot({ path: 'test-results/ux/c-care.png', fullPage: true });
});
