const { defineConfig } = require("cypress");
const fs = require('fs')
const xlsx = require('xlsx');
const path = require('path')
const cucumber = require('cypress-cucumber-preprocessor').default;
// const fetchConfigurationByFile = file => {
//   const pathOfConfigurationFile = `config/cypress.${file}.json`;

//   return (
//     file && fs.readJson(path.join(__dirname, "../", pathOfConfigurationFile))
//   );
// };

// module.exports = (on, config) => {
//   const environment = config.env.configFile || "development";
//   const configurationForEnvironment = fetchConfigurationByFile(environment);

//   return configurationForEnvironment || config;
// };

module.exports = defineConfig({
  projectId: "99m3w8",
  chromeWebSecurity: false,
  numTestsKeptInMemory: 1,
  screenshotOnRunFailure: false,
  trashAssetsBeforeRuns: true,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    overwrite: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
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
    }
  },
  // defaultCommandTimeout: 8000,
});

