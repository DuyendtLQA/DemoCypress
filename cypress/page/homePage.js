/// <reference types = "Cypress"/>
import HomePageLocator from "../locator/homePageLocator";
import BasePage from "./basePage";
class HomePage extends BasePage {

    verifyLbWelcome() {
        this.verifyStringExits(HomePageLocator.lbWelcome);
    }
}
export default HomePage

