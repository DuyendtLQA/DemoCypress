import { When, Then } from "cypress-cucumber-preprocessor/steps";

When("I visit duckduckgo.com", () => {
  cy.visit("https://www.duckduckgo.com");
});

Then("I should see a search bar", () => {
  cy.get("input[class='js-search-input search__input--adv']").should(
    "have.attr",
    "placeholder",
    "Search the web without being tracked"
  );
});

Then("I put text into a search bar", () => {
    cy.get("input[class='js-search-input search__input--adv']").clear({ force: true }).type("Cucumber with cypress", { force: true, timeout: 10000})
  });

Then("I click search button", () => {
    cy.get("input[class='search__button  js-search-button']").click({force: true})
})