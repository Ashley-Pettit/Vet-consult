import { test, expect } from '@playwright/test';
import { fakeSpeech, noSpeech, withKey, mockApi, watchErrors, openApp, DICTATION, apiReply, asVet } from './helpers.js';

// These tests cover the vet's clinical notes; the app opens on the carer tools by default.
test.beforeEach(async ({ page }) => asVet(page));

// The prompt goes as one or more text blocks (the first is cached), so read them as one piece.
const promptText = (call) => {
  const c = call.body.messages[0].content;
  return typeof c === 'string' ? c : c.map((b) => b.text || '').join('\n');
};

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

  test('tapping into the text box while listening stops the mic and lets you edit', async ({ page }) => {
    await fakeSpeech(page);
    await openApp(page);
    await page.locator('#mic').click();
    await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'true');
    await page.evaluate(() => window.__fakeSay('wombat with mange'));
    await expect(page.locator('#transcript')).toHaveValue('Wombat with mange');
    await page.locator('#transcript').click();
    await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#transcript')).toHaveJSProperty('readOnly', false);
    await expect(page.locator('#transcript')).toBeFocused();
    await page.keyboard.press('End');
    await page.keyboard.type(', left ear');
    await expect(page.locator('#transcript')).toHaveValue('Wombat with mange, left ear');
  });

  test('the Add more info box listens straight away; tapping into it stops the mic and keeps the words', async ({ page }) => {
    await fakeSpeech(page);
    await withKey(page);
    await mockApi(page);
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#view-note')).toBeVisible();
    await page.locator('#back').click(); // "Add more info"
    await expect(page.locator('#more')).toHaveAttribute('data-mic', 'listening');
    await page.evaluate(() => window.__fakeSay('weight 14 kilos'));
    await page.evaluate(() => window.__fakeSay('left ear crusty', { final: false }));
    await page.locator('#more-text').click();
    await expect(page.locator('#more')).toHaveAttribute('data-mic', 'idle');
    await expect(page.locator('#more-text')).toHaveValue(/weight 14 kilos.*left ear crusty/i);
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
    await page.locator('#mic').click();
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

  test('vet has four choices: care plan, clinical notes, rapid polish, and Advanced for media and witness statements', async ({ page }) => {
    await openApp(page);
    await expect(page.locator('#types')).toHaveCount(0);
    await expect(page.locator('#mode label:visible')).toHaveCount(3);
    await expect(page.locator('#adv-tab')).toBeVisible(); // media and witness statements sit under Advanced
    await expect(page.getByRole('radio', { name: 'Clinical notes' })).toBeChecked();
    await expect(page.getByRole('radio', { name: 'Care plan' })).not.toBeChecked();
  });
});

test.describe('creating a note', () => {
  test('the website uses the Animal Welfare Companion connection: no key needed, and the vet name is added', async ({ page }) => {
    await fakeSpeech(page);
    const calls = await mockApi(page);
    await openApp(page);
    await page.locator('#open-settings').click();
    await expect(page.locator('#conn-status')).toContainText('Connected: Animal Welfare Companion connection');
    await expect(page.locator('#key-field')).toBeHidden(); // no personal key needed
    await page.locator('#clinician').fill('Dr Sam Lee');
    await page.locator('#save-settings').click();
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#view-note')).toBeVisible();
    expect(calls).toHaveLength(1);
    expect(calls[0].headers['x-api-key']).toBeUndefined(); // the key lives on Cloudflare, never in the browser
    expect(promptText(calls[0])).toContain('Dr Sam Lee');
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
    expect(promptText(calls[0])).toContain('Work out from the dictation which kind of record this is');
    expect(calls[0].body.model).toBe('claude-sonnet-5-5');

    await expect(page.locator('#note-title')).toHaveText('Shelter intake exam');
    await expect(page.locator('#checks')).toBeVisible();
    // Claude's 2 checks plus 1 worked out on the device: a high temp for a dog.
    await expect(page.locator('#check-list > li')).toHaveCount(3);
    await expect(page.locator('#check-list .tag')).toHaveCount(1);
    await expect(page.locator('.pname strong')).toHaveText('Rusty');
    await expect(page.locator('#note')).toContainText('39.4 °C');
    await expect(page.locator('#note .meds li')).toHaveCount(3);
    // Gaps aren't shown in the note; they're in the optional "Ideally also include" list.
    await expect(page.locator('#note')).not.toContainText('Not recorded');
    await expect(page.locator('#gap-list')).toContainText('Vet name');

    const plain = await page.locator('#plain').inputValue();
    expect(plain).toMatch(/^SHELTER INTAKE EXAM - \d\d\/\d\d\/\d{4} \d\d:\d\d/);
    expect(plain).toContain('Dispensed:\n- Cephalexin 22 mg/kg PO BID x 7 days');

    // Edits to the text are what gets copied.
    await page.locator('#plain').fill(plain + '\nAddendum: owner called.');
    await page.locator('#copy').click();
    await expect(page.locator('#copy')).toHaveText('Copied ✓');
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('Addendum: owner called.');

    await expect(page.locator('#back')).toHaveText('Add more info');
    // The logo goes home, with the dictation kept; Start over clears it with undo.
    await page.locator('#home').click();
    await expect(page.locator('#view-record')).toBeVisible();
    await expect(page.locator('#transcript')).toHaveValue(DICTATION);
    await page.locator('#clear').click();
    await expect(page.locator('#transcript')).toHaveValue('');
    await page.locator('#toast-action').click();
    await expect(page.locator('#transcript')).toHaveValue(DICTATION);
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

  test('a refused connection shows a clear error and never asks for a key', async ({ page }) => {
    await mockApi(page, { status: 403, body: { error: { type: 'forbidden_origin' } } });
    await openApp(page);
    await page.locator('#transcript').fill(DICTATION);
    await page.locator('#create').click();
    await expect(page.locator('#banner')).toContainText('isn’t allowed to use Claude');
    await expect(page.locator('#settings')).toBeHidden();
    await expect(page.locator('#transcript')).toHaveValue(DICTATION);
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

  test('the wombat example fills the dictation and goes through the connection', async ({ page }) => {
    const calls = await mockApi(page);
    await openApp(page);
    await page.locator('#load-example').click();
    await expect(page.locator('#transcript')).toHaveValue(/wombat/i);
    await page.locator('#create').click();
    await expect(page.locator('#view-note')).toBeVisible();
    expect(calls).toHaveLength(1);
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
    expect(promptText(calls[0])).toContain('cephalexin');
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
  test('clear saved data removes settings and keeps the connection', async ({ page }) => {
    await withKey(page, { clinician: 'Dr A' });
    await openApp(page);
    await page.locator('#open-settings').click();
    await expect(page.locator('#clinician')).toHaveValue('Dr A');
    await page.locator('#forget').click();
    await expect(page.locator('#conn-status')).toContainText('Connected');
    const stored = await page.evaluate(() => localStorage.getItem('css.settings'));
    expect(stored).toBeNull();
  });


  test('saved settings stay on this device under Animal Welfare Companion’s own name', async ({ page }) => {
    await openApp(page);
    await page.locator('#open-settings').click();
    await page.locator('#clinician').fill('Dr Temp');
    await page.locator('#save-settings').click();
    await expect(page.locator('#toast-text')).toContainText(/saved/i);
    const local = await page.evaluate(() => localStorage.getItem('css.settings'));
    expect(local).toContain('Dr Temp');
    expect(await page.evaluate(() => localStorage.getItem('vcs.settings'))).toBeNull(); // Consult Scribe's are separate
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
