import { test, expect } from '@playwright/test';
import { withKey, mockApi, openApp, textReply, asVet, apiReply, SAMPLE_NOTE } from './helpers.js';
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

test('Rapid polish: one fast call gives the tidy-up to copy and the SOAP notes', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const calls = await mockApi(page, {
    body: () => textReply({ polished: 'History: Adult wombat, car strike.\nExam: BCS 3/9, laceration L forelimb.\nPlan: Meloxicam 0.2 mg/kg SC SID.', animals: [SAMPLE_NOTE] }),
  });
  await asVet(page);
  await openApp(page);
  await page.locator('#mode label', { hasText: 'Rapid polish' }).click();
  await expect(page.locator('#create')).toHaveText('Polish notes');
  await page.locator('#transcript').fill('adult wombat car strike bcs 3/9 lac L fl meloxicam 0.2 sc sid');
  await page.locator('#create').click();
  await expect(page.locator('#view-polish')).toBeVisible();
  await expect(page.locator('#polish-out')).toHaveValue(/Exam: BCS 3\/9/);
  await page.locator('#polish-copy').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/^History: Adult wombat/);
  await expect(page.locator('#polish-soap-out')).toBeVisible(); // SOAP notes show straight under, no extra tap
  await expect(page.locator('#polish-soap-out')).toHaveValue(/S: /);
  await page.locator('#polish-soap').click();
  await expect(page.locator('#view-note')).toBeVisible();
  expect(calls).toHaveLength(1); // the polish and the SOAP notes come back in the same call
  expect(calls.every((c) => c.body.model === 'claude-haiku-5-5')).toBe(true);
});

test('Media statement: a draft media release, always on the most thorough model, with notes kept out of publication', async ({ page }) => {
  const calls = await mockApi(page, {
    delayMs: 1500,
    body: () => textReply({
      title: 'Wombat recovering after car strike near Kilcunda', subtitle: '',
      sections: [
        { heading: 'Statement', text: 'A bare-nosed wombat hit on the Bass Highway is recovering.\n\nShe is bright and eating.' },
        { heading: 'Quote', text: '"She is a tough girl," said Dr Sam Lee, veterinarian.' },
        { heading: 'Not for publication', items: ['The exact burrow location'] },
      ],
      due: [], check: ['Consent to name the motorist?'],
    }),
  });
  await asVet(page);
  await openApp(page);
  await page.locator('#adv-tab').click(); // Advanced opens on Media statement
  await expect(page.locator('#create')).toHaveText('Draft statement');
  await page.locator('#transcript').fill('Wombat hit on the Bass Highway near Kilcunda, recovering well, slow down at dusk, keep the burrow location private.');
  await page.locator('#create').click();
  await expect(page.locator('#view-doc')).toBeVisible();
  await expect(page.locator('#doc-title')).toContainText('Wombat recovering');
  await expect(page.locator('#view-doc')).toContainText('Not for publication');
  expect(calls[0].body.model).toBe('claude-opus-5-5');
  expect(calls[0].prompt).toMatch(/draft news statement \(media release\)/);
});

test('Media statement comes from the organisation in Settings: RSPCA staff get an RSPCA statement', async ({ page }) => {
  const calls = await mockApi(page, { body: () => textReply({ title: 'Koala season warning', subtitle: '', sections: [{ heading: 'Statement', text: 'Koalas are on the move.' }], due: [], check: [] }) });
  await asVet(page);
  await page.addInitScript(() => {
    const s = JSON.parse(localStorage.getItem('css.settings') || '{}');
    localStorage.setItem('css.settings', JSON.stringify({ ...s, template: 'rspca', region: 'qld', mode: 'media' }));
    localStorage.setItem('css.rspca', 'true');
  });
  await openApp(page);
  await expect(page.locator('#media-from-text')).toContainText('RSPCA Queensland');
  await page.locator('#transcript').fill('Koala breeding season warning for Logan drivers.');
  await page.locator('#create').click();
  await expect(page.locator('#view-doc')).toBeVisible();
  expect(calls[0].prompt).toMatch(/The statement is from RSPCA Queensland/);
});
