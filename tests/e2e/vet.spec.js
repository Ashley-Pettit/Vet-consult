import { test, expect } from '@playwright/test';
import { withKey, mockApi, openApp, textReply } from './helpers.js';
import { EXAMPLE_CARER_PLAN } from '../../src/note.js';

const quick = { patient: { species: 'Bare-nosed wombat', sex: 'Female', weight_kg: '24' }, visit: { type: 'Clinical consult' },
  objective: { vitals: { temp_c: '36.1' }, findings: ['Severe sarcoptic mange, flanks and dorsum'] },
  assessment: { problems: ['Sarcoptic mange, moderate to severe'] }, plan: { follow_up: ['Recheck in 7 days'] }, check: [] };

test('vet: plan first, notes second, copy at the top, quick notes look finished', async ({ page }) => {
  await withKey(page, { role: 'vet' });
  const calls = await mockApi(page, { body: (p) => (p.includes('<dictation>') ? textReply({ animals: [quick] }) : textReply(EXAMPLE_CARER_PLAN)) });
  await openApp(page);
  await expect(page.locator('input[name=mode]:checked')).toHaveValue('carer');
  await page.locator('#transcript').fill('wombat F 24kg mange sev T36.1 recheck 1/52');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await expect(page.locator('#care-copy')).toBeVisible();
  expect(calls[0].prompt).toMatch(/helping a vet .* write a complete care plan for the wildlife carer/);

  // Switch to clinical notes from the same words.
  await page.locator('#make-next-care button', { hasText: 'Clinical notes' }).click();
  await expect(page.locator('#view-note')).toBeVisible();
  await expect(page.locator('#copy-top')).toBeVisible();
  await expect(page.locator('#note')).not.toContainText('Not recorded');
  await expect(page.locator('#plain')).not.toHaveValue(/Not recorded/);
  await expect(page.locator('#gaps')).toBeVisible();
  await expect(page.locator('#gaps')).not.toHaveAttribute('open', '');
  await page.locator('#gaps summary').click();
  await expect(page.locator('#gap-list')).toContainText('Heart rate');

  // Back to the plan: already made, no new call.
  await page.locator('#care').click();
  await expect(page.locator('#view-care')).toBeVisible();
  expect(calls.length).toBe(2);
});
