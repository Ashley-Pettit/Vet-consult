import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { SAMPLE_NOTE, DICTATION, watchErrors } from './helpers.js';

// The single-file Claude artifact build, with a stand-in for Claude's runtime.
test('artifact build writes notes through the Claude runtime', async ({ page, baseURL }) => {
  const html = readFileSync('dist-artifact/care-scribe.html', 'utf8');
  const doc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>${html}</body></html>`;
  const url = new URL('__artifact', baseURL).href;
  await page.route(url, (r) => r.fulfill({ contentType: 'text/html', body: doc }));
  await page.addInitScript({
    content: `
      window.__prompts = [];
      const reply = ${JSON.stringify(JSON.stringify(SAMPLE_NOTE))};
      const sample = async (prompt, opts) => { window.__prompts.push(prompt); return { text: reply, truncated: false }; };
      window.claude = { use: async (n) => (n === 'sample' ? sample : null) };
      class Denied { start() { setTimeout(() => { this.onerror && this.onerror({ error: 'not-allowed' }); this.onend && this.onend(); }, 5); } stop() {} }
      window.SpeechRecognition = Denied; window.webkitSpeechRecognition = Denied;
    `,
  });
  const errors = watchErrors(page);
  await page.goto(url);
  await expect(page.locator('#view-record')).toBeVisible();
  // Inside Claude the mic hands over to the keyboard's voice typing straight away.
  expect(await page.evaluate(() => window.__scribe.voice)).toBe('keyboard');
  await page.locator('#mic').click();
  await expect(page.locator('#kb-coach')).toBeVisible();
  await expect(page.locator('#transcript')).toBeFocused();
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').click();
  await expect(page.locator('#view-note')).toBeVisible();
  await expect(page.locator('.pname strong')).toHaveText('Rusty');
  expect(await page.evaluate(() => window.__prompts.length)).toBe(1);
  expect(await page.evaluate(() => window.__scribe.provider)).toBe('claude');
  expect(errors).toEqual([]);
});
