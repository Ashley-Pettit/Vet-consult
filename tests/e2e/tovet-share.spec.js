import { test, expect } from './test.js';
import { withKey, mockApi, openApp, textReply } from './helpers.js';

// A summary for the vet, with the short text message the app leads with.
const summary = {
  title: 'Summary for the vet: Willow, juvenile wombat',
  subtitle: '',
  sections: [
    { heading: 'Text to your vet', text: 'Hi, it’s the carer for Willow (juvenile wombat). Weight down 6.2 to 6.0 kg this week and loose droppings for two days. Could you see her this week?', items: [] },
    { heading: 'What’s been happening', text: 'Eating fewer pellets, still grazing. Scratching more again.', items: [] },
  ],
  due: [],
  check: [],
};

// Catch what the phone's share sheet would be given.
const catchShare = (page) => page.addInitScript(() => {
  window.__shared = [];
  navigator.share = async (data) => { window.__shared.push(data); };
  navigator.canShare = () => true;
});

async function makeSummary(page) {
  await withKey(page, { role: 'carer', mode: 'tovet' });
  await mockApi(page, { body: () => textReply(summary) });
  await catchShare(page);
  await openApp(page);
  await page.locator('#transcript').fill('For the vet. Willow, juvenile wombat, weight dropping, loose droppings.');
  await page.locator('#create').click();
  await expect(page.locator('#doc-title')).toHaveText(summary.title);
}
// Open the link on someone else's phone: a fresh browser with nothing saved.
async function openOnVetsPhone(browser, baseURL, url, routeShare) {
  const ctx = await browser.newContext({ baseURL });
  // Like every test here: nothing leaves this computer unless it's mocked.
  await ctx.route((u) => /^https?:$/.test(u.protocol) && u.host !== new URL(baseURL).host, (route) => route.abort('blockedbyclient'));
  const vet = await ctx.newPage();
  if (routeShare) await routeShare(vet);
  await vet.goto(url.replace(/^https?:\/\/[^/]+\/(?:[^#]*\/)?/, './'));
  return { ctx, vet };
}

test('Share with vet sends the message and a link; the link opens the summary on the vet’s phone (short link)', async ({ page, browser, baseURL }) => {
  const stored = {};
  const routeShare = (p) => p.route(/\/share(\/[A-Za-z0-9]+)?(\?.*)?$/, async (route) => {
    const req = route.request();
    const cors = { 'access-control-allow-origin': '*' };
    if (req.method() === 'POST') {
      stored.abcdEFGH2345 = JSON.parse(req.postData());
      return route.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify({ id: 'abcdEFGH2345', updated: 1, days: 90 }) });
    }
    return route.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify({ plan: stored.abcdEFGH2345, updated: 1 }) });
  });
  await routeShare(page);
  await makeSummary(page);
  // The obvious button, and the usual Share at the bottom.
  await expect(page.locator('#text-vet-send')).toHaveText('Share with vet');
  await expect(page.locator('#doc-copy')).toHaveText('Share');
  await page.locator('#text-vet-send').click();
  await expect.poll(() => page.evaluate(() => window.__shared.length)).toBe(1);
  const sent = await page.evaluate(() => window.__shared[0]);
  expect(sent.text).toContain('Weight down 6.2 to 6.0 kg');
  expect(sent.url).toMatch(/#s=abcdEFGH2345$/);
  expect(stored.abcdEFGH2345.kind).toBe('tovet');
  // On the vet's phone:
  const { ctx, vet } = await openOnVetsPhone(browser, baseURL, sent.url, (p) => p.route(/\/share\/abcdEFGH2345$/, (route) => route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ plan: stored.abcdEFGH2345, updated: 1 }) })));
  await expect(vet.locator('#view-doc')).toBeVisible();
  await expect(vet.locator('#doc-title')).toHaveText(summary.title);
  await expect(vet.locator('#doc')).toContainText('Scratching more again');
  await ctx.close();
});

test('with no connection to store it, the link carries the summary itself and still opens on the vet’s phone', async ({ page, browser, baseURL }) => {
  await makeSummary(page);
  await page.locator('#text-vet-send').click();
  await expect.poll(() => page.evaluate(() => window.__shared.length)).toBe(1);
  const sent = await page.evaluate(() => window.__shared[0]);
  expect(sent.text).toContain('Could you see her this week?');
  expect(sent.url).toMatch(/#p=/); // the summary travels inside the link
  const { ctx, vet } = await openOnVetsPhone(browser, baseURL, sent.url);
  await expect(vet.locator('#doc-title')).toHaveText(summary.title);
  await expect(vet.locator('#doc')).toContainText('Scratching more again');
  await ctx.close();
});

test('Share at the bottom offers the same options as a care plan: a link, PDF or Word, and text', async ({ page }) => {
  await makeSummary(page);
  await page.locator('#doc-copy').click();
  await expect(page.locator('#share-sheet')).toBeVisible();
  await expect(page.locator('#share-link')).toBeVisible();
  await expect(page.locator('#share-word')).toBeVisible();
});
