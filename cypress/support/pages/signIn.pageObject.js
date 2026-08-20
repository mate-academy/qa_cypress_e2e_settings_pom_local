import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/user/login';

  get emailField() {
    return this.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return this.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return this.getByDataCy('sign-in-btn');
  }

  assertLoaded() {
    this.emailField.should('be.visible');
    this.passwordField.should('be.visible');
    this.signInBtn.should('be.visible');
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
}

export default SignInPageObject;
