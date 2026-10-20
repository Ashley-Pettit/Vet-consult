import { test, expect } from '@playwright/test';
import { fakeSpeech, withKey, mockApi, watchErrors, openApp, DICTATION, SAMPLE_NOTE, apiReply, textReply } from './helpers.js';
import { EXAMPLE_BATCH_NOTES, EXAMPLE_CARE_SHEET } from '../../src/note.js';

// One mock that answers each kind of request the way Claude would.
const smart = (prompt) => {
  if (prompt.includes('<check_item>')) {
    const answer = prompt.match(/<answer>([\s\S]*?)<\/answer>/)[1];
    return apiReply({ ...SAMPLE_NOTE, visit: { ...SAMPLE_NOTE.visit, clinician: answer }, check: [SAMPLE_NOTE.check[1]] });
  }
  if (prompt.includes('home-care plan')) return textReply(EXAMPLE_CARE_SHEET);
  if (prompt.includes('{"animals":[NOTE')) return textReply({ animals: EXAMPLE_BATCH_NOTES });
  return apiReply();
};

// A tiny valid PNG (1x1) to stand in for a camera photo.
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

test('seven note types, scrollable on a phone, and each shapes the prompt', async ({ page }) => {
  await withKey(page);
  const calls = await mockApi(page, { body: smart });
  await openApp(page);
  await expect(page.locator('#types input')).toHaveCount(7);
  await page.getByRole('radio', { name: 'Euthanasia' }).check();
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  expect(calls[0].prompt).toContain('euthanasia record');
  expect(calls[0].prompt).toContain('"type":"Euthanasia record"');
});

test('vital flags, dose totals and PMS field copy', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await withKey(page);
  await mockApi(page, { body: smart });
  await openApp(page);
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();

  const temp = page.locator('.vitals .kv.flag');
  await expect(temp).toHaveCount(1);
  await expect(temp).toContainText('High');
  await expect(page.locator('.meds .calc').first()).toContainText('312.4 mg per dose');
  await expect(page.locator('#check-count')).toHaveText('3');
  await expect(page.locator('#check-list')).toContainText('high for a dog');

  const rows = page.locator('.pms-row');
  await expect(rows).toHaveCount(3);
  await rows.nth(1).getByRole('button').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'Cephalexin 22 mg/kg PO BID x 7 days\nMeloxicam 0.1 mg/kg PO SID x 5 days\nFluralaner (Bravecto) Per label PO Once',
  );
  await rows.nth(2).getByRole('button').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/Recheck and suture removal in 10-14 days \(due \d\d\/\d\d\/\d{4}\)/);
  // Calculated totals never leak into what gets pasted.
  expect(await page.locator('#plain').inputValue()).not.toContain('312.4');
});

test('answer a check item and the note updates', async ({ page }) => {
  const errors = watchErrors(page);
  await withKey(page);
  const calls = await mockApi(page, { body: smart });
  await openApp(page);
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  await expect(page.locator('#checks')).not.toHaveAttribute('open', '');
  await page.locator('#checks summary').click();
  const first = page.locator('#check-list > li').first();
  await expect(first).toContainText('Clinician name?');
  await first.getByRole('button', { name: 'Answer' }).click();
  await first.locator('input').fill('Dr Sam Lee');
  await first.getByRole('button', { name: 'Update note' }).click();
  await expect(page.locator('#toast-text')).toHaveText('Note updated.');
  await expect(page.locator('#note')).toContainText('Dr Sam Lee');
  await expect(page.locator('#check-list')).not.toContainText('Clinician name?');
  expect(calls[1].prompt).toContain('<check_item>Clinician name?</check_item>');
  expect(errors).toEqual([]);
});

test('answer by live mic in the answer box', async ({ page }) => {
  await fakeSpeech(page);
  await withKey(page);
  await mockApi(page, { body: smart });
  await openApp(page);
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await page.locator('#checks summary').click();
  const first = page.locator('#check-list > li').first();
  await first.getByRole('button', { name: 'Answer' }).click();
  await first.getByRole('button', { name: 'Answer by voice' }).click();
  await expect(first.getByRole('button', { name: 'Answer by voice' })).toHaveAttribute('aria-pressed', 'true');
  await page.evaluate(() => window.__fakeSay('doctor sam lee'));
  await expect(first.locator('input')).toHaveValue('Doctor sam lee');
});

test('care sheet for foster carers, copied as plain text', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await withKey(page);
  const calls = await mockApi(page, { body: smart });
  await openApp(page);
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await page.locator('#care').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await expect(page.locator('#care-title')).toHaveText('Caring for Rusty at home');
  await expect(page.locator('.care-sec.watch li')).toHaveCount(4);
  expect(calls[1].prompt).toContain('NEVER invent doses');
  await page.locator('#care-copy').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/^Caring for Rusty at home/);
  // Opening it again reuses the sheet rather than asking Claude twice.
  await page.locator('#care-back').click();
  await page.locator('#care').click();
  await expect(page.locator('#view-care')).toBeVisible();
  expect(calls).toHaveLength(2);
});

