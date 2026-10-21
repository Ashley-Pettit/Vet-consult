import { test, expect } from '@playwright/test';
import { fakeSpeech, noSpeech, withKey, mockApi, watchErrors, openApp, DICTATION, apiReply } from './helpers.js';

test.describe('dictation', () => {
  test('mic starts, captures speech, and stops', async ({ page }) => {
    const errors = watchErrors(page);
    await fakeSpeech(page);
    await openApp(page);
    const mic = page.locator('#mic');
    await expect(mic).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#create')).toBeDisabled();

    await mic.click();
    await expect(mic).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#mic-status')).toHaveText(/Listening/);
    await expect(page.locator('#timer')).toBeVisible();
    await expect(page.locator('#create')).toBeDisabled(); // nothing dictated yet

    await page.evaluate(() => window.__fakeSay('this is rusty full stop temp 39.4', { final: false }));
    await expect(page.locator('#interim')).toHaveText(/this is rusty/);
    await page.evaluate(() => window.__fakeSay('this is rusty full stop temp 39.4'));
    await page.evaluate(() => window.__fakeSay('heart rate 120'));
    await expect(page.locator('#transcript')).toHaveValue('This is rusty. Temp 39.4 heart rate 120');
    await expect(page.locator('#transcript')).toHaveJSProperty('readOnly', true);

    // Browser ends recognition on its own: app keeps listening.
    await page.evaluate(() => window.__fakeEnd());
    await expect(mic).toHaveAttribute('aria-pressed', 'true');

    await mic.click();
    await expect(mic).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#mic-status')).toHaveText(/add more/);
    await expect(page.locator('#create')).toBeEnabled();
    await expect(page.locator('#transcript')).toHaveJSProperty('readOnly', false);
    expect(errors).toEqual([]);
  });

  test('blocked microphone explains how to fix it', async ({ page }) => {
    await fakeSpeech(page, { denied: true });
    await openApp(page);
    await page.locator('#mic').click();
    await expect(page.locator('#banner')).toContainText('Microphone access is blocked');
    // Falls straight back to the keyboard's own voice typing.
    await expect(page.locator('#kb-coach')).toBeVisible();
    await expect(page.locator('#transcript')).toBeFocused();
  });

  test('browsers without speech fall back to keyboard dictation', async ({ page }) => {
    await noSpeech(page);
    await openApp(page);
    expect(await page.evaluate(() => window.__scribe.voice)).toBe('keyboard');
    await page.locator('#mic').click();
    await expect(page.locator('#kb-coach')).toBeVisible();
    await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#transcript')).toBeFocused();
    await page.keyboard.type('dictated by the keyboard');
    // On a phone the mic is tucked away while typing; Done closes voice typing everywhere.
    await page.locator('#kb-done').click();
    await expect(page.locator('#kb-coach')).toBeHidden();
    await expect(page.locator('#transcript')).toHaveValue('dictated by the keyboard');
  });

  test('draft survives a reload; start over can be undone', async ({ page }) => {
    await fakeSpeech(page);
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.reload();
    await expect(page.locator('#transcript')).toHaveValue(DICTATION);
    await page.locator('#clear').click();
    await expect(page.locator('#transcript')).toHaveValue('');
    await page.locator('#toast-action').click();
    await expect(page.locator('#transcript')).toHaveValue(DICTATION);
  });

  test('no note type buttons: one choice between clinical notes and a carer plan', async ({ page }) => {
    await openApp(page);
    await expect(page.locator('#types')).toHaveCount(0);
    await expect(page.locator('#batch')).toHaveCount(0);
    await expect(page.getByRole('radio', { name: 'Clinical notes' })).toBeChecked();
    await expect(page.getByRole('radio', { name: 'Carer plan' })).not.toBeChecked();
    await expect(page.locator('input[name="mode"]')).toHaveCount(4);
  });
});

