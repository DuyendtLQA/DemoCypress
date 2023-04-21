const { defineConfig } = require("cypress");
const fs = require('fs')
const xlsx = require('xlsx');
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
  },
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
    staging: '/login',
    products_url: '/products',
  },
  e2e: {
    // specPattern: "**/*.feature",
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
    }
  },
  // defaultCommandTimeout: 8000,
});

