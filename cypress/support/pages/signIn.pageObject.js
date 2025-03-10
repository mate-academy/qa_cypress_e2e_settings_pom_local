import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/user/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
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
}

export default SignInPageObject;
