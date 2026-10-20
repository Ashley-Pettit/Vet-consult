// UX captures for the new features, phone light and dark plus desktop light.
import { test, expect } from '@playwright/test';
import { fakeSpeech, withKey, mockApi, SAMPLE_NOTE, apiReply, textReply } from '../e2e/helpers.js';
import { EXAMPLE_BATCH_NOTES, EXAMPLE_CARE_SHEET } from '../../src/note.js';

const smart = (prompt) => {
  if (prompt.includes('home-care instructions')) return textReply(EXAMPLE_CARE_SHEET);
  if (prompt.includes('{"animals":[NOTE')) return textReply({ animals: EXAMPLE_BATCH_NOTES });
  return apiReply();
};
const OUT = 'test-results/ux';
const combos = [
  ['phone', { width: 390, height: 844 }, 'light'],
  ['phone', { width: 390, height: 844 }, 'dark'],
  ['desktop', { width: 1280, height: 900 }, 'light'],
];
for (const [size, viewport, scheme] of combos) {
  test.describe(`${size} ${scheme}`, () => {
    test.use({ viewport, colorScheme: scheme, hasTouch: size === 'phone', isMobile: size === 'phone' });
    const shot = (page, n, full = false) => page.screenshot({ path: `${OUT}/f-${size}-${scheme}-${n}.png`, fullPage: full });
    test('features', async ({ page }) => {
      await fakeSpeech(page);
      await withKey(page);
      await mockApi(page, { body: smart });
      await page.goto('./');
      await shot(page, '01-record');
      await page.locator('#transcript').fill('Rusty kelpie cross');
      await page.locator('#add-photo').setInputFiles([{ name: 'a.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64') }]);
      await shot(page, '02-record-filled', true);
      await page.locator('#clear').click();
      await page.locator('#load-example').click();
      await page.locator('#create').click();
      await expect(page.locator('#view-note')).toBeVisible();
      await shot(page, '03-note-top');
      await shot(page, '04-note-full', true);
      await page.locator('#check-list > li').first().getByRole('button', { name: 'Answer' }).click();
      await shot(page, '05-answer-open');
      await page.locator('#care').click();
      await expect(page.locator('#view-care')).toBeVisible();
      await shot(page, '06-care', true);
      await page.locator('#care-back').click();
      await page.locator('#new').click();
      await page.locator('#load-batch-example').click();
      await page.locator('#create').click();
      await expect(page.locator('#animals')).toBeVisible();
      await shot(page, '07-batch');
      await page.locator('#open-about').click();
      await shot(page, '08-about', true);
    });
    test('keyboard voice mode (inside Claude)', async ({ page }) => {
      await page.addInitScript({ content: 'window.claude = { use: async () => null };' });
      await page.goto('./');
      await page.locator('#mic').click();
      await shot(page, '09-keyboard-voice');
    });
  });
}
