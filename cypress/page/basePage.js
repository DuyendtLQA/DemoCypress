/// <reference types="Cypress" />

require('cypress-xpath')

// Cypress.on("uncaught:exception", (err, runnable) => {
//     return false;
// });

class BasePage {

    clickElement(locator) {
        cy.get(locator, { timeout: 20000 }).click({ multiple: true, force: true });
    }

    clickElementByXpath(locator) {
        cy.xpath(locator, { timeout: 20000 }).click({ multiple: true, force: true });
    }

    clickElementByString(string) {
        cy.contains(string, { timeout: 20000 }).click()
    }

    clickFirstElement(locator) {
        cy.xpath(locator).first().click({ multiple: true, force: true });
    }

    triggerClickElement(locator) {
        return cy.xpath(locator, { timeout: 20000 }).trigger('click', { force: true })
    }

    clickElementCssWithTimout(locator, timeouts) {
        return cy.get(locator, { timeout: timeouts }).click({ force: true });
    }

    sendKey(locator, key) {
        cy.get(locator, { timeout: 50000 }).clear({ force: true }).type(key, { force: true });
    }

    sendKeyXpathScroll(locator, key) {
        cy.xpath(locator, { timeout: 20000 }).scrollIntoView().clear({ force: true }).type(key, { force: true });
    }

    sendKeyLocatorNotClear(locator, key) {
        cy.xpath(locator, { timeout: 20000 }).type(key, { force: true });
    }

    setValue(elementCss, newKey) {
        cy.get(elementCss, { timeout: 20000 })
            .invoke('attr', 'value', newKey)
            .should('have.attr', 'value', newKey)
    }

    clearValueLocator(locator) {
        cy.xpath(locator, { timeout: 20000 }).clear({ force: true })
    }

    clearValueLocatorScroll(locator) {
        cy.xpath(locator, { timeout: 20000 }).scrollIntoView().clear({ force: true })
    }

    uploadFile(locator, fileToUpload) {
        cy.xpath(locator).attachFile(fileToUpload);
    }

    sendKeyLocatorInIframe(iframe, locator, key) {
        // fill in a value in iframe
        cy.wait(2000)
        cy.xpath(iframe, { timeout: 20000 }).then($iframe => {
            const iframe = $iframe.contents();
            cy.log(iframe)
            cy.log(locator)
            const myInput = iframe.find(locator)
            cy.log(myInput)
            cy.wrap(myInput).type(key, { force: true });
        });
    }

    verifyTextVisibleByElement(locator, text) {
        cy.xpath(locator, { timeout: 20000 }).then(($el) => {
            expect($el.text()).to.include(text)
        })
    }

    verifyIncludeUrl(url) {
        expect(cy.url().should("include", url));
    }
    verifyElementHaveText(css, text) {
        cy.get(css, { timeout: 20000 }).should('contains.text', text)
    }

    verifyElementByXpathHaveText(xpath, text) {
        cy.xpath(xpath, { timeout: 20000 }).should('contains.text', text)
    }
    verifyElementByXpathHaveTextInIframe(iframe, locator, text) {
        cy.iframe(iframe)
            .find(locator).should("contains.text", text)
    }

    verifyElementByXpathNotHaveText(xpath, text) {
        cy.xpath(xpath, { timeout: 20000 }).should('not.contain.text', text)
    }

    verifyNotIncludeUrl(url) {
        expect(cy.url().should("not.include", url));
    }

    verifyElementVisibleByString(string) {
        expect(cy.contains(string, { timeout: 30000 }).scrollIntoView().should("be.visible"));
    }

    verifyElementVisibleByLocator(locator) {
        expect(cy.xpath(locator, { timeout: 40000 }).should("be.visible"));
    }

    verifyElementVisibleByLocatorInIframe(iframe, locator) {
        cy.iframe(iframe)
            .find(locator, { timeout: 10000 }).scrollIntoView().should("be.visible");
    }
    verifyElementVisible(locator) {
        expect(cy.get(locator, { timeout: 30000 }).should("be.visible"));
    }
    verifyElementNotVisibleByLocator(locator) {
        expect(cy.xpath(locator, { timeout: 30000 }).should("not.be.visible"));
    }

