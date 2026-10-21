import { test, expect } from '@playwright/test';
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
test('carer mode screens', async ({ page }) => {
  await page.addInitScript({ content: 'window.claude = { use: async () => null };' });
  await page.goto('./');
  await page.getByRole('radio', { name: 'Carer plan' }).check();
  await page.screenshot({ path: 'test-results/ux/k-home.png' });
  await page.locator('#load-carer-example').click();
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await page.screenshot({ path: 'test-results/ux/k-plan.png', fullPage: true });
});
