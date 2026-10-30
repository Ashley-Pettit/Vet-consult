import { test, expect } from './test.js';
import { mockApi, openApp, textReply, withKey } from './helpers.js';
import { EXAMPLE_CARER_PLAN } from '../../src/note.js';

// Phones: Edit plan / Share plan sit on the bottom edge of the screen however far the plan is scrolled, and the
// last thing on the page can still be scrolled clear of them.
test('the Edit / Share bar stays on the bottom edge on a phone, and nothing is left hidden under it', async ({ page }, info) => {
  test.skip(info.project.name !== 'phone', 'phone layout');
  await withKey(page, { role: 'carer', mode: 'carer' });
  await mockApi(page, { body: () => textReply(EXAMPLE_CARER_PLAN) });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey 120 g found on the ground.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  const bar = page.locator('#view-care > .actions');
  const vh = page.viewportSize().height;
  for (const y of [0, 600, 100000]) {
    await page.evaluate((top) => window.scrollTo({ top }), y);
    await page.waitForTimeout(100);
    const b = await bar.boundingBox();
    expect(Math.round(b.y + b.height)).toBe(vh);
  }
  // At the very bottom, the Word printout button (the last thing before the bar) is fully above it.
  const word = await page.locator('#word-care').boundingBox();
  const b = await bar.boundingBox();
  expect(word.y + word.height).toBeLessThanOrEqual(b.y);
});
