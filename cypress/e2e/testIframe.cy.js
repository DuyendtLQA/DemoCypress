import "cypress-iframe"
import 'cypress-mochawesome-reporter/register';

describe('handle iframe', () => {
    it("demo iframe", () => {
      cy.visit("https://jqueryui.com/draggable/")
      cy.frameLoaded('.demo-frame');
      //shifting focus
      cy.iframe().find("#draggable").then(function(t){
          const frmtxt = t.text()
          //assertion to verify text
          expect(frmtxt).to.contains('Drag me around');
          cy.log(frmtxt);
          cy.log(frmtxt);
      })
    })
  })
