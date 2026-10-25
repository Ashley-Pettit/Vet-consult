import { test, expect } from '@playwright/test';
import { fakeSpeech, withKey, mockApi, watchErrors, openApp, DICTATION, SAMPLE_NOTE, apiReply, textReply, asVet } from './helpers.js';
import { EXAMPLE_BATCH_NOTES, EXAMPLE_CARE_SHEET, EXAMPLE_CARER_PLAN } from '../../src/note.js';

// These tests cover the vet's clinical notes; the app opens on the carer tools by default.
test.beforeEach(async ({ page }) => asVet(page));

// One mock that answers each kind of request the way Claude would.
const smart = (prompt) => {
  if (prompt.includes('<check_items>')) {
    const answer = prompt.match(/<answer>([\s\S]*?)<\/answer>/)[1];
    return apiReply({ ...SAMPLE_NOTE, visit: { ...SAMPLE_NOTE.visit, clinician: answer }, check: [SAMPLE_NOTE.check[1]] });
  }
  if (prompt.includes('<comments>')) return textReply({ ...EXAMPLE_CARER_PLAN, sources: [...EXAMPLE_CARER_PLAN.sources, 'not-a-real-source'] });
  if (prompt.includes('based on the clinical note below')) return textReply(EXAMPLE_CARE_SHEET);
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
  await expect(page.locator('#review-open-sub')).toHaveText('3');
  await expect(page.locator('#check-list')).toContainText('high for a dog');

  // Prescriptions and reminders each show in full, with Copy top right.
  const rows = page.locator('.pms-part');
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(0).locator('.pms-full')).toContainText('Meloxicam 0.1 mg/kg PO SID x 5 days');
  await rows.nth(0).getByRole('button').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    // Bravecto was never said in the dictation, so the brand the reply added in brackets comes out.
    'Cephalexin 22 mg/kg PO BID x 7 days\nMeloxicam 0.1 mg/kg PO SID x 5 days\nFluralaner Per label PO Once',
  );
  await rows.nth(1).getByRole('button').click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/Recheck and suture removal in 10-14 days \(due \d\d\/\d\d\/\d{4}\)/);
  // Calculated totals never leak into what gets pasted.
  expect(await page.locator('#plain').inputValue()).not.toContain('312.4');
});

