/* eslint-disable cypress/unsafe-to-chain-command */
class SignInPageObject {
  url = '/login';

  visit() {
  
    return cy.visit(this.url);
  }

  typeEmail(email) {

    return cy.get('[data-cy="sign-in-email"]').clear().type(email);
  }

  typePassword(password) {

    return cy.get('[data-cy="sign-in-password"]').clear().type(password);
  }

  clickSignInBtn() {

    return cy.get('[data-cy="sign-in-btn"]').click();
  }

  getError() {
 
    return cy.get('[data-cy="sign-in-error"]');
  }
}

export default SignInPageObject;
