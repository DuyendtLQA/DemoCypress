/// <reference types = "Cypress"/>
import LoginPageLocator from "../locator/loginPageLocator";
import BasePage from "./basePage";
import HomePage from "./homePage";
class LoginPage extends BasePage {

    inputEmail(value) {
        this.sendKey(LoginPageLocator.email, value);
    }

    inputPassword(value) {
        this.sendKey(LoginPageLocator.password, value);
    }

    clickBtnLogin() {
        this.clickElementByString(LoginPageLocator.btnLogin ,LoginPageLocator.lbLogin);
        return new HomePage()
    }
}
export default LoginPage

