/// <reference types="cypress" />
import dataF from '../../fixtures/dataLogin.json'
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
    dataF.forEach(item => {
        it(`example data from Excel file . ${item.email}`, () => {
            cy.log(item)

            // cy.fixture('dataLogin').then((data) => {
            //     cy.log(data)
            // })

            // cy.fixture('addresses').then((data) => {
            //     cy.log(data)
            // })
        });
    })
})
