import { test, expect } from '@playwright/test';
import { withKey, mockApi, openApp, textReply } from './helpers.js';
import { EXAMPLE_CARER_PLAN } from '../../src/note.js';

test('intake writes the care plan in the same call, and "Need advice right now?" opens it instantly', async ({ page }) => {
  await withKey(page, { role: 'carer', mode: 'intake' });
  const intake = {
    title: 'Intake record: bare-nosed wombat', subtitle: 'Case 26-04417',
    sections: [{ heading: 'Where it was found', text: 'Gravel pull-over, south side of the Bass Highway, east of the Kilcunda bridge.', items: [] }],
    due: [], check: [],
  };
  const calls = await mockApi(page, { body: () => textReply({ intake, care: EXAMPLE_CARER_PLAN }) });
  await openApp(page);
  await page.locator('#transcript').fill('Intake. Adult wombat, car strike, Kilcunda.');
  await page.locator('#create').click();
  await expect(page.locator('#doc-title')).toHaveText('Intake record: bare-nosed wombat');
  // The advice box sits at the bottom, after the record and the Word printout.
  const cta = page.locator('#advice-cta');
  await expect(cta).toBeVisible();
  const [docBox, ctaBox] = [await page.locator('#doc').boundingBox(), await cta.boundingBox()];
  expect(ctaBox.y).toBeGreaterThan(docBox.y + docBox.height);
  await page.locator('#advice-btn').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await expect(page.locator('#care-sheet')).not.toContainText('Never give or do');
  await expect(page.locator('#care-sheet')).not.toContainText('reach a vet');
  expect(calls.length).toBe(1);
});
