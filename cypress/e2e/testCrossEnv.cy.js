/// <reference types="cypress" />

describe.only('Conf Env Test <home>',()=>{
    let url
    it('Test <smoke>',()=>{
        url = Cypress.env("baseUrl")
        console.log(url)
        cy.visit(url);
        cy.get('abc').click()
    })

    it("pass variables between tcs", () => {
        cy.visit(url)
        cy.get('abcd').click()
    })
})