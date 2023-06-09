const { defineConfig } = require("cypress");
const fs = require('fs')
const xlsx = require('xlsx');
const path = require('path')
const cucumber = require('cypress-cucumber-preprocessor').default;
module.exports = defineConfig({
  projectId: "99m3w8",
  chromeWebSecurity: false,
  numTestsKeptInMemory: 1,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    overwrite: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportFilename: "[status]-[datetime]-[name]-report",
    timestamp: "longDate"

  },
  // browsers: [
  //   {
  //   name: 'chrome',
  //   family: 'chromium',
  //   channel: 'stable',
  //   displayName: 'Chrome',
  //   version: '112.0.5615.49',
  //   path: 'C:\Program Files\Google\Chrome\Application\chrome.exe',
  //   minSupportedVersion: 64,
  //   majorVersion: '112',
  //   }],
  //  reporterOptions: {
  //     reportDir: "cypress/results",
  //     reportFilename:"report",
  //     quite: true,
  //     overwrite: true,
  //     html: true,
  //     json: true,
  //     showPassed: false,
  //     showFailed: false
  //  },
  env: {
    baseUrl: 'https://www.programsbuzz.com',
    staging: '/login',
    products_url: '/products',
  },
  e2e: {
    
    // specPattern: "**/*.feature",
    baseUrl: 'https://demo.nopcommerce.com/login?returnUrl=%2F',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('file:preprocessor', cucumber())
      // readFile
      on('task', {
        parseXlsx({ file, sheet }) {
          return new Promise((resolve, reject) => {
            try {
              const buf = fs.readFileSync(file);
              const workbook = xlsx.read(buf, { type: 'buffer' });
              const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
              resolve(rows);
            } catch (e) {
              reject(e);
            }
          })
        } 
      })
      // return {
      //   browsers: config.browsers.filter(
      //     (b) => b.family === 'chromium' && b.name !== 'chrome'
      //   ),
      // }
    }
  },
  // defaultCommandTimeout: 8000,
});

