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

test('a vet’s plan gets medications suggested for their review; nothing reaches the plan until they accept', async ({ page }) => {
  await withKey(page, { role: 'vet', mode: 'carer' });
  const calls = await mockApi(page, {
    body: (p) => (p.includes('<change>') ? textReply(updated) : p.includes('Draft the medications list') ? textReply(draft) : textReply(plan)),
  });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey 120 g, cat caught, meloxicam 0.1 mg/kg SID 5 days.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  const sec = page.locator('.meds-sec');
  await expect(sec.locator('.draft-title')).toHaveText('Suggested medications: for your review');
  await expect(sec).toContainText('Please update as per your expertise');
  await expect(sec.locator('.tag')).toHaveText('Option for you to consider');
  await expect(sec.locator('.draft-msg')).toContainText('needs a dose');
  await expect(sec.locator('> ul.meds')).toHaveCount(0); // not in the plan yet
  // OK is held back until every medicine has a dose.
  await sec.getByRole('button', { name: 'OK, use these' }).click();
  await expect(sec.locator('.draft')).toBeVisible();
  await sec.locator('#draft-change').fill('Amoxicillin-clavulanate 12.5 mg/kg by mouth twice a day for 7 days');
  await sec.getByRole('button', { name: 'Update suggestions' }).click();
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

test('Ask a vet sends the shelter and animal details with the plan; they are kept for next time but still shown', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await withKey(page, { role: 'carer', mode: 'carer' });
  await mockApi(page, { body: () => textReply(plan) });
  const stored = [];
  await page.route(/\/share(\/|\?|$)/, async (route) => {
    stored.push(JSON.parse(route.request().postData() || '{}'));
    await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ id: 'abcdEFGH2345', key: 'k'.repeat(24), updated: 1 }) });
  });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey 120 g found on the ground, about 8 weeks old.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await page.locator('.meds-sec').getByRole('button', { name: 'Ask a vet about medications' }).click();
  await expect(page.locator('#askvet-dlg')).toBeVisible();
  await expect(page.locator('#askvet-note')).toContainText('prescription guidelines'); // first time: why
  await expect(page.locator('#av-age')).toHaveValue('about 8 weeks'); // from what was said
  await page.locator('#askvet-go').click();
  await expect(page.locator('#askvet-msg')).toContainText('shelter or carer name');
  await page.locator('#av-shelter').fill('Bunurong Wildlife Care');
  await page.locator('#av-address').fill('1 Example Rd, Wonthaggi VIC');
  await page.locator('#av-animal').fill('Willow');
  await page.locator('#askvet-go').click();
  await expect.poll(() => stored.length).toBe(1);
  expect(stored[0].forVet.carer.name).toBe('Bunurong Wildlife Care');
  expect(stored[0].forVet.animal.name).toBe('Willow');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Carer: Bunurong Wildlife Care, 1 Example Rd');
  // Next time: filled in, still shown to check, no explanation needed.
  await page.locator('.meds-sec').getByRole('button', { name: /Send to the vet again/ }).click();
  await expect(page.locator('#av-shelter')).toHaveValue('Bunurong Wildlife Care');
  await expect(page.locator('#askvet-note')).toBeHidden();
  // And in Settings, to change later.
  await page.locator('#askvet-dlg button[value=cancel]').click();
  await page.locator('#open-settings').click();
  await expect(page.locator('#shelter-address')).toHaveValue('1 Example Rd, Wonthaggi VIC');
});

test('a vet accepts the medicines, then writes the prescription: missing boxes are marked in place, and it copies for the PMS', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await withKey(page, { role: 'vet', mode: 'carer' });
  const ready = { meds: [{ ...draft.meds[0], name: 'Meloxicam (pain relief)' }], note: '' };
  await mockApi(page, { body: (p) => (p.includes('Draft the medications list') ? textReply(ready) : textReply(plan)) });
  await openApp(page);
  await page.locator('#open-settings').click();
  await page.locator('#tab-vet').click();
  await page.locator('#acct-fake').click();
  await page.locator('#transcript').fill('Ringtail joey 120 g, female, cat caught, meloxicam 0.1 mg/kg SID 5 days.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  const sec = page.locator('.meds-sec');
  await sec.getByRole('button', { name: 'OK, use these' }).click();
  await expect(page.locator('#meds-rx')).toBeVisible(); // the next step, right there
  await page.locator('#meds-rx').click();
  await expect(page.locator('#rx-dlg')).toBeVisible();
  await expect(page.locator('[id^="rx-med-"]').first()).toHaveValue('Meloxicam'); // no plain-English note on a script
  await expect(page.locator('#rx-sex')).toHaveValue('Female');
  await page.locator('#rx-go').click();
  await expect(page.locator('#rx-msg')).toContainText('highlighted');
  await expect(page.locator('#rx-name')).toHaveAttribute('aria-invalid', 'true');
  await page.locator('#rx-copy').click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('Rx: Meloxicam');
  expect(copied).toContain('Prescriber: Dr Ashley Fake');
});
