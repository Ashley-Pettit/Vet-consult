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
  await mergeSettings(page, { rememberKey: true, apiKey: 'sk-ant-test', ...extra });
}

/** Merge into saved settings before the app loads (keeps anything an earlier helper set). */
export async function mergeSettings(page, extra) {
  await page.addInitScript({
    content: `try { const s = JSON.parse(localStorage.getItem('css.settings') || '{}'); localStorage.setItem('css.settings', JSON.stringify(Object.assign(s, ${JSON.stringify(extra)}))); } catch (e) {}`,
  });
}

/** Open the app as a vet on clinical notes (the carer tools are the default). */
export async function asVet(page) {
  await mergeSettings(page, { role: 'vet', mode: 'vet' });
}

const textOf = (content) => (typeof content === 'string' ? content : content.filter((b) => b.type === 'text').map((b) => b.text).join(''));

/**
 * Mock the Anthropic API. `body` may be a function of the prompt text, so one mock can answer
 * note, revision and care sheet requests differently. Returns the list of requests seen.
 */
export async function mockApi(page, { status = 200, body = apiReply(), delayMs = 0 } = {}) {
  const calls = [];
  // The app talks to the Care Scribe connection on Cloudflare (or straight to Anthropic with a personal key).
  await page.route(/^https:\/\/(api\.anthropic\.com\/v1\/messages|care-scribe-proxy\.ashley-98e\.workers\.dev\/?)$/, async (route) => {
    const req = JSON.parse(route.request().postData() || '{}');
    const prompt = req.messages ? textOf(req.messages[0].content) : '';
    calls.push({ headers: route.request().headers(), body: req, prompt });
    if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
    const reply = typeof body === 'function' ? body(prompt, req) : body;
    await route.fulfill({
      status,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify(reply),
    }).catch(() => {});
  });
  return calls;
}

export const textReply = (obj) => ({ content: [{ type: 'text', text: JSON.stringify(obj) }], stop_reason: 'end_turn' });

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
