import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/user/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in-up');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-up-btn');
  }

  get errorMessage() {
    return cy.getByDataCy('error-message');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  errorEmailOrPasswordIsInvalide() {
    this.errorMessage.should('contain', 'is invalid');
  }
}

export default SignInPageObject;
