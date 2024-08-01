// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries:1,
  workers:3,
  /* Run tests in files in parallel */
  timeout: 60 * 1000,
  expect: {
    timeout: 6000
  },




  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ...devices['iPhone 11'],
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure',
        screenshot: 'on',
        trace: 'on',
       // viewport: { width: 720, height: 720 },

      }

    }


  ]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */



});

