/// <reference types="cypress" />
let a = require("../common/const")
describe.only('Conf Env Test <home>',()=>{
    let url
    it('Test <smoke>',()=>{
        cy.log(a.lbWelcome)
        url = Cypress.env("baseUrl")
        a.lbWelcome = url
        cy.log(a.lbWelcome)
        console.log(url)
        cy.visit(url);
        cy.get('abc').click()
    })

    it("pass variables between tcs", () => {
        cy.log(a.lbWelcome)
        cy.visit(url)
        cy.get('abcd').click()
    })
})