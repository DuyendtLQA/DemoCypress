/// <reference types="cypress" />
describe("Custom Command", () => {
    it("example", () => {
        cy.visit("https://www.duckduckgo.com")
        cy.sendkeyLocator("input[class='js-search-input search__input--adv']", "Cucumber with cypress")
        cy.get("input[class='search__button  js-search-button']").click({force: true})
    })
})