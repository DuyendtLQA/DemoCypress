import "cypress-iframe"
describe('handle childwindow <abc>', () => {
    it('demo childwindow', () => {
      cy.visit('https://the-internet.herokuapp.com/windows')
      cy.get('.example > a')
      .invoke('removeAttr', 'target').click()
      // verify child window url
      cy.url()
      .should('include', 'https://the-internet.herokuapp.com/windows/new')
      // shift to parent window
      cy.go('back');
    })
  })