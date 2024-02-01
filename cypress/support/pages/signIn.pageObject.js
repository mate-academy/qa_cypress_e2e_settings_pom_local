import PageObject from './PageObject';

class SignInPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/login';
  }

  typeEmail(email) {
    cy.get('[data-cy=email-input]').type(email);
  }

  typePassword(password) {
    cy.get('[data-cy=password-input]').type(password);
  }

  clickSignInBtn() {
    cy.get('[data-cy=sign-in-btn]').click();
  }

  assertErrorMessage(message) {
    cy.get('[data-cy=error-message]').should('be.visible').and('contain', message);
  }
}

export default SignInPageObject;
