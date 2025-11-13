import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/user/register';

  get usernameField() {
    return cy.getByDataCy('signup-username');
  }

  // Note: These data-cy attributes are shared with SignIn page
  // because the same form components are reused
  get emailField() {
    return cy.getByDataCy('email-sign-in'); // Shared with SignIn
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in'); // Shared with SignIn
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-in-btn'); // Shared with SignIn
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

  clickSignUpBtn() {
    this.signUpBtn.click();
  }
}

export default SignUpPageObject;