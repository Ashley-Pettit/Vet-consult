import { test, expect } from './test.js';
import { fakeSpeech, withKey, mockApi, openApp, DICTATION, apiReply, textReply, asVet } from './helpers.js';
import { EXAMPLE_CARE_SHEET } from '../../src/note.js';

// An accidental refresh puts back what was on screen: the notes with their hand edits, the care plan, half-typed changes.
test('a refresh keeps the notes, their edits, the care plan and words typed in the update sheet', async ({ page }) => {
  await asVet(page);
  await fakeSpeech(page);
  await withKey(page);
  await mockApi(page, { body: (p) => (p.includes('based on the clinical note below') ? textReply(EXAMPLE_CARE_SHEET) : apiReply()) });
  await openApp(page);
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  await page.locator('#plain').fill('Edited by hand before the refresh.');
  await page.waitForTimeout(600);
  await page.reload();
  await expect(page.locator('#view-note')).toBeVisible();
  await expect(page.locator('#plain')).toHaveValue('Edited by hand before the refresh.');

  // Half-typed words in the update sheet come back the next time it opens.
  await page.locator('#review-open-toggle').click();
  await page.locator('#review-open').click();
  await expect(page.locator('#more')).toBeVisible();
  await page.locator('#more-text').fill('Weight 14.5 kg');
  await page.waitForTimeout(600);
  await page.reload();
  await expect(page.locator('#view-note')).toBeVisible();
  await page.locator('#review-open-toggle').click();
  await page.locator('#review-open').click();
  await expect(page.locator('#more-text')).toHaveValue('Weight 14.5 kg');
  await page.locator('#more-cancel').click();

  await page.locator('#care').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await page.reload();
  await expect(page.locator('#view-care')).toBeVisible();
  await page.locator('#care-back').click();
  await expect(page.locator('#view-note')).toBeVisible();

  // Back to the start: a refresh stays there.
  await page.locator('#back').click();
  await page.reload();
  await expect(page.locator('#view-record')).toBeVisible();
});
