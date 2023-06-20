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

  get errorType() {
    return cy.getByDataCy('wrong-credentials');
  }

  get errorMessage() {
    return cy.getByDataCy('error-message');
  }
}

export default SignInPageObject;