test('several animals: one note each, switchable', async ({ page }) => {
  await withKey(page);
  const calls = await mockApi(page, { body: smart });
  await openApp(page);
  await page.locator('.switch').click();
  await expect(page.locator('#batch')).toBeChecked();
  await page.locator('#transcript').fill('Litter of three kittens, all bright, details for each.');
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  expect(calls[0].prompt).toContain('SEVERAL animals');
  const tabs = page.locator('#animals .animal');
  await expect(tabs).toHaveCount(3);
  await expect(page.locator('.pname strong')).toHaveText('Kitten 1 (grey tabby)');
  await tabs.nth(1).click();
  await expect(page.locator('.pname strong')).toHaveText('Kitten 2 (black)');
  await expect(tabs.nth(1)).toHaveAttribute('aria-current', 'true');
  expect(await page.locator('#plain').inputValue()).toContain('Kitten 2 (black)');
});

test('photos are shrunk, numbered, sent first and shown with the findings', async ({ page }) => {
  await withKey(page);
  const calls = await mockApi(page, {
    body: () => apiReply({ ...SAMPLE_NOTE, objective: { ...SAMPLE_NOTE.objective, photo_findings: ['Photo 1: 4 cm linear wound, lateral left forelimb'] } }),
  });
  await openApp(page);
  await page.locator('#add-photo').setInputFiles([{ name: 'wound.png', mimeType: 'image/png', buffer: PNG }, { name: 'bcs.png', mimeType: 'image/png', buffer: PNG }]);
  await expect(page.locator('#photo-list .thumb')).toHaveCount(2);
  await page.getByRole('button', { name: 'Remove photo 2' }).click();
  await expect(page.locator('#photo-list .thumb')).toHaveCount(1);
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  const content = calls[0].body.messages[0].content;
  expect(content[0].type).toBe('image');
  expect(content[0].source.media_type).toBe('image/jpeg');
  expect(content.at(-1).text).toContain('1 photo(s) are attached');
  await expect(page.locator('#note')).toContainText('From photos');
  await expect(page.locator('#note .thumb')).toHaveCount(1);
  expect(await page.locator('#plain').inputValue()).toContain('- Photo 1: 4 cm linear wound');
});

test('public demo: both examples and the example care sheet work with no connection', async ({ page }) => {
  const calls = await mockApi(page);
  await openApp(page);
  await page.locator('#load-batch-example').click();
  await expect(page.locator('#batch')).toBeChecked();
  await page.locator('#create').click();
  await expect(page.locator('#animals .animal')).toHaveCount(3);
  await expect(page.locator('#note-banner')).toContainText('example note');
  await page.locator('#new').click();
  await page.locator('#load-example').click();
  await expect(page.locator('#batch')).not.toBeChecked();
  await page.locator('#create').click();
  await page.locator('#care').click();
  await expect(page.locator('#care-banner')).toContainText('example care sheet');
  await expect(page.locator('#care-title')).toHaveText('Caring for Rusty at home');
  // Answering needs Claude: the demo explains rather than asking for a key.
  await page.locator('#care-back').click();
  await page.locator('#checks summary').click();
  await page.locator('#check-list > li').first().getByRole('button', { name: 'Answer' }).click();
  await page.locator('#check-list input').first().fill('Dr Lee');
  await page.getByRole('button', { name: 'Update note' }).click();
  await expect(page.locator('#toast-text')).toContainText('Claude app version');
  await expect(page.locator('#settings')).toBeHidden();
  expect(calls).toHaveLength(0);
});

test('How it works: opens from the header and its buttons lead into the app', async ({ page }) => {
  await openApp(page);
  await page.locator('#open-about').click();
  await expect(page.locator('#view-about')).toBeVisible();
  await expect(page.locator('#view-about h1')).toBeFocused();
  await expect(page.locator('.feat')).toHaveCount(8);
  await expect(page.locator('.steps li')).toHaveCount(3);
  await page.locator('.hero [data-action="example"]').click();
  await expect(page.locator('#view-record')).toBeVisible();
  await expect(page.locator('#transcript')).not.toHaveValue('');
  await page.goto('./#how-it-works');
  await expect(page.locator('#view-about')).toBeVisible();
  await page.locator('.about-cta [data-action="start"]').click();
  await expect(page.locator('#view-record')).toBeVisible();
});

test('euthanasia notes have no care sheet button', async ({ page }) => {
  await withKey(page);
  await mockApi(page, { body: () => apiReply({ ...SAMPLE_NOTE, visit: { type: 'Euthanasia record', clinician: '' } }) });
  await openApp(page);
  await page.getByRole('radio', { name: 'Euthanasia' }).check();
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  await expect(page.locator('#care')).toBeHidden();
});
