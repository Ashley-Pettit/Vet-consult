import { test, expect } from '@playwright/test';
import { mockApi, openApp, textReply, SAMPLE_NOTE } from './helpers.js';
import { EXAMPLE_CARER_PLAN } from '../../src/note.js';

test('carer or vet at the top, remembered; the old link is gone', async ({ page }) => {
  await openApp(page);
  await expect(page.locator('#role-switch')).toHaveCount(0);
  await expect(page.locator('input[name=role][value=carer]')).toBeChecked();
  await expect(page.locator('#mode label:visible')).toHaveCount(5);
  await page.locator('#role-seg label', { hasText: 'Vet' }).click();
  await expect(page.locator('#mode label:visible')).toHaveCount(2);
  await expect(page.locator('input[name=mode]:checked')).toHaveValue('carer'); // vets start on the care plan
  await page.reload();
  await expect(page.locator('input[name=role][value=vet]')).toBeChecked();
  await page.locator('#role-seg label', { hasText: 'Carer' }).click();
  await expect(page.locator('#mode label:visible')).toHaveCount(5);
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
  await expect(later.locator('#resume')).toContainText('Care plan');
  await later.locator('#resume-open').click();
  await expect(later.locator('#view-care')).toBeVisible();
  expect(calls).toHaveLength(0);
});

test('New asks first; keeping it changes nothing, starting new clears the words and keeps Last made', async ({ page }) => {
  await mockApi(page, { body: () => textReply(EXAMPLE_CARER_PLAN) });
  await openApp(page);
  await expect(page).toHaveTitle(/Animal Welfare Companion/);
  await page.locator('#transcript').fill('Ringtail joey, cat attack.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await page.locator('#new-care').click();
  await expect(page.locator('#confirm-new')).toBeVisible();
  await page.getByRole('button', { name: 'Keep this' }).click();
  await expect(page.locator('#view-care')).toBeVisible();
  await page.locator('#new-care').click();
  await page.getByRole('button', { name: 'Start new' }).click();
  await expect(page.locator('#view-record')).toBeVisible();
  await expect(page.locator('#transcript')).toHaveValue('');
  await expect(page.locator('#resume')).toContainText('Care plan');
});

test('Copy offers Share or Copy as text; no extra copy button at the top of the care plan', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.addInitScript(() => { window.__shared = []; navigator.share = async (d) => { window.__shared.push(d); }; });
  await mockApi(page, { body: () => textReply(EXAMPLE_CARER_PLAN) });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await expect(page.locator('#care-copy-top')).toHaveCount(0);
  await page.locator('#care-copy').click();
  await expect(page.locator('#share-sheet')).toBeVisible();
  await page.getByRole('button', { name: 'Share as text' }).click();
  await expect.poll(() => page.evaluate(() => window.__shared.length)).toBe(1);
  expect(await page.evaluate(() => window.__shared[0].text)).toMatch(/^Care plan: /);
  await page.locator('#care-copy').click();
  await page.getByRole('button', { name: 'Copy as text' }).click();
  await expect(page.locator('#toast-text')).toContainText('Care plan copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/^Care plan: /);
});

test('drugs saved in Settings are kept', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('css.settings') || '{}');
    localStorage.setItem('css.settings', JSON.stringify({ ...s, role: 'vet', drugs: 'Our mange wash' }));
  });
  await page.reload();
  await page.locator('#open-settings').click();
  await expect(page.locator('#drugs')).toHaveValue('Our mange wash');
});

