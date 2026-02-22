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
    return this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    return this.emailField.clear().type(email);
  }

  typePassword(password) {
    return this.passwordField.clear().type(password);
  }

  clickSignInBtn() {
    return this.signInBtn.click();
  }

  open() {
    return cy.visit(this.url);
  }

  fillForm(user) {
    this.typeUsername(user.username);
    this.typeEmail(user.email);
    this.typePassword(user.password);

    return this;
  }
  register(user) {
    this.fillForm(user);
    this.clickSignInBtn();
  }
}

export default SignUpPageObject;
