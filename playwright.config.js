// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries:2,
  /* Run tests in files in parallel */
 timeout:30*1000,
  expect:{
    timeout:3000
  },



 
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  use: {

 browserName:'chromium',
 headless:true,
 screenshot: 'on',
 trace: 'on'
  },

 
});