test.describe('creating a note', () => {
  test('public demo never asks for a key; an optional key still works', async ({ page }) => {
    await fakeSpeech(page);
    const calls = await mockApi(page);
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#banner')).toContainText('public demo');
    await expect(page.locator('#settings')).toBeHidden();
    expect(calls).toHaveLength(0);
    await page.locator('#open-settings').click();
    const dlg = page.locator('#settings');
    await expect(dlg).toBeVisible();
    await expect(page.locator('#conn-status')).toContainText('Public demo');
    await expect(page.locator('#api-key')).toBeHidden(); // tucked away under Advanced
    await page.locator('#key-field summary').click();
    await page.locator('#api-key').fill('sk-ant-abc');
    await page.locator('#clinician').fill('Dr Sam Lee');
    await page.locator('#remember-key').check();
    await page.locator('#save-settings').click();
    await expect(dlg).toBeHidden();
    await page.locator('#create').click();
    await expect(page.locator('#view-note')).toBeVisible();
    expect(calls).toHaveLength(1);
    expect(calls[0].headers['x-api-key']).toBe('sk-ant-abc');
    expect(calls[0].body.messages[0].content).toContain('Dr Sam Lee');
    // Clinician from settings fills the gap the model left.
    await expect(page.locator('#note')).toContainText('Dr Sam Lee');
  });

  test('full flow renders the note, checks and copy text', async ({ page, context, browserName }) => {
    const errors = watchErrors(page);
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await withKey(page);
    const calls = await mockApi(page, { delayMs: 1500 });
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#view-working')).toBeVisible();
    await expect(page.locator('#view-note')).toBeVisible();
    expect(calls[0].body.messages[0].content).toContain('Work out from the dictation which kind of record this is');
    expect(calls[0].body.model).toBe('claude-sonnet-5-5');

    await expect(page.locator('#note-title')).toHaveText('Shelter intake exam');
    await expect(page.locator('#checks')).toBeVisible();
    // Claude's 2 checks plus 1 worked out on the device: a high temp for a dog.
    await expect(page.locator('#check-list > li')).toHaveCount(3);
    await expect(page.locator('#check-list .tag')).toHaveCount(1);
    await expect(page.locator('.pname strong')).toHaveText('Rusty');
    await expect(page.locator('#note')).toContainText('39.4 °C');
    await expect(page.locator('#note .meds li')).toHaveCount(3);
    await expect(page.locator('#note')).toContainText('Not recorded'); // clinician gap

    const plain = await page.locator('#plain').inputValue();
    expect(plain).toMatch(/^SHELTER INTAKE EXAM - \d\d\/\d\d\/\d{4} \d\d:\d\d/);
    expect(plain).toContain('- Rx: Cephalexin 22 mg/kg PO BID x 7 days');

    // Edits to the text are what gets copied.
    await page.locator('#plain').fill(plain + '\nAddendum: owner called.');
    await page.locator('#copy').click();
    await expect(page.locator('#copy')).toHaveText('Copied ✓');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('Addendum: owner called.');

    // Back keeps the dictation; new consult clears it with undo.
    await page.locator('#back').click();
    await expect(page.locator('#transcript')).toHaveValue(DICTATION);
    await page.locator('#create').click();
    await page.locator('#new').click();
    await expect(page.locator('#transcript')).toHaveValue('');
    await page.locator('#toast-action').click();
    await expect(page.locator('#view-note')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('stop cancels and keeps the dictation', async ({ page }) => {
    await withKey(page);
    await mockApi(page, { delayMs: 5000 });
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#view-working')).toBeVisible();
    await page.locator('#stop').click();
    await expect(page.locator('#view-record')).toBeVisible();
    await expect(page.locator('#transcript')).toHaveValue(DICTATION);
    await expect(page.locator('#toast-text')).toContainText('Stopped');
  });

  test('rejected key shows a clear error and opens settings', async ({ page }) => {
    await withKey(page);
    await mockApi(page, { status: 401, body: { type: 'error', error: { type: 'authentication_error' } } });
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#banner')).toContainText('API key was rejected');
    await expect(page.locator('#settings')).toBeVisible();
  });

  test('overloaded API shows a retry message', async ({ page }) => {
    await withKey(page);
    await mockApi(page, { status: 529, body: { type: 'error' } });
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#banner')).toContainText('overloaded');
    await expect(page.locator('#create')).toBeEnabled();
  });

  test('garbled model reply is handled', async ({ page }) => {
    await withKey(page);
    await mockApi(page, { body: { content: [{ type: 'text', text: 'Sorry, I cannot.' }] } });
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#banner')).toContainText('unexpected format');
  });

  test('model output is shown as text, never as HTML', async ({ page }) => {
    await withKey(page);
    const evil = { patient: { name: '<img src=x onerror="window.__pwned=1">' }, subjective: '<b>bold</b>', check: [] };
    await mockApi(page, { body: apiReply(evil) });
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#view-note')).toBeVisible();
    await expect(page.locator('.pname strong')).toHaveText('<img src=x onerror="window.__pwned=1">');
    expect(await page.evaluate(() => window.__pwned)).toBeUndefined();
    await expect(page.locator('#note img')).toHaveCount(0);
  });

  test('short dictation still goes straight to Claude', async ({ page }) => {
    await withKey(page);
    const calls = await mockApi(page);
    await openApp(page);
    await page.locator('#transcript').fill('dog fine');
    await page.locator('#create').click();
    await expect(page.locator('#view-note')).toBeVisible();
    expect(calls).toHaveLength(1);
  });

  test('the example works with no connection and is labelled as an example', async ({ page }) => {
    const calls = await mockApi(page);
    await openApp(page);
    await page.locator('#load-example').click();
    await page.locator('#create').click();
    await expect(page.locator('#view-note')).toBeVisible();
    await expect(page.locator('#note-banner')).toContainText('example note');
    await expect(page.locator('.pname strong')).toHaveText('Rusty');
    expect(calls).toHaveLength(0);
    await page.locator('#back').click();
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#banner')).toContainText('public demo');
  });

  test('create note while still listening keeps the last words', async ({ page }) => {
    await fakeSpeech(page);
    await withKey(page);
    const calls = await mockApi(page);
    await openApp(page);
    await page.locator('#mic').click();
    await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'true');
    await page.evaluate(() => window.__fakeSay('this is rusty kelpie cross temp 39.4 plan cephalexin'));
    await expect(page.locator('#create')).toBeEnabled();
    await page.locator('#create').click();
    await expect(page.locator('#view-note')).toBeVisible();
    await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'false');
    expect(calls[0].body.messages[0].content).toContain('cephalexin');
  });

  test('double clicking create sends one request', async ({ page }) => {
    await withKey(page);
    const calls = await mockApi(page, { delayMs: 400 });
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').dblclick();
    await page.locator('#transcript').press('Control+Enter').catch(() => {});
    await expect(page.locator('#view-note')).toBeVisible();
    expect(calls).toHaveLength(1);
  });

  test('start over while listening discards late words', async ({ page }) => {
    await fakeSpeech(page);
    await openApp(page);
    await page.locator('#mic').click();
    await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'true');
    await page.evaluate(() => window.__fakeSay('first words'));
    await page.locator('#clear').click();
    await page.evaluate(() => window.__fakeSay('late words'));
    await expect(page.locator('#transcript')).toHaveValue('');
    await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'false');
  });

  test('ctrl+enter creates the note', async ({ page }) => {
    await withKey(page);
    await mockApi(page);
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#transcript').press('Control+Enter');
    await expect(page.locator('#view-note')).toBeVisible();
  });
});

