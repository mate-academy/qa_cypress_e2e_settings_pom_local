import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/user/login';

  emailField(email) {
    cy.getByDataCy('email-sign-in')
      .type(email);
  }

  passwordField(password) {
    cy.getByDataCy('password-sign-in')
      .type(password);
  }

  signInBtn() {
    cy.getByDataCy('sign-in-btn')
      .click();
  }
}

export default SignInPageObject;
