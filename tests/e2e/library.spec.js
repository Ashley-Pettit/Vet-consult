import { test, expect } from '@playwright/test';
import { withKey, mockApi, openApp, textReply } from './helpers.js';

test('ready-made plans open from the header with no AI call, and Back returns to the list', async ({ page }) => {
  await withKey(page, { role: 'carer' });
  const calls = await mockApi(page);
  await openApp(page);
  await page.locator('#open-library').click();
  await expect(page.locator('#view-library')).toBeVisible();
  for (const name of ['Common wombat', 'Koala', 'Pacific black duck']) await expect(page.locator('.lib-animal h2', { hasText: name })).toBeVisible();
  await page.locator('.lib-animal', { hasText: 'Koala' }).locator('.lib-plan').first().click();
  await expect(page.locator('#view-care')).toBeVisible();
  await expect(page.locator('#care-banner')).toContainText('Ready-made plan: koala');
  await expect(page.locator('#care-sheet')).toContainText('Koala');
  await expect(page.locator('#library-admin')).toBeHidden(); // not an admin
  await expect(page.locator('#care-back-label')).toHaveText('Back to plans');
  await page.locator('#care-back').click();
  await expect(page.locator('#view-library')).toBeVisible();
  expect(calls.length).toBe(0);
});

test('a library admin edits a plan as text, it shows as Edited, and Reset brings the original back', async ({ page }) => {
  await withKey(page, { role: 'carer', libraryAdmin: true });
  await mockApi(page);
  await openApp(page);
  await page.locator('#open-library').click();
  await page.locator('.lib-animal', { hasText: 'Common wombat' }).locator('.lib-plan').first().click();
  await page.locator('#care-edit').click();
  await expect(page.locator('#view-edit')).toBeVisible();
  const housing = page.locator('#edit-housing');
  await housing.fill(`${await housing.inputValue()}\nKeep the joey room below 25°C.`);
  await page.locator('#edit-save').click();
  await expect(page.locator('#care-sheet')).toContainText('Keep the joey room below 25°C.');
  await page.locator('#care-back').click();
  await expect(page.locator('.lib-animal', { hasText: 'Common wombat' }).locator('.tag', { hasText: 'Edited' })).toHaveCount(1);
  await page.locator('.lib-animal', { hasText: 'Common wombat' }).locator('.lib-plan').first().click();
  await expect(page.locator('#care-sheet')).toContainText('Keep the joey room below 25°C.'); // kept on this device
  await page.locator('#care-reset').click();
  await expect(page.locator('#care-sheet')).not.toContainText('Keep the joey room below 25°C.');
});

test('Change plan on a ready-made plan: an admin saves it to the library, without touching the dictation', async ({ page }) => {
  await withKey(page, { role: 'carer', libraryAdmin: true });
  const calls = await mockApi(page, { body: () => textReply({ housing: ['Keep it cool and shaded on hot days.'] }) });
  await openApp(page);
  await page.locator('#transcript').fill('My own words.');
  await page.locator('#open-library').click();
  await page.locator('.lib-animal', { hasText: 'Koala' }).locator('.lib-plan').first().click();
  await page.locator('#care-back-2').click();
  await page.locator('#more-text').fill('Add a line about hot days.');
  await page.locator('#more-go').click();
  await expect(page.locator('#care-sheet')).toContainText('Keep it cool and shaded on hot days.');
  expect(calls[0].prompt).toContain('just the top-level keys you changed');
  await expect(page.locator('#care-reset')).toBeVisible();
  await expect(page.locator('#transcript')).toHaveValue('My own words.');
});

test('vet tabs read Notes, Rapid, Care plan, Advanced', async ({ page }) => {
  await withKey(page, { role: 'vet', mode: 'vet' });
  await openApp(page);
  const tabs = await page.$$eval('#mode > label, #mode > .adv-tab', (ls) => ls.filter((l) => l.offsetParent).map((l) => ({ x: l.getBoundingClientRect().x, v: (l.querySelector('input') || {}).value || 'advanced' })).sort((a, b) => a.x - b.x).map((t) => t.v));
  expect(tabs).toEqual(['vet', 'polish', 'carer', 'advanced']);
});

test('favourites: save a plan with the star, find it at the top of Plans, rename, reopen and remove it', async ({ page }) => {
  await withKey(page, { role: 'carer' });
  const calls = await mockApi(page);
  await openApp(page);
  await page.locator('#open-library').click();
  await expect(page.locator('#saved-plans')).toBeHidden(); // nothing saved yet
  await page.locator('.lib-animal', { hasText: 'Koala' }).locator('.lib-plan').first().click();
  await expect(page.locator('#care-save')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#care-save').click();
  await expect(page.locator('#care-save')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#care-save')).toHaveText('Saved');
  await page.locator('#care-back').click();
  await expect(page.locator('#saved-list li')).toHaveCount(1);
  await page.locator('#saved-list').getByRole('button', { name: /^Rename/ }).click();
  await page.locator('.saved-name').fill('Our koala joey plan');
  await page.locator('.saved-name').press('Enter');
  await expect(page.locator('#saved-list')).toContainText('Our koala joey plan');
  await page.locator('#saved-list .saved-open').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await expect(page.locator('#care-sheet')).toContainText('Koala');
  await expect(page.locator('#care-save')).toHaveText('Saved');
  await page.locator('#care-back').click();
  // Edit plan opens the plan's text to change, separate from Rename.
  await page.locator('#saved-list').getByRole('button', { name: /^Edit/ }).click();
  await expect(page.locator('#view-edit')).toBeVisible();
  await page.locator('#edit-cancel').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await page.locator('#care-back').click();
  await page.locator('#saved-list').getByRole('button', { name: /^Remove/ }).click();
  await expect(page.locator('#saved-plans')).toBeHidden();
  expect(calls.length).toBe(0); // saving and opening never call the AI
});