test.describe('settings', () => {
  test('clear saved data removes the key', async ({ page }) => {
    await withKey(page, { clinician: 'Dr A' });
    await openApp(page);
    await page.locator('#open-settings').click();
    await expect(page.locator('#conn-status')).toContainText('Connected');
    await expect(page.locator('#clinician')).toHaveValue('Dr A');
    await page.locator('#forget').click();
    await expect(page.locator('#conn-status')).toContainText('Public demo');
    const stored = await page.evaluate(() => localStorage.getItem('vcs.settings'));
    expect(stored).toBeNull();
  });

  test('a key not marked remember is kept only for the session', async ({ page }) => {
    await openApp(page);
    await page.locator('#open-settings').click();
    await page.locator('#key-field summary').click();
    await page.locator('#api-key').fill('sk-ant-temp');
    await page.locator('#save-settings').click();
    await expect(page.locator('#toast-text')).toContainText(/saved/i);
    const local = await page.evaluate(() => localStorage.getItem('vcs.settings'));
    expect(local).not.toContain('sk-ant-temp');
    const session = await page.evaluate(() => sessionStorage.getItem('vcs.key'));
    expect(session).toContain('sk-ant-temp');
  });

  test('pressing Enter in a settings field saves', async ({ page }) => {
    await openApp(page);
    await page.locator('#open-settings').click();
    await page.locator('#clinician').fill('Dr Enter');
    await page.locator('#clinician').press('Enter');
    await expect(page.locator('#settings')).toBeHidden();
    await page.locator('#open-settings').click();
    await expect(page.locator('#clinician')).toHaveValue('Dr Enter');
  });

  test('the close button closes without saving', async ({ page }) => {
    await openApp(page);
    await page.locator('#open-settings').click();
    await page.locator('#clinician').fill('Discard me');
    await page.locator('#close-settings').click();
    await expect(page.locator('#settings')).toBeHidden();
    await page.locator('#open-settings').click();
    await expect(page.locator('#clinician')).toHaveValue('');
  });

  test('escape closes settings without saving', async ({ page }) => {
    await openApp(page);
    await page.locator('#open-settings').click();
    await page.locator('#clinician').fill('Nobody');
    await page.keyboard.press('Escape');
    await expect(page.locator('#settings')).toBeHidden();
    await page.locator('#open-settings').click();
    await expect(page.locator('#clinician')).toHaveValue('');
  });
});
