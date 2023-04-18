/// <reference types="cypress" />
describe('The example use Data Driven Testing using Excel file.', () => {
    let data
    before(() => {
        cy.task('parseXlsx', { file: 'cypress/fixtures/data.xlsx', sheet: "Sheet2" }).then((rows) => {
            // write json fixture
            cy.writeFile("cypress/fixtures/xlsxData.json", { rows })
            // gan vao bien
            data = rows
        })
    })

    it("example data from Excel file.", () => {
        cy.log(data)

        cy.fixture('dataLogin').then((data) => {
            cy.log(data)
        })

        cy.fixture('xlsxData').then((data) => {
            cy.log(data)
        })
    });
});