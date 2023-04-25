/// <reference types="cypress" />
import LoginPage from "../page/loginPage"
import dataLogin from "../common/dataLogin.json"
describe('example login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  let loginPage = new LoginPage()
  it('Login success', () => {
    loginPage.inputEmail(dataLogin.email)
    loginPage.inputPassword(dataLogin.password)
    const homePage = loginPage.clickBtnLogin()
    homePage.verifyLbWelcome()
  })
})

