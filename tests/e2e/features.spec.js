import { test, expect } from '@playwright/test';
import { fakeSpeech, withKey, mockApi, watchErrors, openApp, DICTATION, SAMPLE_NOTE, apiReply, textReply } from './helpers.js';
import { EXAMPLE_BATCH_NOTES, EXAMPLE_CARE_SHEET, EXAMPLE_CARER_PLAN, EXAMPLE_INSPECTOR_DOC } from '../../src/note.js';

// One mock that answers each kind of request the way Claude would.
const smart = (prompt) => {
  if (prompt.includes('<check_item>')) {
    const answer = prompt.match(/<answer>([\s\S]*?)<\/answer>/)[1];
    return apiReply({ ...SAMPLE_NOTE, visit: { ...SAMPLE_NOTE.visit, clinician: answer }, check: [SAMPLE_NOTE.check[1]] });
  }
  if (prompt.includes('<comments>')) return textReply({ ...EXAMPLE_CARER_PLAN, sources: [...EXAMPLE_CARER_PLAN.sources, 'not-a-real-source'] });
  if (prompt.includes('home-care plan')) return textReply(EXAMPLE_CARE_SHEET);
  if (prompt.includes('Litter of three')) return textReply({ animals: EXAMPLE_BATCH_NOTES });
  return apiReply();
};

// A tiny valid PNG (1x1) to stand in for a camera photo.
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

test('Claude names the record type from the dictation', async ({ page }) => {
  await withKey(page);
  await mockApi(page, { body: () => apiReply({ ...SAMPLE_NOTE, visit: { type: 'Euthanasia record', clinician: '' } }) });
  await openApp(page);
  await page.locator('#transcript').fill('Euthanasia of an elderly cat, owner consented, pentobarbital IV, death confirmed.');
  await page.locator('#create').click();
  await expect(page.locator('#note-title')).toHaveText('Euthanasia record');
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
  await page.locator('#transcript').fill('Litter of three kittens, all bright, details for each.');
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  expect(calls[0].prompt).toContain('one animal or SEVERAL');
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
  await page.locator('#create').click();
  await expect(page.locator('#animals .animal')).toHaveCount(3);
  await expect(page.locator('#note-banner')).toContainText('example note');
  await page.locator('#new').click();
  await page.locator('#load-example').click();
  await page.locator('#create').click();
  await page.locator('#care').click();
  await expect(page.locator('#care-banner')).toContainText('example care plan');
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
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  await expect(page.locator('#care')).toBeHidden();
});

test('carer plan mode: talk, then straight to a plan with release and Queensland sources', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const errors = watchErrors(page);
  await withKey(page);
  const calls = await mockApi(page, { body: smart });
  await openApp(page);
  await page.getByRole('radio', { name: 'Carer plan' }).check();
  await expect(page.locator('#create')).toHaveText('Create care plan');
  await expect(page.locator('.mode-intro[data-modes="carer"]')).toBeVisible();
  await expect(page.locator('.mode-intro[data-modes="vet"]')).toBeHidden();
  await page.locator('#transcript').fill('Adult lorikeet, window strike, bruised wing, meloxicam 3 days, release at rescue site.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  expect(calls).toHaveLength(1);
  expect(calls[0].prompt).toContain('ONLY an escalation contact');
  expect(calls[0].prompt).toContain('qld-cop-protected-animals-release | qld |');
  await expect(page.locator('#care-title')).toHaveText('Care plan: Adult rainbow lorikeet');
  await expect(page.locator('.care-sec.release')).toContainText('about an hour after dawn');
  const refs = page.locator('.sources li');
  await expect(refs).toHaveCount(5); // the invented id is dropped
  await expect(refs.first().locator('.scope')).toHaveText('QLD');
  await expect(page.locator('#care-sheet')).not.toContainText('Keeping the clinic updated');
  await page.locator('#care-copy').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Based on');
  await expect(page.locator('#care-back-label')).toHaveText('Back');
  await page.locator('#care-back').click();
  await expect(page.locator('#view-record')).toBeVisible();
  // Mode is remembered (the key helper rewrites settings on reload, so read what was saved).
  expect(JSON.parse(await page.evaluate(() => localStorage.getItem('vcs.settings'))).mode).toBe('carer');
  expect(errors).toEqual([]);
});

test('carer plan examples work in the public demo with no connection', async ({ page }) => {
  const calls = await mockApi(page);
  await openApp(page);
  await page.getByRole('radio', { name: 'Carer plan' }).check();
  await page.locator('#load-carer-example').click();
  await page.locator('#create').click();
  await expect(page.locator('#care-banner')).toContainText('example care plan');
  await expect(page.locator('.care-sec.release')).toBeVisible();
  await page.locator('#care-back').click();
  await page.locator('#clear').click();
  await page.locator('#load-foster-example').click();
  await page.locator('#create').click();
  await expect(page.locator('#care-title')).toHaveText('Caring for Ginger foster kitten at home');
  await page.reload();
  await expect(page.locator('input[name="mode"][value="carer"]')).toBeChecked();
  await expect(page.locator('#transcript')).not.toHaveValue(''); // draft kept, so straight to Create
  await page.locator('#create').click();
  await expect(page.locator('#care-title')).toHaveText('Caring for Ginger foster kitten at home');
  await expect(page.locator('.care-sec.release')).toHaveCount(0);
  await expect(page.locator('#care-sheet')).toContainText('Never give milk');
  expect(calls).toHaveLength(0);
});

