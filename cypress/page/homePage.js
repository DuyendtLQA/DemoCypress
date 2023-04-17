/// <reference types = "Cypress"/>
import HomePageLocator from "../locator/homePageLocator";
import BasePage from "./basePage";
class HomePage extends BasePage {

    verify_home() {
        this.verifyElementVisible(HomePageLocator.topicTags);
    }
}
export default HomePage

