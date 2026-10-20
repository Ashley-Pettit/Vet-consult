// UX review captures: every screen and state at three widths, both themes.
// Run: npx playwright test -c tests/ux/ux.config.js
import { test, expect } from '@playwright/test';
import { fakeSpeech, noSpeech, withKey, mockApi } from '../e2e/helpers.js';

const OUT = 'test-results/ux';
const sizes = { phone: { width: 375, height: 740 }, tablet: { width: 768, height: 1024 }, desktop: { width: 1280, height: 860 } };

for (const [size, viewport] of Object.entries(sizes)) {
  for (const scheme of ['light', 'dark']) {
    test.describe(`${size} ${scheme}`, () => {
      test.use({ viewport, colorScheme: scheme, hasTouch: size !== 'desktop', isMobile: size === 'phone' });
      const shot = (page, name, full = false) => page.screenshot({ path: `${OUT}/${size}-${scheme}-${name}.png`, fullPage: full });

      test('dictate flow', async ({ page }) => {
        await fakeSpeech(page);
        await withKey(page);
        await mockApi(page, { delayMs: 1500 });
        await page.goto('./');
        await shot(page, '01-empty');
        await page.locator('#mic').click();
        await page.evaluate(() => window.__fakeSay('this is rusty brown kelpie cross stray full stop temp 39.4 heart rate 120'));
        await page.evaluate(() => window.__fakeSay('laceration on the lateral left forelimb', { final: false }));
        await page.waitForTimeout(1200);
        await shot(page, '02-listening');
        await page.locator('#mic').click();
        await shot(page, '03-stopped-with-text');
        await page.locator('#clear').click();
        await shot(page, '04-cleared-undo-toast');
        await page.locator('#load-example').click();
        await shot(page, '05-example-loaded', true);
        await page.locator('#create').click();
        await page.waitForTimeout(300);
        await shot(page, '06-working');
        await expect(page.locator('#view-note')).toBeVisible();
        await shot(page, '07-note-top');
        await shot(page, '08-note-full', true);
        await page.locator('summary').click();
        await shot(page, '09-note-edit-open', true);
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
        await page.locator('#copy').click();
        await shot(page, '10-copied');
      });

      test('settings and errors', async ({ page }) => {
        await fakeSpeech(page);
        await mockApi(page, { status: 529, body: { type: 'error' } });
        await page.goto('./');
        await page.locator('#transcript').fill('Rusty, kelpie cross stray. Temp 39.4, heart rate 120. Laceration left forelimb, sutured. Cephalexin 22 mg per kg twice daily.');
        await page.locator('#create').click();
        await expect(page.locator('#settings')).toBeVisible();
        await shot(page, '11-settings-first-run');
        await page.locator('#api-key').fill('sk-ant-demo');
        await page.locator('#save-settings').click();
        await page.locator('#create').click();
        await expect(page.locator('#banner')).toBeVisible();
        await shot(page, '12-error-overloaded');
      });

      test('mic blocked and unsupported', async ({ page }) => {
        await fakeSpeech(page, { denied: true });
        await page.goto('./');
        await page.locator('#mic').click();
        await expect(page.locator('#banner')).toBeVisible();
        await shot(page, '13-mic-blocked');
      });

      test('no speech support', async ({ page }) => {
        await noSpeech(page);
        await page.goto('./');
        await shot(page, '14-no-speech');
      });
    });
  }
}