test('inspector report: objective sections, review closed, photos sent, copy as text', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await withKey(page);
  const calls = await mockApi(page, { body: () => textReply(EXAMPLE_INSPECTOR_DOC) });
  await openApp(page);
  await page.getByRole('radio', { name: 'Inspector report' }).check();
  await expect(page.locator('#create')).toHaveText('Create report');
  await page.locator('#add-photo').setInputFiles([{ name: 'a.png', mimeType: 'image/png', buffer: PNG }]);
  await page.locator('#transcript').fill('Case 22, kelpie, BCS 2 of 9, nails into pads.');
  await page.locator('#create').click();
  await expect(page.locator('#view-doc')).toBeVisible();
  const prompt = calls[0].prompt;
  expect(prompt).toContain('Animal Care and Protection Act 2001 (Qld)');
  expect(prompt).toContain('Do not say whether an offence was committed');
  expect(prompt).toContain('1 photo(s) are attached');
  expect(calls[0].body.messages[0].content[0].type).toBe('image');
  await expect(page.locator('#doc-title')).toContainText('QS-INS-2207');
  await expect(page.locator('.doc-sec h2')).toContainText(['Case details', 'Animal identification', 'Examination findings', 'Photographs', 'Veterinary opinion', 'Treatment provided', 'Prognosis and recommendations', 'Declaration']);
  await expect(page.locator('#doc-checks')).not.toHaveAttribute('open', '');
  await expect(page.locator('#doc-check-count')).toHaveText('3');
  await page.locator('#doc-copy').click();
  const text = await page.evaluate(() => navigator.clipboard.readText());
  expect(text).toMatch(/^Veterinary report: adult female kelpie/);
  expect(text).toContain('VETERINARY OPINION');
});

test('adoption summary: due dates worked out, examples work with no connection', async ({ page }) => {
  const calls = await mockApi(page);
  await openApp(page);
  await page.getByRole('radio', { name: 'Adoption summary' }).check();
  await expect(page.locator('#load-adoption-example')).toBeVisible();
  await expect(page.locator('#load-example')).toBeHidden();
  await page.locator('#load-adoption-example').click();
  await page.locator('#create').click();
  await expect(page.locator('#doc-banner')).toContainText('example adoption summary');
  await expect(page.locator('#doc-title')).toHaveText('Bella’s health summary');
  await expect(page.locator('.due li')).toHaveCount(2);
  await expect(page.locator('.due .when').first()).toHaveText(/in 1 month \(due \d\d\/\d\d\/\d{4}\)/);
  await expect(page.locator('#doc-checks')).toBeHidden();
  await page.locator('#doc-back').click();
  await page.getByRole('radio', { name: 'Inspector report' }).check();
  await page.locator('#clear').click();
  await page.locator('#load-inspector-example').click();
  await page.locator('#create').click();
  await expect(page.locator('#doc-title')).toContainText('kelpie');
  expect(calls).toHaveLength(0);
});

test('organisation: colours and name are the viewer’s choice, with a not-affiliated line, and house style reaches Claude', async ({ page }) => {
  const errors = watchErrors(page);
  await withKey(page);
  const calls = await mockApi(page, {
    body: (prompt) => (prompt.includes('main brand colours') ? textReply({ primary: '#7a1fa2', secondary: '#f5a623', known: true }) : apiReply()),
  });
  await openApp(page);
  await expect(page.locator('#affil')).toBeHidden();
  await expect(page.locator('#brand-sub')).toHaveText('Shelter vet clinic');

  await page.locator('#open-settings').click();
  await page.locator('#org-name').fill('Example Animal Shelter');
  await page.locator('#brand-lookup').click();
  await expect(page.locator('#brand-status')).toContainText('Suggested colours applied');
  await expect(page.locator('#brand-primary')).toHaveValue('#7a1fa2');
  // Live preview, then Close puts it back.
  expect(await page.evaluate(() => document.documentElement.style.getPropertyValue('--brand'))).not.toBe('');
  await page.locator('#close-settings').click();
  expect(await page.evaluate(() => document.documentElement.style.getPropertyValue('--brand'))).toBe('');

  await page.locator('#open-settings').click();
  await page.locator('#org-name').fill('Example Animal Shelter');
  await page.locator('#brand-lookup').click();
  await page.locator('#org-style').fill('Use headings in capitals. Write "twice daily", never BID.');
  await page.locator('#save-settings').click();
  await expect(page.locator('#brand-sub')).toHaveText('for Example Animal Shelter');
  await expect(page.locator('#affil')).toHaveText('Independent tool. Not affiliated with or endorsed by Example Animal Shelter.');
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.band')).backgroundColor)).not.toBe('rgb(11, 95, 165)');

  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  const notePrompt = calls.at(-1).prompt;
  expect(notePrompt).toContain('scribe for Example Animal Shelter');
  expect(notePrompt).toContain('<house_style>\nUse headings in capitals.');

  await page.locator('#open-settings').click();
  await page.locator('#brand-reset').click();
  await page.locator('#save-settings').click();
  expect(await page.evaluate(() => document.documentElement.style.getPropertyValue('--brand'))).toBe('');
  await expect(page.locator('#affil')).toBeVisible(); // name still set
  expect(errors).toEqual([]);
});

test('organisation colours work without Claude: swatches only, look-up explains why', async ({ page }) => {
  await openApp(page);
  await page.locator('#open-settings').click();
  await page.locator('#org-name').fill('Another Shelter');
  await page.locator('#brand-lookup').click();
  await expect(page.locator('#brand-status')).toContainText('needs Claude');
  await page.locator('#brand-primary').fill('#aa3300');
  await page.locator('#save-settings').click();
  await expect(page.locator('#brand-sub')).toHaveText('for Another Shelter');
  expect(await page.evaluate(() => document.documentElement.style.getPropertyValue('--brand').trim())).toMatch(/^#/);
});
