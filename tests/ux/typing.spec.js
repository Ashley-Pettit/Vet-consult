import { test } from '@playwright/test';
// A phone with the keyboard up: the browser viewport shrinks to roughly half height.
test.use({ viewport: { width: 390, height: 430 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36' });
test('typing', async ({ page }) => {
  await page.addInitScript({ content: 'window.claude = { use: async () => null };' });
  await page.goto('./');
  await page.locator('#mic').click();
  await page.keyboard.type('Rusty kelpie cross stray, temp 39.4, heart rate 120');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'test-results/ux/t-typing.png' });
});