    verifyElementVisibleByLocatorScroll(locator) {
        expect(cy.xpath(locator, { timeout: 40000 }).scrollIntoView().should("be.visible"));
    }

    verifyElementVisibleByLocatorScrollWithTimeout(locator, timeout) {
        expect(cy.xpath(locator, { timeout: timeout }).scrollIntoView().should("be.visible"));
    }

    verifyElementEnableByLocator(locator) {
        expect(cy.xpath(locator, { timeout: 20000 }).should("not.be.disabled"));
    }
    verifyElementEnableByString(string) {
        expect(cy.contains(string, { timeout: 30000 }).scrollIntoView().should("be.enabled"));
    }

    verifyElementNotVisibleByString(string) {
        expect(cy.contains(string, { timeout: 20000 }).should("not.be.visible"));
    }

    verifyElementHaveLenght(locator, length) {
        cy.xpath(locator, { timeout: 20000 }).should(($p) => {
            expect($p).to.have.length(length)
        })
    }

    verifyElementVisibleByInput(locator, string) {
        cy.xpath(locator).should('have.value', string)
    }

    // verifyElementDisableByLocator(locator) {
    //     expect(cy.xpath(locator, { timeout: 20000 }).should("be.disabled"));
    // }

    verifyElementDisableByLocator(locator) {
        cy.xpath(locator).then(($button) => {
            expect(cy.get($button).should('be.disabled'))
        })
    }

    verifyElementNotExistByCss(locator) {
        expect(cy.get(locator, { timeout: 40000 }).should('not.exist'));
    }
    verifyElementHidden(locator) {
        expect(cy.xpath(locator, { timeout: 20000 }).should("be.hidden"));
    }

    stringRandom(text, number) {
        let r = Math.random().toString(36).substring(number + 2);
        let txt = text + r;
        return txt;
    }

    indexRandom(index) {
        let r = Math.random().toString(9).substring(2, 2 + index);
        return r;
    }

    emailRandom(emailName) {
        let r = Math.random().toString(36).substring(9);
        let txt = emailName + "+" + r + "@gmail.com"
        return txt
    }

    getExpiryDate() {
        // Get expiry date +1 month with form (month)/(2 last number in year)
        var date = new Date();
        let prevExpiryDate = (date.getMonth() + 1) + "/" + (date.getFullYear() + 1).toString().substring(2, 5)
        return prevExpiryDate
    }

    countLenghtLocator(locator) {
        cy.xpath(locator).then(($el) => {
            return ($el.find(locator).length)
        })
    }

    getDateTimeNow() {
        let day = new Date();
        let date = day.getDay() + ':' + day.getMonth() + ':' + day.getFullYear();
        let hour = day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds();
        return date + ' ' + hour
    }

    verifyStringNotExits(string) {
        cy.contains(string, { timeout: 20000 }).should('not.exist')
    }

    verifyElementNotExits(locator) {
        cy.xpath(locator, { timeout: 20000 }).should('not.exist')
    }

    verifyStringExits(string) {
        cy.contains(string, { timeout: 20000 }).scrollIntoView()
    }

    mouseoverIntoElement(locator) {
        cy.xpath(locator, { timeout: 10000 }).trigger('mouseover')
    }

    randomNumberInt(number) {
        return Math.floor(Math.random() * number + 1)
    }

    clickElementScrollTo(locator) {
        cy.xpath(locator, { timeout: 30000 }).scrollIntoView().click({ force: true })
    }

    clickElementScrollToWithTimeout(locator, timeout = 30000) {
        cy.xpath(locator, { timeout: timeout }).scrollIntoView().click({ force: true })
    }

    clickElementByCssScrollTo(css) {
        cy.get(css, { timeout: 20000 }).scrollIntoView().click({ force: true })
    }

    hoverElement(locator) {
        return cy.xpath(locator, { timeout: 20000 }).scrollIntoView().trigger('mouseover')
    }


    randomColorRgbHex() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

    verifyElementHaveCss(selector, property, value) {
        return cy
            .get(selector, { timeout: 20000 })
            .scrollIntoView()
            .should('have.css', property, value)
    }

    verifyElementHaveCssByXpath(selector, property, value) {
        return cy
            .xpath(selector, { timeout: 20000 })
            .scrollIntoView()
            .should('have.css', property, value)
    }

