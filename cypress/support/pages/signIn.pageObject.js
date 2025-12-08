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

  get errorMessages() {
    return cy.get('.error-messages > :nth-child(1)');
  }

  typeEmail(email) {
    this.emailField.type(email); return this;
  }

  typePassword(password) {
    this.passwordField.type(password); return this;
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }
}

export default SignInPageObject;
