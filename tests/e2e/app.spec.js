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
    await expect(page.locator('#create')).toBeDisabled(); // can't create while listening

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
    await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'false');
  });

  test('browsers without speech fall back to keyboard dictation', async ({ page }) => {
    await noSpeech(page);
    await openApp(page);
    await expect(page.locator('#mic-status')).toContainText('keyboard');
    await page.locator('#mic').click();
    await expect(page.locator('#banner')).toContainText('can’t take dictation');
    await expect(page.locator('#transcript')).toBeFocused();
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

  test('note type choice is remembered', async ({ page }) => {
    await openApp(page);
    await page.getByRole('radio', { name: 'Inspectorate' }).check();
    await page.reload();
    await expect(page.locator('input[value="inspectorate"]')).toBeChecked();
  });
});

test.describe('creating a note', () => {
  test('no connection opens settings, saving a key works', async ({ page }) => {
    await fakeSpeech(page);
    const calls = await mockApi(page);
    await openApp(page);
    await page.locator('#load-example').click();
    await page.locator('#create').click();
    const dlg = page.locator('#settings');
    await expect(dlg).toBeVisible();
    await expect(page.locator('#conn-status')).toContainText('Add an API key');
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
    const calls = await mockApi(page, { delayMs: 300 });
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.getByRole('radio', { name: 'Intake' }).check();
    await page.locator('#create').click();
    await expect(page.locator('#view-working')).toBeVisible();
    await expect(page.locator('#view-note')).toBeVisible();
    expect(calls[0].body.messages[0].content).toContain('shelter intake examination');
    expect(calls[0].body.model).toBe('claude-sonnet-5-5');

    await expect(page.locator('#note-title')).toHaveText('Intake consult');
    await expect(page.locator('#checks')).toBeVisible();
    await expect(page.locator('#check-list li')).toHaveCount(2);
    await expect(page.locator('.pname strong')).toHaveText('Rusty');
    await expect(page.locator('#note')).toContainText('39.4 °C');
    await expect(page.locator('#note .meds li')).toHaveCount(3);
    await expect(page.locator('#note')).toContainText('Not recorded'); // clinician gap

    const plain = await page.locator('#plain').inputValue();
    expect(plain).toMatch(/^INTAKE CONSULT - \d\d\/\d\d\/\d{4} \d\d:\d\d/);
    expect(plain).toContain('- Rx: Cephalexin 22 mg/kg PO BID x 7 days');

    // Edits to the text are what gets copied.
    await page.locator('summary').click();
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

  test('very short dictation is caught before calling Claude', async ({ page }) => {
    await withKey(page);
    const calls = await mockApi(page);
    await openApp(page);
    await page.locator('#transcript').fill('dog fine');
    await page.locator('#create').click();
    await expect(page.locator('#banner')).toContainText('quite short');
    expect(calls).toHaveLength(0);
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
    await expect(page.locator('#conn-status')).toContainText('Not connected');
    const stored = await page.evaluate(() => localStorage.getItem('vcs.settings'));
    expect(stored).toBeNull();
  });

  test('a key not marked remember is kept only for the session', async ({ page }) => {
    await openApp(page);
    await page.locator('#open-settings').click();
    await page.locator('#api-key').fill('sk-ant-temp');
    await page.locator('#save-settings').click();
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
