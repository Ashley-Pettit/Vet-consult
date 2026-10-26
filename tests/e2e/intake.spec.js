import { test, expect } from './test.js';
import { withKey, mockApi, openApp, textReply } from './helpers.js';
import { EXAMPLE_CARER_PLAN, aiNoteFor } from '../../src/note.js';

test('a reply that comes back unreadable is retried once, quietly', async ({ page }) => {
  // Intake records and care logs are gone (October 2026); the summary for the vet uses the same reply handling.
  await withKey(page, { role: 'carer', mode: 'tovet' });
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
  await expect(page.locator('#doc .ai-disclaimer')).toHaveText(aiNoteFor('Care plan for the possum you found'));
  await page.locator('#doc-copy').click();
  await page.getByRole('button', { name: 'Share as text' }).click();
  await expect.poll(() => page.evaluate(() => window.__shared.length)).toBe(1);
  expect(await page.evaluate(() => window.__shared[0].text)).toContain(aiNoteFor('Care plan for the possum you found'));
});
