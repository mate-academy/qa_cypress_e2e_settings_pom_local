import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/user/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get submitBtn() {
    return cy.getByDataCy('auth-btn');
  }

  login(email, password) {
    this.emailField.type(email);
    this.passwordField.type(password);
    this.submitBtn.click();
  }
}

export default SignInPageObject;
