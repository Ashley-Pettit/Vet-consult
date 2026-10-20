import { expect } from '@playwright/test';
import { installFakeSpeech } from '../fake-speech.js';
import { apiReply, SAMPLE_NOTE } from '../fixtures.js';

export { SAMPLE_NOTE, apiReply };

export async function fakeSpeech(page, opts = {}) {
  await page.addInitScript({ content: `(${installFakeSpeech.toString()})(window, ${JSON.stringify(opts)});` });
}

export async function noSpeech(page) {
  await page.addInitScript({ content: 'delete window.SpeechRecognition; delete window.webkitSpeechRecognition; window.SpeechRecognition = undefined; window.webkitSpeechRecognition = undefined;' });
}

/** Pre-save an API key so the app has a provider. */
export async function withKey(page, extra = {}) {
  await page.addInitScript({
    content: `try { localStorage.setItem('vcs.settings', ${JSON.stringify(JSON.stringify({ rememberKey: true, apiKey: 'sk-ant-test', ...extra }))}); } catch (e) {}`,
  });
}

/** Mock the Anthropic API. Returns the list of request bodies seen. */
export async function mockApi(page, { status = 200, body = apiReply(), delayMs = 0 } = {}) {
  const calls = [];
  await page.route('https://api.anthropic.com/v1/messages', async (route) => {
    calls.push({ headers: route.request().headers(), body: JSON.parse(route.request().postData() || '{}') });
    if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
    await route.fulfill({
      status,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify(body),
    }).catch(() => {});
  });
  return calls;
}

/** Collect console errors and uncaught exceptions. */
export function watchErrors(page) {
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/favicon|Failed to load resource/.test(m.text())) errors.push('console: ' + m.text());
  });
  return errors;
}

export async function openApp(page) {
  await page.goto('./');
  await expect(page.locator('#view-record')).toBeVisible();
}

export const DICTATION =
  'This is Rusty, kelpie cross, stray. Temp 39.4, heart rate 120. Laceration left forelimb. Plan cephalexin 22 mg per kg twice daily for 7 days.';