    verifyElementNotHaveCssByXpath(selector, property, value) {
        return cy
            .xpath(selector, { timeout: 20000 })
            .scrollIntoView()
            .should('not.have.css', property, value)
    }

    RGBToHex(rgb) {
        // Choose correct separator
        let sep = rgb.indexOf(",") > -1 ? "," : " ";
        // Turn "rgb(r,g,b)" into [r,g,b]
        rgb = rgb.substr(4).split(")")[0].split(sep);
        let r = (+rgb[0]).toString(16),
            g = (+rgb[1]).toString(16),
            b = (+rgb[2]).toString(16);
        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        return "#" + r + g + b;
    }

    verifyElementHaveClass(selector, value) {
        return cy
            .xpath(selector, { timeout: 20000 })
            .should("have.class", value)
    }

    verifyElementNotHaveClass(selector, value) {
        return cy
            .xpath(selector)
            .should("not.have.class", value)
    }

    verifyElementHaveClassByCss(css, value) {
        return cy
            .get(css)
            .should("have.class", value)
    }


    verifyElementNoHaveClass(selector, value) {
        return cy
            .xpath(selector)
            .should("not.have.class", value)

    }

    verifyElementHave_attribute(selector, attribute, value) {
        return cy
            .xpath(selector)
            .should('have.attr', attribute, value);
    }

    verifyElementHaveValue(locator, text) {
        cy.xpath(locator, { timeout: 20000 }).should('contains.value', text)
    }

    verifyElementHaveNoValue(locator, text) {
        cy.xpath(locator, { timeout: 20000 }).should('not.contain.value', text)
    }

    getTextDropdown(locator, arr) {
        return cy.xpath(locator).each(
            ($els) => {
                const text = $els.text();
                arr.push(text);
            }
        );
    }

    getTextDropdownIframe(iframe, locator, arr) {
        return cy.iframe(iframe).find(locator).each(
            ($els) => {
                const text = $els.text();
                arr.push(text);
            }
        );
    }

    get_attributeValue(locator, attribute) {
        return cy.xpath(locator)
            .invoke('attr', attribute)
    }

    getCssValue(locator, attribute) {
        return cy.xpath(locator)
            .invoke('css', attribute)
    }

    getText(locator) {
        return new Cypress.Promise((resolve, reject) => {
            cy.xpath(locator, { timeout: 20000 }).then(($el) => {
                resolve($el.text())
            })

        })
    }

    getTextList(locator) {
        // return new Cypress.Promise((resolve, reject) => {
        return cy.xpath(locator).then(($els) => {
            console.log($els)
            let list = []
            for (let i = 0; i < $els.length; i++) {
                $els[i].scrollIntoView()
                list.push(Cypress.$($els[i]).text().trim());
            }
            return list
        })

    }

    getTextListIframe(iframe, locator) {
        // return new Cypress.Promise((resolve, reject) => {
        return cy.iframe(iframe).find(locator).then(($els) => {
            console.log($els)
            let list = []
            for (let i = 0; i < $els.length; i++) {
                $els[i].scrollIntoView()
                list.push(Cypress.$($els[i]).text().trim());
            }
            return list
        })

    }
    getTextListSlice(locator, sliceStart) {
        // return new Cypress.Promise((resolve, reject) => {
        return cy.xpath(locator).then(($els) => {
            console.log($els)
            let list = []
            for (let i = 0; i < $els.length; i++) {
                $els[i].scrollIntoView()
                list.push(Cypress.$($els[i]).text().trim().slice(sliceStart));
            }
            return list
        })

    }
    getTextListByCss(locator) {
        return cy.get(locator).then(($els) => {
            console.log($els)
            let list = []
            for (let i = 0; i < $els.length; i++) {
                $els[i].scrollIntoView()
                list.push(Cypress.$($els[i]).text().trim());
            }
            return list
        })

    }



    verifyElementNotExistByXpath(locator) {
        expect(cy.xpath(locator, { timeout: 50000 }).should('not.exist'));
    }

    verifyElementExistByXpath(xpath) {
        expect(cy.xpath(xpath).should('exist'));
    }

