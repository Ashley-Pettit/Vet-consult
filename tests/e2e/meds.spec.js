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

const rx = {
  items: [
    { medicine: 'Meloxicam 1.5 mg/mL oral suspension', quantity: '10 mL', directions: 'Give 0.1 mg/kg by mouth once a day with food for 5 days', schedule: 'S4', repeats: 0 },
    { medicine: 'Amoxicillin-clavulanate 50 mg tablets', quantity: '', directions: 'Give 12.5 mg/kg by mouth twice a day for 7 days', schedule: 'S4', repeats: 0 },
  ],
  meds: [
    { name: 'Meloxicam (pain relief)', how: 'By mouth with food', how_often: 'Once a day', how_long: '5 days', tip: '' },
    { name: 'Amoxicillin-clavulanate (after the cat attack)', how: 'By mouth', how_often: 'Twice a day', how_long: '7 days', tip: '' },
  ],
  check: ['Amoxicillin-clavulanate: quantity to supply?'],
};
const vetReply = (p) => (p.includes('Draft the medications list') ? textReply(draft) : p.includes('<prescribing>') ? textReply(rx) : textReply(plan));

test('vets prescribe from one box: type or tap Suggest, then Prescribe fills the plan and a one-screen prescription', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await withKey(page, { role: 'vet', mode: 'carer' });
  const calls = await mockApi(page, { body: vetReply });
  await openApp(page);
  await page.locator('#open-settings').click();
  await page.locator('#tab-vet').click();
  await page.locator('#acct-fake').click();
  await page.locator('#transcript').fill('Ringtail joey 120 g, female, about 8 weeks old, cat caught.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  expect(calls.filter((c) => c.prompt.includes('Draft the medications list'))).toHaveLength(0); // nothing suggested until asked
  const box = page.locator('#rx-text');
  await expect(box).toBeVisible();
  await page.getByRole('button', { name: 'Suggest', exact: true }).click();
  await expect(box).toHaveValue(/Amoxicillin-clavulanate \(after the cat attack\), dose: vet to decide/);
  await expect(page.locator('.rx-why')).toContainText('NSW rescued possums guideline');
  await page.locator('#rx-prescribe').click();
  await expect(page.locator('#toast')).toContainText('vet to decide'); // a dose is still needed
  await box.fill('Meloxicam 1.5 mg/mL oral susp 0.1 mg/kg sid 5 days, 10 mL\nAmoxyclav 50 mg tabs 12.5 mg/kg bid 7 days');
  await page.locator('#rx-prescribe').click();
  // The plan has the medicines in plain English, and the prescription sheet is open.
  await expect(page.locator('#rx-dlg')).toBeVisible();
  await expect(page.locator('.meds-sec ul.meds li')).toHaveCount(2);
  await expect(page.locator('#rx-checks')).toContainText('quantity to supply');
  await expect(page.locator('#rx-animal-sum')).toContainText('Female · about 8 weeks');
  await expect(page.locator('[id^="rx-med-"]').first()).toHaveValue('Meloxicam 1.5 mg/mL oral suspension');
  await page.locator('#rx-go').click();
  await expect(page.locator('#rx-name')).toHaveAttribute('aria-invalid', 'true'); // marked where it sits, its row opened
  await expect(page.locator('#rx-animal-fields')).toBeVisible();
  await page.locator('#rx-copy').click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('Rx: Meloxicam 1.5 mg/mL oral suspension, quantity 10 mL');
  expect(copied).toContain('Prescriber: Dr Ashley Fake');
  // The vet's own words stay in the box.
  await page.locator('#rx-dlg button[value=cancel]').click();
  await expect(box).toHaveValue(/Amoxyclav 50 mg tabs/);
});

test('a vet without an account can still prescribe to copy into their PMS; printing asks them to sign in', async ({ page }) => {
  await withKey(page, { role: 'vet', mode: 'carer' });
  await mockApi(page, { body: vetReply });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey 120 g.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await page.locator('#rx-text').fill('Meloxicam 1.5 mg/mL 0.1 mg/kg sid 5 days 10 mL');
  await page.locator('#rx-prescribe').click();
  await expect(page.locator('#rx-dlg')).toBeVisible();
  await expect(page.locator('#rx-go')).toHaveText('Sign in to print');
  await expect(page.locator('#rx-copy')).toBeVisible();
});
