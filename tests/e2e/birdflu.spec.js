import { test, expect } from './test.js';
import { mockApi, openApp, textReply, withKey } from './helpers.js';
import { EXAMPLE_CARER_PLAN } from '../../src/note.js';

const magpie = {
  ...EXAMPLE_CARER_PLAN,
  animal: 'Australian magpie',
  species: 'Australian magpie',
  medications: [],
  feed_calc: { applies: false },
  release: { ...EXAMPLE_CARER_PLAN.release, before: ['Move to an outdoor aviary to build flight', 'Less handling, natural foods'] },
};

async function makePlan(page, settings, words, plan) {
  await withKey(page, { role: 'carer', mode: 'carer', ...settings });
  const calls = await mockApi(page, { body: () => textReply(plan) });
  await openApp(page);
  await page.locator('#transcript').fill(words);
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  return calls;
}

test('a bird plan has a folded Bird flu panel with Agriculture Victoria’s signs and who to call', async ({ page }) => {
  const calls = await makePlan(page, { region: 'vic' }, 'Magpie fledgling found on the ground in Inverloch, 180 g.', magpie);
  const fold = page.locator('details.birdflu');
  await expect(fold).toBeVisible();
  await expect(fold).not.toHaveAttribute('open', '');
  await fold.locator('summary').click();
  await expect(fold).toContainText('swimming in circles');
  await expect(fold).toContainText('1800 675 888');
  await expect(fold.getByRole('link', { name: /Agriculture Victoria/ })).toHaveAttribute('href', /agriculture\.vic\.gov\.au/);
  // The prompt carries the Agriculture Victoria source (the live-only rules are checked in templates.test.js).
  const p = calls[0].prompt;
  expect(p).toContain('agvic-report-sick-dead-wild-birds');
  expect(p).not.toContain('qld-avian-influenza-signs');
  // The pre-release plan shows in the Release section.
  await expect(page.locator('.care-sec.release')).toContainText('Pre-release plan');
  await expect(page.locator('.care-sec.release')).toContainText('Move to an outdoor aviary to build flight');
});

test('in Queensland the Bird flu panel and sources are Queensland’s', async ({ page }) => {
  const calls = await makePlan(page, { region: 'qld' }, 'Magpie fledgling found on the ground in Brisbane, 180 g.', magpie);
  const fold = page.locator('details.birdflu');
  await fold.locator('summary').click();
  await expect(fold).toContainText('13 25 23');
  await expect(fold.getByRole('link', { name: /Queensland Government/ })).toHaveAttribute('href', /qld\.gov\.au\/initiative\/birdflu/);
  expect(calls[0].prompt).toContain('qld-birdflu-wildlife-rehabilitators');
  expect(calls[0].prompt).not.toContain('agvic-report-sick-dead-wild-birds');
});

test('a possum plan has no Bird flu panel', async ({ page }) => {
  await makePlan(page, { region: 'vic' }, 'Ringtail joey 120 g found on the ground.', { ...EXAMPLE_CARER_PLAN, medications: [] });
  await expect(page.locator('details.birdflu')).toHaveCount(0);
});

// The live build (CHANNEL=live) leaves out prescribing and medicines tools. Run against one with LIVE=1, e.g.
//   CHANNEL=live npm run build && node scripts/serve.mjs dist 4198 & BASE_URL=http://localhost:4198/ LIVE=1 npx playwright test birdflu
test('live build: medicines are listed only, with no Ask a vet, Vet tab, shelter details or prescription flows', async ({ page }) => {
  test.skip(!process.env.LIVE, 'needs a live build (LIVE=1)');
  await withKey(page, { role: 'carer', mode: 'carer' });
  await mockApi(page, { body: () => textReply(EXAMPLE_CARER_PLAN) });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey 120 g found on the ground.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await expect(page.locator('.care-sec').filter({ hasText: 'Medications' }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: /Ask a vet/ })).toHaveCount(0);
  await expect(page.locator('.rxbox')).toHaveCount(0);
  await expect(page.locator('#tab-vet')).toBeHidden();
  await expect(page.locator('#vets-admin')).toBeHidden();
  await expect(page.locator('section[aria-labelledby="set-shelter"]')).toBeHidden();
  await expect(page.locator('#view-about')).not.toContainText('From plan to prescription');
});
