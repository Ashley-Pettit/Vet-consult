import { test, expect } from './test.js';
import { mockApi, openApp, textReply, withKey } from './helpers.js';
import { EXAMPLE_CARER_PLAN } from '../../src/note.js';

const plan = { ...EXAMPLE_CARER_PLAN, medications: [] };
const draft = {
  meds: [
    { name: 'Meloxicam (pain relief)', how: '0.1 mg/kg by mouth', how_often: 'Once a day', how_long: '5 days', suggested: false, basis: '', caution: '' },
    { name: 'Amoxicillin-clavulanate (after the cat attack)', how: 'Dose and route: vet to decide', how_often: '', how_long: '', suggested: true, basis: 'Cat contact: antibiotics within 24 h, NSW rescued possums guideline', caution: '' },
  ],
  note: '',
};
const updated = { meds: [draft.meds[0], { ...draft.meds[1], how: '12.5 mg/kg by mouth', how_often: 'Twice a day', how_long: '7 days', suggested: false, basis: '' }], note: '' };

test('a vet’s plan gets medications drafted for their review; nothing reaches the plan until they accept', async ({ page }) => {
  await withKey(page, { role: 'vet', mode: 'carer' });
  const calls = await mockApi(page, {
    body: (p) => (p.includes('<change>') ? textReply(updated) : p.includes('Draft the medications list') ? textReply(draft) : textReply(plan)),
  });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey 120 g, cat caught, meloxicam 0.1 mg/kg SID 5 days.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  const sec = page.locator('.meds-sec');
  await expect(sec.locator('.draft-title')).toHaveText('Draft medications: for your review');
  await expect(sec).toContainText('Please update as per your expertise');
  await expect(sec.locator('.tag')).toHaveText('Option for you to consider');
  await expect(sec.locator('.draft-msg')).toContainText('needs a dose');
  await expect(sec.locator('> ul.meds')).toHaveCount(0); // not in the plan yet
  // OK is held back until every medicine has a dose.
  await sec.getByRole('button', { name: 'OK, use these' }).click();
  await expect(sec.locator('.draft')).toBeVisible();
  await sec.locator('#draft-change').fill('Amoxicillin-clavulanate 12.5 mg/kg by mouth twice a day for 7 days');
  await sec.getByRole('button', { name: 'Update draft' }).click();
  await expect(sec.locator('.tag')).toHaveCount(0);
  await sec.getByRole('button', { name: 'OK, use these' }).click();
  await expect(sec.locator('.draft')).toHaveCount(0);
  await expect(sec.locator('ul.meds li')).toHaveCount(2);
  await expect(sec).toContainText('12.5 mg/kg by mouth');
  expect(calls.filter((c) => c.prompt.includes('Draft the medications list'))).toHaveLength(1);
});

test('a carer’s plan has a Medications section that asks a vet for advice', async ({ page }) => {
  await withKey(page, { role: 'carer', mode: 'carer' });
  await mockApi(page, { body: () => textReply(plan) });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey 120 g found on the ground.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  const sec = page.locator('.meds-sec');
  await expect(sec).toContainText('No medications in this plan');
  await expect(sec.getByRole('button', { name: 'Ask a vet about medications' })).toBeVisible();
  await expect(sec.locator('.draft')).toHaveCount(0); // carers never see drafted options
  await expect(sec.getByRole('button', { name: /Suggest/ })).toHaveCount(0);
  await expect(page.locator('#make-next-care')).not.toContainText('null'); // no stray text under the heading
});
