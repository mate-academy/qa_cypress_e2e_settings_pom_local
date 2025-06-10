import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  visit() {
    cy.visit('/signup');
  }

  typeUsername(username) {
    cy.get('[data-cy=username]').type(username);
  }

  typeEmail(email) {
    cy.get('[data-cy=email]').type(email);
  }

  typePassword(password) {
    cy.get('[data-cy=password]').type(password);
  }

  clickSignUpBtn() {
    cy.get('[data-cy=sign-up-btn]').click();
  }

  signUp({ username, email, password }) {
    this.typeUsername(username);
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignUpBtn();
  }

  assertUserLoggedIn(username) {
    cy.get('.header-username').should('contain', username);
  }

  assertErrorMessage(message) {
    cy.contains('.error-message', message).should('be.visible');
  }
}

export default SignUpPageObject;
