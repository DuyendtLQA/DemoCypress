const { defineConfig } = require("cypress");
const fs = require('fs')
const xlsx = require('xlsx');

module.exports = defineConfig({
  projectId: "99m3w8",
  chromeWebSecurity: false,
  numTestsKeptInMemory: 1,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: false,
  e2e: {
    setupNodeEvents(on, config) {
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
});
