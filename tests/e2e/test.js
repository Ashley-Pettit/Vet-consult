import { test as base, expect } from '@playwright/test';

// Tests never reach Claude or the live connection. Anything leaving this computer is blocked unless the test mocks it
// (a test's own page.route, such as mockApi, runs first). Any attempt to reach Claude fails the test.
const AI = /^https:\/\/(api\.anthropic\.com\/v1\/messages|care-scribe-proxy\.ashley-98e\.workers\.dev\/?$)/;
export const test = base.extend({
  context: async ({ context, baseURL }, use) => {
    const home = new URL(baseURL).host;
    const aiCalls = [];
    await context.route(
      (url) => /^https?:$/.test(url.protocol) && url.host !== home,
      (route) => {
        if (AI.test(route.request().url())) aiCalls.push(route.request().url());
        return route.abort('blockedbyclient');
      },
    );
    await use(context);
    expect(aiCalls, 'a test tried to make a real AI call; mock it with mockApi').toEqual([]);
  },
});
export { expect };