test('Opus can be picked (Sonnet by default) and Settings shows AI usage', async ({ page }) => {
  const calls = await mockApi(page, { body: () => ({ ...textReply(EXAMPLE_CARER_PLAN), usage: { input_tokens: 12000, output_tokens: 3000 } }) });
  await openApp(page);
  await page.locator('#open-settings').click();
  await expect(page.locator('#model')).toHaveValue('claude-sonnet-5-5');
  await expect(page.locator('#model option')).toHaveCount(3);
  await expect(page.locator('#usage-body')).toContainText('No AI requests');
  await page.locator('#model').selectOption('claude-opus-5-5');
  await page.getByRole('button', { name: /^Save/ }).click();
  await page.locator('#transcript').fill('Ringtail joey.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  expect(calls.at(-1).body.model).toBe('claude-opus-5-5');
  await page.locator('#open-settings').click();
  const table = page.locator('#usage-body table');
  await expect(table).toContainText('Most thorough (Opus 5.5)');
  await expect(table).toContainText('12,000');
  await expect(page.locator('#usage-body')).toContainText('About $0.11 USD'); // 12k x $4 + 3k x $20 per million
  await expect(page.locator('#usage-balance')).toContainText('Claude Console');
  await page.locator('#usage-reset').click();
  await expect(page.locator('#usage-body')).toContainText('No AI requests');
});

test('Clear sits in the dictation box and asks first', async ({ page }) => {
  await openApp(page);
  await expect(page.locator('#clear-text')).toBeHidden();
  await page.locator('#transcript').fill('Ringtail joey, CBC, small wound.');
  await expect(page.locator('#clear-text')).toBeVisible();
  await page.locator('#clear-text').click();
  await page.getByRole('button', { name: 'Keep them' }).click();
  await expect(page.locator('#transcript')).toHaveValue('Ringtail joey, CBC, small wound.');
  await page.locator('#clear-text').click();
  await page.locator('#confirm-clear').getByRole('button', { name: 'Clear' }).click();
  await expect(page.locator('#transcript')).toHaveValue('');
  await expect(page.locator('#clear-text')).toBeHidden();
  const box = await page.locator('#transcript').boundingBox();
  await page.locator('#transcript').fill('x');
  const btn = await page.locator('#clear-text').boundingBox();
  expect(btn.x + btn.width).toBeGreaterThan(box.x + box.width - 30); // bottom right
  expect(btn.y + btn.height).toBeGreaterThan(box.y + box.height - 30);
});

test('the care plan is easy to forward: Share plan, with the video link in the text', async ({ page }) => {
  await page.addInitScript(() => { window.__shared = []; navigator.share = async (d) => { window.__shared.push(d); }; });
  await mockApi(page, { body: () => textReply({ ...EXAMPLE_CARER_PLAN, species_group: 'koala' }) });
  await openApp(page);
  await page.locator('#transcript').fill('Koala, sore eye.');
  await page.locator('#create').click();
  await expect(page.locator('#care-copy')).toHaveText('Share plan');
  await expect(page.locator('#view-care .video-send')).toHaveCount(0);
  await page.locator('#care-copy').click();
  await page.getByRole('button', { name: 'Share as text' }).click();
  await expect.poll(() => page.evaluate(() => window.__shared.length)).toBe(1);
  expect(await page.evaluate(() => window.__shared[0].text)).toMatch(/https:\/\/www\.youtube\.com\/watch\?v=/);
});

test('Share offers a Word document first, text second, and a link to the app as coming soon', async ({ page }) => {
  await page.addInitScript(() => {
    window.__shared = [];
    navigator.canShare = (d) => Boolean(d && d.files);
    navigator.share = async (d) => { window.__shared.push({ text: d.text, files: (d.files || []).map((f) => ({ name: f.name, type: f.type, size: f.size })) }); };
  });
  await mockApi(page, { body: () => textReply({ ...EXAMPLE_CARER_PLAN, species_group: 'koala' }) });
  await openApp(page);
  await page.locator('#transcript').fill('Koala, sore eye.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await expect(page.locator('#view-care').getByText('Open on YouTube')).toHaveCount(0);
  await page.locator('#care-copy').click();
  await expect(page.getByRole('button', { name: /Send a link to the app/ })).toBeDisabled();
  await page.getByRole('button', { name: 'Share as Word document' }).click();
  await expect.poll(() => page.evaluate(() => window.__shared.length)).toBe(1);
  const f = await page.evaluate(() => window.__shared[0].files[0]);
  expect(f.name).toMatch(/\.docx$/);
  expect(f.size).toBeGreaterThan(3000);
});
