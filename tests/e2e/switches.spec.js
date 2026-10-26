import { test, expect } from '@playwright/test';
import { mockApi, openApp, textReply, SAMPLE_NOTE } from './helpers.js';
import { EXAMPLE_CARER_PLAN } from '../../src/note.js';

test('Normal or Vet is switched in Settings > Admin (not on the front screen), and remembered', async ({ page }) => {
  await openApp(page);
  await expect(page.locator('#view-record #role-seg')).toHaveCount(0);
  await expect(page.locator('input[name=role][value=carer]')).toBeChecked();
  await expect(page.locator('#mode label:visible')).toHaveCount(4); // intake is made from a plan, not a tab
  await page.locator('#open-settings').click();
  await page.locator('#tab-admin').click();
  await page.locator('#role-seg label', { hasText: 'Vet' }).click();
  await page.locator('#close-settings').click();
  await expect(page.locator('#mode label:visible')).toHaveCount(3);
  await expect(page.locator('#adv-tab')).toBeVisible();
  await expect(page.locator('input[name=mode]:checked')).toHaveValue('carer'); // vets start on the care plan
  await page.reload();
  await expect(page.locator('input[name=role][value=vet]')).toBeChecked();
  await page.locator('#open-settings').click();
  await page.locator('#tab-admin').click();
  await page.locator('#role-seg label', { hasText: 'Normal' }).click();
  await page.locator('#close-settings').click();
  await expect(page.locator('#mode label:visible')).toHaveCount(4); // intake is made from a plan, not a tab
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
  await expect(later.locator('#open-recent')).toBeVisible();
  await later.locator('#open-recent').click();
  await expect(later.locator('#recent-dlg')).toContainText('Care plan');
  await later.locator('#recent-dlg .recent-item').first().click();
  await expect(later.locator('#view-care')).toBeVisible();
  expect(calls).toHaveLength(0);
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
  await expect(page.locator('#model')).toBeHidden(); // AI models live under Admin
  await page.locator('#tab-admin').click();
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
  await expect(page.locator('#usage-balance')).not.toContainText('Credit balance');
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
  // Clear sits in the composer's tool row, under the words and inside the same box.
  await page.locator('#transcript').fill('x');
  const box = await page.locator('#composer').boundingBox();
  const words = await page.locator('#transcript').boundingBox();
  const btn = await page.locator('#clear-text').boundingBox();
  expect(btn.y).toBeGreaterThanOrEqual(words.y + words.height - 1);
  expect(btn.y + btn.height).toBeLessThanOrEqual(box.y + box.height + 1);
  expect(btn.x).toBeGreaterThanOrEqual(box.x);
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

test('Share offers a Word document or PDF first, then text, then a link to the plan', async ({ page }) => {
  const pdfLoads = [];
  page.on('request', (r) => { if (/\/chunks\/pdf-/.test(r.url())) pdfLoads.push(r.url()); });
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
  await expect(page.getByRole('button', { name: 'Share a link' })).toBeEnabled();
  await page.getByRole('button', { name: 'Share as Word document' }).click();
  await expect.poll(() => page.evaluate(() => window.__shared.length)).toBe(1);
  const f = await page.evaluate(() => window.__shared[0].files[0]);
  expect(f.name).toMatch(/\.docx$/);
  expect(f.size).toBeGreaterThan(3000);
  // PDF is made only when tapped: its maker isn't even downloaded until then.
  expect(pdfLoads.length).toBe(0);
  await page.locator('#care-copy').click();
  await page.getByRole('button', { name: 'Share as PDF' }).click();
  await expect.poll(() => page.evaluate(() => window.__shared.length), { timeout: 15000 }).toBe(2);
  const pdf = await page.evaluate(() => window.__shared[1].files[0]);
  expect(pdf.name).toMatch(/\.pdf$/);
  expect(pdf.type).toBe('application/pdf');
  expect(pdf.size).toBeGreaterThan(20000);
  expect(pdfLoads.length).toBe(1);
});

test('Recent: each plan is kept on the device, the animal leads, and any one reopens without calling Claude', async ({ page }) => {
  let n = 0;
  const animals = ['koala (not doing well, found at the base of a gum tree near the school)', 'ringtail possum joey (female)'];
  const calls = await mockApi(page, { body: () => textReply({ ...EXAMPLE_CARER_PLAN, animal: animals[n++ % 2] }) });
  await openApp(page);
  for (const words of ['Koala at the school, not doing well.', 'Ringtail joey, cat attack.']) {
    await page.locator('#transcript').fill(words);
    await page.locator('#create').click();
    await expect(page.locator('#view-care')).toBeVisible();
    await page.locator('#care-back').click();
  }
  await page.locator('#open-recent').click();
  await expect(page.locator('#recent-dlg .recent-item').first()).toContainText('Ringtail possum joey');
  await expect(page.locator('#recent-dlg .recent-item')).toHaveCount(2);
  await page.locator('#recent-dlg .recent-item', { hasText: 'Koala' }).click();
  await expect(page.locator('#care-title')).toContainText(/koala/i);
  expect(calls).toHaveLength(2);
});

test('dark by default, with Light in Settings that is remembered', async ({ page }) => {
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await openApp(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('#theme-toggle')).toHaveCount(0); // not in the header any more
  await page.locator('#open-settings').click();
  await page.locator('.theme-seg label', { hasText: 'Light' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.locator('#open-settings').click();
  await expect(page.locator('input[name=theme][value=light]')).toBeChecked();
  expect(errors.filter((e) => /Content Security Policy/i.test(e))).toEqual([]);
});

test('Share a link: the plan travels inside the link and opens in the app on another phone', async ({ page, context, browserName }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.addInitScript(() => { navigator.share = undefined; navigator.canShare = undefined; });
  await mockApi(page, { body: () => textReply(EXAMPLE_CARER_PLAN) });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey, cat attack.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await page.locator('#care-copy').click();
  await page.locator('#share-link').click();
  await expect(page.locator('#toast')).toContainText('Link copied');
  const url = await page.evaluate(() => navigator.clipboard.readText());
  expect(url).toMatch(/#p=z/);
  expect(url.length).toBeLessThan(6000);
  // Someone else opens it: no API call, the plan is just there.
  const other = await context.newPage();
  const calls = await mockApi(other, { body: () => textReply(EXAMPLE_CARER_PLAN) });
  await other.goto(url);
  await expect(other.locator('#view-care')).toBeVisible();
  await expect(other.locator('#care-title')).toContainText(/ringtail/i);
  await expect(other.locator('#view-care')).toContainText('Shared with you');
  expect(calls).toHaveLength(0);
});

test('the loading screen offers no model choice: just the fact and Stop', async ({ page }) => {
  const calls = await mockApi(page, { body: () => textReply(EXAMPLE_CARER_PLAN), delayMs: 1500 });
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey, cat attack.');
  await page.locator('#create').click();
  await expect(page.locator('#view-working')).toBeVisible();
  await expect(page.locator('input[name=speed]')).toHaveCount(0);
  await expect(page.locator('#view-working')).not.toContainText(/Fast|Detailed|Next time/);
  await expect(page.locator('#stop')).toBeVisible();
  await expect(page.locator('#view-care')).toBeVisible();
  expect(calls[0].body.model).toBe('claude-sonnet-5-5');
});

test.describe('Add to Home Screen on an iPhone', () => {
  test.use({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  test('Settings shows the iPhone steps', async ({ page }) => {
    await openApp(page);
    await page.locator('#open-settings').click();
    await expect(page.locator('#home-field')).toBeVisible();
    await expect(page.locator('#home-help')).toContainText('iPhone or iPad');
    await expect(page.locator('#home-steps')).toContainText('Add to Home Screen');
    await expect(page.locator('#home-install')).toBeHidden();
  });
});
