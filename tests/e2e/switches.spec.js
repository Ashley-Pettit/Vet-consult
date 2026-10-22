import { test, expect } from '@playwright/test';
import { mockApi, openApp, textReply, SAMPLE_NOTE } from './helpers.js';
import { EXAMPLE_CARER_PLAN } from '../../src/note.js';

test('carer or vet at the top, remembered; the old link is gone', async ({ page }) => {
  await openApp(page);
  await expect(page.locator('#role-switch')).toHaveCount(0);
  await expect(page.locator('input[name=role][value=carer]')).toBeChecked();
  await expect(page.locator('#mode label:visible')).toHaveCount(4);
  await page.locator('#role-seg label', { hasText: 'Vet' }).click();
  await expect(page.locator('#mode label:visible')).toHaveCount(2);
  await expect(page.locator('input[name=mode]:checked')).toHaveValue('carer'); // vets start on the care plan
  await page.reload();
  await expect(page.locator('input[name=role][value=vet]')).toBeChecked();
  await page.locator('#role-seg label', { hasText: 'Carer' }).click();
  await expect(page.locator('#mode label:visible')).toHaveCount(4);
});

test('QLD uses RSPCA Queensland first, its phone line, and is remembered', async ({ page }) => {
  const calls = await mockApi(page, { body: () => textReply(EXAMPLE_CARER_PLAN) });
  await openApp(page);
  await expect(page.locator('#sos-phone')).toHaveText('03 8400 7300');
  await page.locator('#region-seg label', { hasText: 'QLD' }).click();
  await expect(page.locator('#sos-phone')).toHaveText('1300 ANIMAL (1300 264 625)');
  await expect(page.locator('#sos-phone')).toHaveAttribute('href', 'tel:+611300264625');
  await page.locator('#transcript').fill('Ringtail joey, cat attack.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  const p = calls[0].prompt;
  expect(p.indexOf('rspca-qld-')).toBeGreaterThan(-1);
  expect(p.indexOf('rspca-qld-')).toBeLessThan(p.indexOf('qld-cop-protected-animals-care'));
  expect(p).not.toContain('vic-release-requirements |');
  await page.reload();
  await expect(page.locator('input[name=region][value=qld]')).toBeChecked();
  await expect(page.locator('#sos-phone')).toHaveText('1300 ANIMAL (1300 264 625)');
});

test('vet notes keep carer instructions out; a separate plain-English plan holds them', async ({ page }) => {
  const note = { ...SAMPLE_NOTE, plan: { ...SAMPLE_NOTE.plan, hospital_plan: ['Monitor appetite twice daily'], home_care: ['Keep in a quiet pen with a hide box'] } };
  const calls = await mockApi(page, { body: (p) => (p.includes('<dictation>') ? textReply({ animals: [note] }) : textReply(EXAMPLE_CARER_PLAN)) });
  await page.addInitScript(() => localStorage.setItem('css.settings', JSON.stringify({ role: 'vet', mode: 'vet' })));
  await openApp(page);
  await page.locator('#transcript').fill('Rusty');
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  await expect(page.locator('#note')).toContainText('Hospitalisation plan');
  await expect(page.locator('#note')).not.toContainText('quiet pen');
  await expect(page.locator('#plain')).not.toHaveValue(/quiet pen/);
  await expect(page.locator('#discharge-note')).toBeVisible();
  await page.locator('#discharge-btn').click();
  await expect(page.locator('#view-care')).toBeVisible();
  expect(calls[1].prompt).toContain('discharge instructions for the carer are in plan.home_care');
  expect(calls[1].prompt).toContain('quiet pen');
});

test('a call interrupts: the dictation and the last care plan survive closing the app', async ({ page, context }) => {
  await mockApi(page, { body: () => textReply(EXAMPLE_CARER_PLAN) });
  await page.addInitScript(() => { if (!localStorage.getItem('css.settings')) localStorage.setItem('css.settings', JSON.stringify({ role: 'carer', mode: 'carer' })); });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey, cat attack, half way through talking');
  // The app is closed (new tab, same phone): the words are still there.
  const again = await context.newPage();
  await mockApi(again, { body: () => textReply(EXAMPLE_CARER_PLAN) });
  await again.goto('./');
  await expect(again.locator('#transcript')).toHaveValue('Ringtail joey, cat attack, half way through talking');
  await again.locator('#create').click();
  await expect(again.locator('#view-care')).toBeVisible();
  await again.close();
  // Back later: one tap reopens the plan, no new call to Claude.
  const later = await context.newPage();
  const calls = await mockApi(later, { body: () => textReply(EXAMPLE_CARER_PLAN) });
  await later.goto('./');
  await expect(later.locator('#resume')).toBeVisible();
  await expect(later.locator('#resume-text')).toContainText('Care plan');
  await later.locator('#resume-open').click();
  await expect(later.locator('#view-care')).toBeVisible();
  expect(calls).toHaveLength(0);
});