test('one tap opens every review question with the mic on; one call updates the notes', async ({ page }) => {
  const errors = watchErrors(page);
  await fakeSpeech(page);
  await withKey(page);
  const calls = await mockApi(page, { body: smart });
  await openApp(page);
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  // Straight to the notes to edit and copy: no formatted card on top.
  await expect(page.locator('#note')).toBeHidden();
  await expect(page.locator('#plain')).toBeVisible();
  await page.locator('#review-open').click();
  await expect(page.locator('#more')).toBeVisible();
  await expect(page.locator('#more-questions li').first()).toContainText('Clinician name?');
  await expect(page.locator('#more-mic')).toHaveAttribute('aria-pressed', 'true'); // listening straight away
  await page.evaluate(() => window.__fakeSay('doctor sam lee'));
  await expect(page.locator('#more-text')).toHaveValue(/sam lee/i);
  await page.locator('#more-go').click();
  await expect(page.locator('#toast-text')).toHaveText('Notes updated.');
  await expect(page.locator('#plain')).toHaveValue(/sam lee/i);
  await expect(page.locator('#check-list')).not.toContainText('Clinician name?');
  const fix = calls.find((c) => c.prompt.includes('<check_items>'));
  expect(fix.prompt).toContain('1. Clinician name?');
  expect(fix.body.model).toBe('claude-haiku-5-5'); // a quick call: no drugs or doses in the answer
  expect(errors).toEqual([]);
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
  await page.getByRole('button', { name: 'Copy as text' }).click();
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
  await page.locator('#add-gallery').setInputFiles([{ name: 'wound.png', mimeType: 'image/png', buffer: PNG }, { name: 'bcs.png', mimeType: 'image/png', buffer: PNG }]);
  // Each photo offers a crop first: crop the first, keep the second whole.
  await expect(page.locator('#crop-dlg')).toBeVisible();
  await page.locator('#crop-dlg').getByRole('button', { name: 'Crop' }).click();
  await page.locator('#crop-dlg').getByRole('button', { name: 'Use whole photo' }).click();
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

test('How it works: opens from the header and its buttons lead into the app', async ({ page }) => {
  await openApp(page);
  await page.locator('#open-about').click();
  await expect(page.locator('#view-about')).toBeVisible();
  await expect(page.locator('#view-about h1')).toBeFocused();
  await expect(page.locator('.feat')).toHaveCount(4);
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

test('carer plan for a carer: Victorian sources, vet only for escalation, species points woven in', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const errors = watchErrors(page);
  await withKey(page, { role: 'carer', mode: 'carer' });
  const calls = await mockApi(page, { body: () => textReply(EXAMPLE_CARE_SHEET) });
  await openApp(page);
  await expect(page.locator('#create')).toHaveText('Create care plan');
  await page.locator('#transcript').fill('Ringtail possum joey, 120 grams, cat attack, antibiotic 5 days.');
  await page.locator('#create').click();
  await expect(page.locator('#view-care')).toBeVisible();
  expect(calls).toHaveLength(1);
  expect(calls[0].prompt).toContain('ONLY an escalation contact');
  expect(calls[0].prompt).toContain('vic-release-requirements | vic |');
  expect(calls[0].prompt).toContain('work it into the section it belongs to');
  await expect(page.locator('.care-sec.watch li')).toHaveCount(4);
  await page.locator('#care-copy').click();
  await page.getByRole('button', { name: 'Copy as text' }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/^Caring for Rusty at home/);
  expect(errors).toEqual([]);
});

test('take photo opens the camera; gallery picks several; there is no video button', async ({ page }) => {
  await openApp(page);
  await expect(page.locator('#add-photo')).toHaveAttribute('capture', 'environment');
  await expect(page.locator('#add-gallery')).toHaveAttribute('multiple', '');
  await expect(page.locator('#add-video')).toHaveCount(0);
});


test('tapping the dictation box with the keyboard up shows the whole box above the keyboard; Create stays in the page', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phones only');
  await page.addInitScript(() => {
    const t = new EventTarget(); t.height = innerHeight; t.width = innerWidth; t.offsetTop = 0; t.offsetLeft = 0; t.scale = 1;
    Object.defineProperty(window, 'visualViewport', { get: () => t });
    window.__kb = (h) => { t.height = innerHeight - h; t.dispatchEvent(new Event('resize')); };
  });
  await openApp(page);
  await page.locator('#transcript').tap();
  await page.evaluate(() => window.__kb(300));
  await expect(page.locator('body')).toHaveAttribute('data-kb', 'open');
  await expect.poll(async () => page.evaluate(() => {
    const f = document.querySelector('#transcript').closest('.field').getBoundingClientRect();
    const t = document.querySelector('#transcript').getBoundingClientRect();
    return f.top >= 0 && t.bottom <= innerHeight - 300;
  })).toBe(true);
  // Create is an ordinary button under the box, not pinned above the keyboard.
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('#view-record .actions')).position)).toBe('static');
});

test('Create never covers the dictation box, and a long note scrolls inside the box with Create right under it', async ({ page }) => {
  await openApp(page);
  await page.locator('#transcript').fill('Ringtail joey, cat attack. '.repeat(40));
  const covered = () => page.evaluate(() => {
    const bar = document.querySelector('#view-record .actions').getBoundingClientRect();
    const t = document.querySelector('#transcript').getBoundingClientRect();
    return bar.top < t.bottom - 1 && bar.bottom > t.top + 1;
  });
  for (const y of [0, 150, 300, 600]) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(120);
    expect(await covered()).toBe(false);
  }
});

test('a photo shows Processing while it is shrunk on the phone', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => {
    const orig = HTMLCanvasElement.prototype.toBlob;
    HTMLCanvasElement.prototype.toBlob = function (cb, ...a) { setTimeout(() => orig.call(this, cb, ...a), 800); };
  });
  const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
  await page.locator('#add-gallery').setInputFiles({ name: 'big.png', mimeType: 'image/png', buffer: PNG });
  await expect(page.locator('.photo-busy')).toContainText('Processing photo');
  await expect(page.locator('#crop-dlg')).toBeVisible();
  await expect(page.locator('.photo-busy')).toHaveCount(0);
});

test('a mic that never starts falls back to keyboard voice typing instead of sitting on "One moment"', async ({ page }) => {
  test.setTimeout(30000);
  await page.addInitScript(() => {
    class Stuck { start() {} stop() {} abort() {} }
    window.SpeechRecognition = Stuck;
    window.webkitSpeechRecognition = Stuck;
  });
  await openApp(page);
  await page.locator('#mic').click();
  await expect(page.locator('#mic-status')).toContainText('One moment');
  await expect(page.locator('body')).toHaveAttribute('data-mic', 'keyboard', { timeout: 10000 });
  await expect(page.locator('#banner')).toContainText('mic didn’t start');
});
