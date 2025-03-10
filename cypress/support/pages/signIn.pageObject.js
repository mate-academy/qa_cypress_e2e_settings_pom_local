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

  get errorMessage() {
    return cy.getByDataCy('error-message');
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

  checkErrorMessage() {
    this.errorMessage.should('contain.text', 'email or password');
  }
}

export default SignInPageObject;
