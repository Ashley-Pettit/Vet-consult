import { test, expect } from '@playwright/test';
import { withKey, mockApi, openApp, textReply } from './helpers.js';
import { EXAMPLE_CARER_PLAN } from '../../src/note.js';

test('intake starts the care plan alongside the record, and "Need advice right now?" opens it instantly', async ({ page }) => {
  await withKey(page, { role: 'carer', mode: 'intake' });
  const intake = {
    title: 'Intake record: bare-nosed wombat', subtitle: 'Case 26-04417',
    sections: [{ heading: 'Where it was found', text: 'Gravel pull-over, south side of the Bass Highway, east of the Kilcunda bridge.', items: [] }],
    due: [], check: [],
  };
  // Two calls start together: the record, and the care plan in the background.
  const calls = await mockApi(page, { body: (p) => (p.includes('just taken this animal in') ? textReply(EXAMPLE_CARER_PLAN) : textReply(intake)) });
  await openApp(page);
  await page.locator('#transcript').fill('Intake. Adult wombat, car strike, Kilcunda.');
  await page.locator('#create').click();
  await expect(page.locator('#doc-title')).toHaveText('Intake record: bare-nosed wombat');
  // The advice box sits at the bottom, after the record and the Word printout.
  const cta = page.locator('#advice-cta');
  await expect(cta).toBeVisible();
  const [docBox, ctaBox] = [await page.locator('#doc').boundingBox(), await cta.boundingBox()];
  expect(ctaBox.y).toBeGreaterThan(docBox.y + docBox.height);
  await page.locator('#advice-btn').click();
  await expect(page.locator('#view-care')).toBeVisible();
  await expect(page.locator('#care-sheet')).not.toContainText('Never give or do');
  await expect(page.locator('#care-sheet')).not.toContainText('reach a vet');
  expect(calls.length).toBe(2); // no extra call when the plan is opened
});

test('a reply that comes back unreadable is retried once, quietly', async ({ page }) => {
  await withKey(page, { role: 'carer', mode: 'log' });
  const good = { title: 'Oliver care log', subtitle: '', sections: [{ heading: 'Summary', text: 'Good day.', items: [] }], due: [], check: [] };
  let n = 0;
  const calls = await mockApi(page, { body: () => (n++ === 0 ? { content: [{ type: 'text', text: '{"title":"Oliver care log","sections":[{"heading":"Summ' }] } : textReply(good)) });
  await openApp(page);
  await page.locator('#transcript').fill('Oliver, good day.');
  await page.locator('#create').click();
  await expect(page.locator('#doc-title')).toHaveText('Oliver care log');
  expect(calls.length).toBe(2);
  expect(calls[1].prompt).toContain('your last reply could not be read');
});

test('MOP plan shows the disclaimer word for word, and copies it', async ({ page }) => {
  await page.addInitScript(() => { window.__shared = []; navigator.share = async (d) => { window.__shared.push(d); }; });
  await withKey(page, { role: 'carer', mode: 'mop' });
  const plan = {
    title: 'Care plan for the possum you found', subtitle: '',
    sections: [
      { heading: 'Text to send', text: 'Keep the possum in the box, warm, dark and quiet. Rescuer collects it at 8 am.', items: [] },
      { heading: 'Right now', text: '', items: ['Keep the box in a quiet room.'] },
    ],
    due: [], check: [],
  };
  await mockApi(page, { body: () => textReply(plan) });
  await openApp(page);
  await page.locator('#transcript').fill('MOP call. Possum in a shoe box.');
  await page.locator('#create').click();
  await expect(page.locator('#doc .ai-disclaimer')).toHaveText('This is an ai tool which can make mistakes. In doubt? Defer to an expert.');
  await page.locator('#doc-copy').click();
  await page.getByRole('button', { name: 'Share…' }).click();
  await expect.poll(() => page.evaluate(() => window.__shared.length)).toBe(1);
  expect(await page.evaluate(() => window.__shared[0].text)).toMatch(/This is an ai tool which can make mistakes\. In doubt\? Defer to an expert\.$/);
});
