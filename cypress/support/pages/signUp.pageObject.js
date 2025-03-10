import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/user/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-in');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  checkNotValidCase() {
    cy.contains('li', 'email or password')
      .should('exist');

    cy.contains('li', 'is invalid')
      .should('exist');
  }

  checkFieldValid(field) {
    cy.contains('li', field)
      .should('exist');

    cy.contains('li', 'can\'t be blank');
  }
}

export default SignUpPageObject;