    getSeccondTimeHaveToWait(time) {
        const today = new Date();
        const day = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()

        const myDate = new Date(`${month} ${day}, ${year} ${time}`)
        const newDate = new Date()

        return myDate.getTime() - newDate.getTime()
    }

    goTo_preview() {
        cy.window().then((win) => {
            cy.stub(win, 'open', url => {
                win.location.href = url;
            }).as("new_browser")
        })
        cy.get('div:nth-child(6) > button:nth-child(4)').click({ force: true });
        cy.get('@new_browser')
            .should("be.called")
        cy.reload()
        cy.wait(10000)
    }

    navigateTo_preview(xpath) {
        cy.window().then((win) => {
            cy.stub(win, 'open', url => {
                win.location.href = url;
            }).as("new_browser")
        })
        cy.xpath(xpath).click({ force: true });
        cy.get('@new_browser')
            .should("be.called")
    }

    replaceNbsps(str) {
        var re = new RegExp(String.fromCharCode(160), "g");
        return str.replace(re, " ");
    }

    deleteNbsps(str) {
        var re = new RegExp(String.fromCharCode(160), "g");
        return str.replace(re, "");
    }

    getMonthFromString(mon) {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
    }

    calculate_monthRange(date, currentDate) {
        let month = 0
        month = (currentDate.year - date.year) * 12
        month = month + (currentDate.month - date.month)

        return month
    }

    getCurrentDate() {
        const date = new Date();

        let day = date.getDate();
        let month = this.to_monthName(date.getMonth() + 1)
        let year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${day} ${month} ${year}`;
        return currentDate
    }

    get_month_yearCurrentDate() {
        const date = new Date();

        let month = this.to_monthName(date.getMonth() + 1)
        let year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${month} ${year}`;
        return currentDate
    }

    to_monthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', {
            month: 'short',
        });
    }

    convertDateToDate_object(date) {
        const myArray = date.split(" ");
        let date_object = {}
        for (let i = 0; i < myArray.length; i++) {
            if ((myArray[i] * 1) <= 31) {
                date_object["day"] = (myArray[i] * 1)
            }

            if (this.getMonthFromString(myArray[i])) {
                date_object["month"] = this.getMonthFromString(myArray[i])
            }

            if ((myArray[i] * 1) > 1000) {
                date_object["year"] = (myArray[i] * 1)
            }

        }
        return date_object
    }
    compareText(locator1, locator2) {
        const text1 = this.getText(locator1)
        const text2 = this.getText(locator2)
        expect(text1).to.be.eql(text2)
    }

    drag_andDrop(locatorDrag, locatorDrop) {
        cy.xpath(locatorDrag).trigger('mousedown', { which: 1 })
        cy.xpath(locatorDrop).trigger('mousemove', { force: true }).trigger('mouseup', { force: true })
        cy.wait(5000)
    }
    clickFindElement(parentLocator, targetLocator) {
        cy.xpath(parentLocator).then($el => {
            const iconHidden = $el.find(targetLocator).length
            if (iconHidden == 1) {
                this.clickElement(targetLocator)
            }
        })
        return this
    }

    getX_position(locator, arr) {
        return cy.document().then(($document) => {
            const a = $document.querySelector(locator).getBoundingClientRect().right - $document.querySelector(locator).getBoundingClientRect().left
            const x = $document.querySelector(locator).getBoundingClientRect().left + a / 2
            arr.push(x)
        })

    }

    getY_position(locator, arr) {
        return cy.document().then(($document) => {
            const a = $document.querySelector(locator).getBoundingClientRect().top - $document.querySelector(locator).getBoundingClientRect().bottom
            const y = $document.querySelector(locator).getBoundingClientRect().top + Math.abs(a) / 2
            arr.push(y)
        })

    }

    clickElementInIframe(iframe, locator) {
        cy.iframe(iframe)
            .find(locator, { timeout: 30000 }).scrollIntoView().click({ force: true })
        return this
    }

    verifyTooltipHaveString(tooltip, tooltipValue) {
        this.hoverElement(tooltip)
        this.verifyStringExits(tooltipValue)
        return this
    }

    verify_placeholder(selector, placeholder) {
        this.verifyElementHave_attribute(selector, "placeholder", placeholder)
        return this
    }

}

export default BasePage;