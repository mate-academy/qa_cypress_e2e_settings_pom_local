import PageObject from "../PageObject";

class SignUpPageObject extends PageObject {
  visit() {
    cy.visit('/user/register')
  }

  get usernameField() {
    return cy.getByDataCy('username-signUp');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  clickOnSignUpBtn() {
    cy.getByDataCy('sign-in-btn')
      .click();
  }

  assertSuccessfullRegistration(username) {
    cy.getByDataCy(`/profile/${username}`)
      .should('contain', username);
  }

  get errorType() {
    return cy.getByDataCy('wrong-credentials');
  }

  get errorMessage() {
    return cy.getByDataCy('error-message');
  }
};

export default SignUpPageObject;
