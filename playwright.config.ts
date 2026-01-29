import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['html', { open: 'always' }]],
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
