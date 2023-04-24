/// <reference types="cypress" />

describe.only('Conf Env Test',()=>{
    let url
    it('Test',()=>{
        url = Cypress.env("baseUrl")
        console.log(url)
        cy.visit(url);
        cy.get('abc').click()
    })

    it("truyen bien giua tcs", () => {
        cy.visit(url)
    })
})