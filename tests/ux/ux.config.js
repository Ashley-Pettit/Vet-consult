import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  timeout: 60000,
  reporter: 'list',
  use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4173/', locale: 'en-AU', timezoneId: 'Australia/Brisbane' },
  webServer: { command: 'node scripts/serve.mjs dist 4173', url: 'http://localhost:4173/', reuseExistingServer: true, cwd: '../..' },
});
