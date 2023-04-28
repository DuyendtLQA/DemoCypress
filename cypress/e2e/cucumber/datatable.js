import { Given, And, Then } from "cypress-cucumber-preprocessor/steps";
Given("I visit the zero.webappsecurity.com site", () => {
  cy.visit("http://zero.webappsecurity.com/login.html");
});
Given("I sign in with {string} and {string}", (userName, password) => {
  cy.get("#user_login").type(userName);
  cy.get("#user_password").type(password);
  cy.contains("Sign in").click();
});

Then('I click Sign in button', () => {
    cy.get("input[class='btn btn-primary']").click()
})

Given("I login as following", (datatable) => {
    datatable.hashes().forEach((row) => {
      //Contacts the table present in the feature file
      cy.get("#user_login").type(row.userName);
      //To access the data present in the table "row.column name" is used
      cy.get("#user_password").type(row.password, { log: false });
      cy.get("input[class='btn btn-primary']").click()
    });
  });