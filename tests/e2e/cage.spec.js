import { test, expect } from './test.js';
import { withKey, mockApi, openApp, textReply, mergeSettings } from './helpers.js';

// A 1×1 PNG: enough to go through the photo and thumbnail steps.
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');

const chart = {
  title: 'Possum 24-118: common brushtail possum',
  subtitle: 'In 9 November 2026',
  sections: [
    { heading: 'Patient', items: ['ID: 24-118', 'Species: Common brushtail possum', 'Sex: Not recorded', 'Age class: Adult', 'Admission weight: 2.1 kg', 'Found at: Cowes Rd, Inverloch', 'Vet: Dr A'] },
    { heading: "Why it's here", text: 'Hit by a car; sore left hind leg.', items: [] },
    { heading: 'Problem list', items: ['Suspected left femur fracture'] },
  ],
  chart: {
    cage: 'ICU 3',
    status: 'Intensive care',
    alerts: ['Bites and scratches: thick gloves and a towel'],
    meds: [{ drug: 'Meloxicam 5 mg/mL', dose: '0.2 mg/kg', route: 'SC', how_often: 'Once a day', times: '8 am', until: '5 days' }],
    feeds: [{ what: 'Native browse and fruit', amount: '', how: 'Bowl', how_often: 'Evening', times: '6 pm' }],
    water: 'Bowl, changed daily',
    housing: ['Hospital cage with a hide box'],
    warmth: '',
    weigh: 'Every day before feeding',
    monitor: ['Urine and faeces', 'Weight-bearing on left hind'],
    rechecks: ['X-ray tomorrow'],
    release: ['Climbing well on all four legs'],
    target_weight: '',
  },
  due: [],
  check: ['Where was it found?'],
};

// The connection's chart store, kept in memory: POST makes a chart with an edit key, GET reads it, PUT needs the key.
function chartStore() {
  const db = {};
  return {
    db,
    async route(page) {
      await page.route(/\/share(\/|\?|$)/, async (route) => {
        const req = route.request();
        const h = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST, PUT' };
        const url = new URL(req.url());
        const id = url.pathname.split('/share/')[1];
        if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: h });
        if (req.method() === 'POST') {
          db.abcdEFGH2345 = { plan: JSON.parse(req.postData()), key: 'k'.repeat(24), updated: 1 };
          return route.fulfill({ status: 200, headers: h, contentType: 'application/json', body: JSON.stringify({ id: 'abcdEFGH2345', key: 'k'.repeat(24), updated: 1, days: 90 }) });
        }
        const rec = db[id];
        if (!rec) return route.fulfill({ status: 404, headers: h, contentType: 'application/json', body: '{}' });
        if (req.method() === 'GET') return route.fulfill({ status: 200, headers: h, contentType: 'application/json', body: JSON.stringify({ plan: rec.plan, updated: rec.updated }) });
        if (req.headers()['x-edit-key'] !== rec.key) return route.fulfill({ status: 403, headers: h, contentType: 'application/json', body: '{}' });
        rec.plan = JSON.parse(req.postData());
        rec.updated++;
        return route.fulfill({ status: 200, headers: h, contentType: 'application/json', body: JSON.stringify({ id, updated: rec.updated }) });
      });
    },
  };
}

