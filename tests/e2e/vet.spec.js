import { test, expect } from '@playwright/test';
import { withKey, mockApi, openApp, textReply, asVet, apiReply } from './helpers.js';
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

test('vet: clinical notes start in the background after the plan; discharge pack and Clinical notes use them', async ({ page }) => {
  await withKey(page, { role: 'vet', mode: 'carer' });
  const withMeds = { ...quick, plan: { ...quick.plan, treatments: [{ drug: 'Meloxicam', dose: '0.1 mg/kg', route: 'PO', frequency: 'SID', duration: '5 days', when: 'continue' }] } };
  const calls = await mockApi(page, { body: (p) => (p.includes('<dictation>') ? textReply({ animals: [withMeds] }) : textReply(EXAMPLE_CARER_PLAN)) });
  await openApp(page);
  await page.locator('#transcript').fill('Wombat, mange, meloxicam 0.1 SID 5 days.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await expect(page.locator('#discharge-pack')).toBeVisible();
  await expect.poll(() => calls.filter((c) => c.prompt.includes('<dictation>')).length).toBe(1); // started quietly
  const dl = page.waitForEvent('download');
  await page.locator('#discharge-pack').click();
  expect((await dl).suggestedFilename()).toMatch(/^Discharge pack/);
  await page.locator('.make-btn', { hasText: 'Clinical notes' }).click();
  await expect(page.locator('#view-note')).toBeVisible();
  expect(calls.filter((c) => c.prompt.includes('<dictation>')).length).toBe(1); // reused, not asked twice
});

test('vets see a kind word about pigeons, only for pigeons and only for vets', async ({ page }) => {
  await withKey(page, { role: 'vet', mode: 'carer' });
  await mockApi(page, { body: (p) => textReply({ ...EXAMPLE_CARER_PLAN, animal: 'Crested pigeon', species: 'Crested pigeon', summary: 'A crested pigeon with a sore wing.' }) });
  await openApp(page);
  await page.locator('#transcript').fill('Crested pigeon, wing droop.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care .pigeon-fact')).toContainText('Pigeons are sweet, kind and accepting');
});

test('Quick polish: fast tidy-up ready to copy, with SOAP notes made in the background on the fast model', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const calls = await mockApi(page, {
    body: (prompt) => (/fast scribe/.test(prompt)
      ? { content: [{ type: 'text', text: 'History: Adult wombat, car strike.\nExam: BCS 3/9, laceration L forelimb.\nPlan: Meloxicam 0.2 mg/kg SC SID.' }], stop_reason: 'end_turn' }
      : apiReply()),
  });
  await asVet(page);
  await openApp(page);
  await page.locator('#mode label', { hasText: 'Quick polish' }).click();
  await expect(page.locator('#create')).toHaveText('Polish notes');
  await page.locator('#transcript').fill('adult wombat car strike bcs 3/9 lac L fl meloxicam 0.2 sc sid');
  await page.locator('#create').click();
  await expect(page.locator('#view-polish')).toBeVisible();
  await expect(page.locator('#polish-out')).toHaveValue(/Exam: BCS 3\/9/);
  await page.locator('#polish-copy').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/^History: Adult wombat/);
  await expect(page.locator('#polish-soap')).toHaveAttribute('data-state', 'ready');
  await page.locator('#polish-soap').click();
  await expect(page.locator('#view-note')).toBeVisible();
  expect(calls).toHaveLength(2); // the polish, then the SOAP notes in the background; nothing more on opening them
  expect(calls.every((c) => c.body.model === 'claude-haiku-5-5')).toBe(true);
});
