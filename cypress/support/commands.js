// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
import "cypress-iframe"
Cypress.Commands.add("sendkeyLocator", (locator, key) => {
    cy.get(locator).clear({ force: true }).type(key, { force: true, timeout: 10000 });
})

beforeEach(function() {
    let testSuite = Cypress.env('GROUP');
    if (!testSuite) {
      return;
    }
    cy.log(testSuite)
    const testName = Cypress.mocha.getRunner().test.fullTitle();
    cy.log(testName)
    testSuite = "<"+testSuite+">"
    cy.log(testSuite)
    if (!testName.includes(testSuite)) {
      this.skip();
    }
  })