test('vet intake: a photo and a few words make the chart and a QR code for the cage; scanning it opens the chart, and staff add to it', async ({ page, browser, baseURL }) => {
  const store = chartStore();
  await withKey(page, { role: 'vet', mode: 'cage' });
  const calls = await mockApi(page, { body: () => textReply(chart) });
  await store.route(page);
  await openApp(page);
  await expect(page.getByRole('radio', { name: 'Intake' })).toBeChecked();
  await expect(page.locator('#create')).toHaveText('Create intake chart');
  await page.locator('#add-gallery').setInputFiles({ name: 'possum.png', mimeType: 'image/png', buffer: PNG });
  await page.locator('#crop-dlg').getByRole('button', { name: 'Use whole photo' }).click(); // each photo offers a crop first
  await expect(page.locator('#photo-list .thumb')).toHaveCount(1);
  await page.locator('#transcript').fill('Brushtail possum 24-118, hit by car, 2.1 kg, sore left hind.');
  await page.locator('#create').click();
  await expect(page.locator('#doc-title')).toHaveText(chart.title);
  expect(calls[0].prompt).toContain('cage chart that stays with the animal');

  // The QR code and the photo, stored with the connection (photo small, no edit key inside the chart).
  const box = page.locator('#cage-box');
  await expect(box.locator('#cage-qr svg')).toBeVisible();
  await expect(box.locator('#cage-photo')).toBeVisible();
  const stored = store.db.abcdEFGH2345.plan;
  expect(stored.kind).toBe('cage');
  expect(stored.photo).toMatch(/^data:image\/jpeg;base64,/);
  expect(JSON.stringify(stored)).not.toContain('k'.repeat(24));
  await expect(box.getByRole('button', { name: 'Print cage chart' })).toBeVisible();

  // What staff read first: status, cage, alerts, then the treatment sheet, feeding, housing, monitoring and release.
  await expect(box.locator('.cage-chips')).toContainText('Intensive care');
  await expect(box.locator('.cage-chips')).toContainText('Cage ICU 3');
  await expect(box.locator('.cage-alerts')).toContainText('Bites and scratches');
  await expect(box.locator('.cage-meds-sheet')).toContainText('Meloxicam 5 mg/mL 0.2 mg/kg');
  await expect(box.locator('.cage-meds-sheet')).toContainText('Not given yet');
  for (const t of ['Feeding', 'Housing', 'Monitoring', 'Rechecks and procedures', 'Release']) await expect(box.locator('.cage-sec h3', { hasText: t })).toBeVisible();

  // The vet records the first round: weight, ate, the medicine ticked as given, and a note.
  await box.getByLabel('Weight (g)').fill('2050');
  await box.getByLabel('Ate', { exact: true }).selectOption('Most');
  await box.getByLabel('Meloxicam 5 mg/mL 0.2 mg/kg SC').check();
  await box.getByLabel('Notes', { exact: true }).fill('Quiet but alert.');
  await box.getByPlaceholder('Your initials').fill('Dr A');
  await box.getByRole('button', { name: 'Add', exact: true }).click();
  await expect(box.locator('#cage-log li')).toHaveCount(1);
  await expect(box.locator('#cage-log')).toContainText('2.05 kg · Ate: Most');
  await expect(box.locator('#cage-log')).toContainText('Given: Meloxicam 5 mg/mL 0.2 mg/kg SC');
  await expect(box.locator('.cage-meds-sheet')).toContainText('by Dr A');
  await expect(box.locator('#cage-trend')).toContainText('2.1 kg at admission, 2.05 kg now (-2.4%)');

  // A carer scans the QR on the cage with their own phone: the chart, the photo and what's been added, ready to add to.
  const ctx = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 } });
  await ctx.route((u) => /^https?:$/.test(u.protocol) && u.host !== new URL(baseURL).host && !/\/share/.test(u.pathname), (route) => route.abort('blockedbyclient'));
  const carer = await ctx.newPage();
  await store.route(carer);
  await carer.goto(`./#c=abcdEFGH2345.${'k'.repeat(24)}`);
  await expect(carer.locator('#doc-title')).toHaveText(chart.title);
  await expect(carer.locator('#cage-log')).toContainText('Quiet but alert.');
  await expect(carer.locator('#cage-photo')).toBeVisible();
  await expect(carer.locator('.cage-alerts')).toContainText('Bites and scratches');
  await carer.getByLabel('Urine', { exact: true }).selectOption('Yes');
  await carer.getByLabel('Status', { exact: true }).selectOption('Pre-release');
  await carer.getByLabel('Notes', { exact: true }).fill('Climbing in the aviary.');
  await carer.getByRole('button', { name: 'Add', exact: true }).click();
  await expect(carer.locator('#cage-log li')).toHaveCount(2);
  await expect(carer.locator('#cage-log li').first()).toContainText('Climbing in the aviary.'); // newest first
  await expect(carer.locator('.cage-chips')).toContainText('Pre-release');
  expect(store.db.abcdEFGH2345.plan.log.map((e) => e.text)).toEqual(['Quiet but alert.', 'Climbing in the aviary.']);
  expect(store.db.abcdEFGH2345.plan.log[1].status).toBe('Pre-release');
  await ctx.close();
});

test('the printed cage chart has the header, photo, QR code, alerts, a 7-day treatment sheet and a blank daily record', async ({ page }) => {
  const store = chartStore();
  await withKey(page, { role: 'vet', mode: 'cage' });
  await mockApi(page, { body: () => textReply(chart) });
  await store.route(page);
  await page.addInitScript(() => { window.print = () => { window.__printed = document.getElementById('cage-print-card')?.innerHTML || ''; }; });
  await openApp(page);
  await page.locator('#add-gallery').setInputFiles({ name: 'possum.png', mimeType: 'image/png', buffer: PNG });
  await page.locator('#crop-dlg').getByRole('button', { name: 'Use whole photo' }).click(); // each photo offers a crop first
  await expect(page.locator('#photo-list .thumb')).toHaveCount(1);
  await page.locator('#transcript').fill('Brushtail possum 24-118, hit by car.');
  await page.locator('#create').click();
  await expect(page.locator('#cage-qr svg')).toBeVisible();
  await page.getByRole('button', { name: 'Print cage chart' }).click();
  const printed = await page.evaluate(() => window.__printed);
  expect(printed).toContain(chart.title);
  expect(printed).toContain('<svg');
  expect(printed).toContain('<img');
  expect(printed).toContain('ALERTS');
  expect(printed).toContain('Bites and scratches');
  expect(printed).toContain('Treatment sheet');
  expect(printed).toContain('Meloxicam 5 mg/mL 0.2 mg/kg');
  expect(printed).toContain('Daily record');
  expect(printed).toContain('Cage ICU 3');
});

test('without a connection, the chart still shows and says the QR code couldn’t be made, with Try again', async ({ page }) => {
  await withKey(page, { role: 'vet', mode: 'cage' });
  await mockApi(page, { body: () => textReply(chart) });
  await page.route(/\/share(\/|\?|$)/, (route) => route.abort('internetdisconnected'));
  await openApp(page);
  await page.locator('#transcript').fill('Brushtail possum 24-118, hit by car.');
  await page.locator('#create').click();
  await expect(page.locator('#doc-title')).toHaveText(chart.title);
  await expect(page.locator('#cage-status')).toContainText('Couldn’t make the QR code');
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
  await expect(page.locator('#cage-add')).toBeHidden();
});

test('carers don’t see Intake; vets do', async ({ page }) => {
  await mergeSettings(page, { role: 'carer' });
  await openApp(page);
  await expect(page.getByRole('radio', { name: 'Intake', exact: true })).toBeHidden();
});
