import { test, expect } from '@playwright/test';
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
test('outputs screens', async ({ page }) => {
  await page.addInitScript({ content: 'window.claude = { use: async () => null };' });
  await page.goto('./');
  await page.screenshot({ path: 'test-results/ux/o-home.png' });
  await page.getByRole('radio', { name: 'Inspector report' }).check();
  await page.locator('#load-inspector-example').click();
  await page.locator('#create').click();
  await expect(page.locator('#view-doc')).toBeVisible();
  await page.screenshot({ path: 'test-results/ux/o-inspector.png', fullPage: true });
  await page.locator('#doc-back').click();
  await page.getByRole('radio', { name: 'Adoption summary' }).check();
  await page.locator('#clear').click();
  await page.locator('#load-adoption-example').click();
  await page.locator('#create').click();
  await page.screenshot({ path: 'test-results/ux/o-adoption.png', fullPage: true });
});
