import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { fakeSpeech, withKey, mockApi, openApp, DICTATION } from './helpers.js';

const SHOTS = process.env.SHOTS_DIR || 'test-results/shots';

async function axe(page) {
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  return r.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}

for (const scheme of ['light', 'dark']) {
  test.describe(`${scheme} theme`, () => {
    test.use({ colorScheme: scheme });

    test('every screen passes axe and has no horizontal scroll', async ({ page }, info) => {
      test.setTimeout(90000);
      await fakeSpeech(page);
      await withKey(page);
      await mockApi(page, { delayMs: 800 });
      await openApp(page);
      const tag = `${info.project.name}-${scheme}`;
      const noHScroll = async () =>
        expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);

      expect(await axe(page)).toEqual([]);
      await noHScroll();
      await page.screenshot({ path: `${SHOTS}/${tag}-1-empty.png`, fullPage: true });

      await page.locator('#mic').click();
      await page.evaluate(() => window.__fakeSay('this is rusty kelpie cross stray temp 39.4 heart rate 120', { final: true }));
      await page.evaluate(() => window.__fakeSay('laceration on the left forelimb', { final: false }));
      await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'true');
      expect(await axe(page)).toEqual([]);
      await page.screenshot({ path: `${SHOTS}/${tag}-2-listening.png`, fullPage: true });
      await page.locator('#mic').click();
      await page.locator('#clear').click();
      await page.locator('#load-example').click();
      await page.locator('#create').click();
      await expect(page.locator('#view-working')).toBeVisible();
      expect(await axe(page)).toEqual([]);
      await page.screenshot({ path: `${SHOTS}/${tag}-3-working.png` });

      await expect(page.locator('#view-note')).toBeVisible();
      await page.waitForTimeout(150);
      expect(await axe(page)).toEqual([]);
      await noHScroll();
      await page.screenshot({ path: `${SHOTS}/${tag}-4-note.png`, fullPage: true });

      await page.locator('#open-settings').click();
      await expect(page.locator('#settings')).toBeVisible();
      expect(await axe(page)).toEqual([]);
      await page.screenshot({ path: `${SHOTS}/${tag}-5-settings.png` });
    });
  });
}

test('keyboard only: tab order reaches the mic, text box and create button', async ({ page }, info) => {
  test.skip(info.project.name === 'phone', 'keyboard flow is a desktop concern');
  await fakeSpeech(page);
  await withKey(page);
  await mockApi(page);
  await openApp(page);
  const order = [];
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    order.push(await page.evaluate(() => document.activeElement.id || document.activeElement.className || document.activeElement.tagName));
  }
  expect(order).toContain('mic');
  expect(order).toContain('transcript');
  await page.locator('#mic').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Space');
  await expect(page.locator('#mic')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#transcript').fill(DICTATION);
  await page.locator('#create').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#note-title')).toBeFocused();
});

test('touch targets are at least 44px', async ({ page }, info) => {
  test.skip(info.project.name !== 'phone', 'phone only');
  await openApp(page);
  for (const sel of ['#mic', '#open-settings', '#create', '#clear', '.types label']) {
    const boxes = await page.locator(sel).evaluateAll((els) => els.map((e) => e.getBoundingClientRect()).map((r) => [r.width, r.height]));
    for (const [w, h] of boxes) {
      expect(w, sel).toBeGreaterThanOrEqual(44);
      expect(h, sel).toBeGreaterThanOrEqual(36);
    }
  }
});

test('installable: manifest, icons and service worker are served', async ({ page, request }) => {
  await openApp(page);
  const manifest = await (await request.get('manifest.webmanifest')).json();
  expect(manifest.name).toBe('Care Scribe');
  for (const icon of manifest.icons) expect((await request.get(icon.src)).ok(), icon.src).toBeTruthy();
  const sw = await (await request.get('sw.js')).text();
  expect(sw).not.toContain('__VERSION__');
});
