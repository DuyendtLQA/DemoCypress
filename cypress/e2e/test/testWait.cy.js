/// <reference types="cypress" />
describe.skip('The example Imp waiting', { defaultCommandTimeout: 7000 }, () => {
    before(() => {
        cy.visit('https://github.com/')
    })

    it("implicit wait", { defaultCommandTimeout: 10000 }, () => {
        cy.get('#some-element', { timeout: 20000 }).should('be.visible')
    });
});

describe('The example Ex waiting', () => {
    before(() => {
        cy.visit('https://github.com/')
    })
    it("explicit wait", () => {
        // Wait until an element becomes visible
        let result = ['one', 'two', 'three']
        cy.log('another message :' , result)
        // cy.get('.add').as('..')

        // // wait api
        // cy.intercept('/api/boards').as('boardList')
        // cy.wait('@boardList')

        // cy.get('[data-testid="random-number"]').should(($div) => {
        //     expect(n).to.be.gte(1).and.be.lte(10)
        // })
    });
});