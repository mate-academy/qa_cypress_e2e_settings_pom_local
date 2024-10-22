
class PageObject {
  getErrorMessage() {
      return cy.get('[data-cy=error-message]');
  }

 
}

export default new PageObject();

