/// <reference types="cypress" />
describe('Env', () => {
    before(() => {
        cy.visit('https://github.com/')
    })

    it("test env", () => {
        cy.log(Cypress.env('host'))
        cy.visit(Cypress.env('api_server'))
    });
    // cypress run --env host=kevin.dev.local,api_server=http://localhost:8888/api/v1
    // specPattern:'cypress/e2e/**/testEnv.cy.{js,jsx,ts,tsx}',
});