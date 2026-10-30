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
  await expect(fold).toContainText('tiredness or fatigue');
  await expect(fold).not.toContainText(/sleepy/i);
  await expect(fold).toContainText('along much of the Victorian coast');
  await expect(fold).toContainText('1800 675 888');
  await expect(fold).toContainText('For carers in Victoria');
  await expect(fold).toContainText('until Agriculture Victoria says it can go');
  await expect(fold.getByRole('link', { name: /report sick or dead wild birds/ })).toHaveAttribute('href', /agriculture\.vic\.gov\.au\/.*H5N1-avian-influenza-H5-bird-flu/);
  await expect(fold.getByRole('link', { name: /Wildlife Health Australia/ })).toHaveAttribute('href', /wildlifehealthaustralia\.com\.au/);
  // The prompt carries the Agriculture Victoria source (the live-only rules are checked in templates.test.js).
  const p = calls[0].prompt;
  expect(p).toContain('agvic-report-sick-dead-wild-birds');
  expect(p).toContain('agvic-h5-guidance-vets-rehabilitators');
  expect(p).toContain('wha-h5-bird-flu-wildlife');
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
  await expect(fold).toContainText('Moreton Island');
  await expect(fold).toContainText('For carers in Queensland');
  await expect(fold).toContainText('48 hours before and after handling wild birds');
  await expect(fold).not.toContainText('Agriculture Victoria');
  expect(calls[0].prompt).toContain('qld-h5-current-situation');
  await expect(fold.getByRole('link', { name: /Queensland Government/ })).toHaveAttribute('href', /qld\.gov\.au\/initiative\/birdflu/);
  expect(calls[0].prompt).toContain('qld-birdflu-wildlife-rehabilitators');
  expect(calls[0].prompt).not.toContain('agvic-report-sick-dead-wild-birds');
});

test('a seal or fox plan gets the panel with the signs in mammals; a flying fox does not', async ({ page }) => {
  const seal = { ...EXAMPLE_CARER_PLAN, animal: 'Australian fur seal', species: 'Australian fur seal', medications: [] };
  await makePlan(page, { region: 'vic' }, 'Young fur seal on the beach at Inverloch, weak.', seal);
  const fold = page.locator('details.birdflu');
  await fold.locator('summary').click();
  await expect(fold).toContainText('Seizures or tremors');
  await expect(fold).toContainText('stop handling the animal');
  await expect(fold).not.toContainText('Trouble standing, walking or flying');
});

test('a flying fox plan has no Bird flu panel', async ({ page }) => {
  const ff = { ...EXAMPLE_CARER_PLAN, animal: 'Grey-headed flying fox pup', species: 'Grey-headed flying fox', medications: [] };
  await makePlan(page, { region: 'vic' }, 'Grey-headed flying fox pup, 150 g.', ff);
  await expect(page.locator('details.birdflu')).toHaveCount(0);
});

test('a possum plan has no Bird flu panel', async ({ page }) => {
  await makePlan(page, { region: 'vic' }, 'Ringtail joey 120 g found on the ground.', { ...EXAMPLE_CARER_PLAN, medications: [] });
  await expect(page.locator('details.birdflu')).toHaveCount(0);
});
