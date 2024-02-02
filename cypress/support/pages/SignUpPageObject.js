import PageObject from './PageObject';

class SignUpPageObject {
  get emailField() {
    return cy.get('[data-cy="email-field"]');
  }

  get usernameField() {
    return cy.get('[data-cy="username-field"]');
  }

  get passwordField() {
    return cy.get('[data-cy="password-field"]');
  }

  get signUpButton() {
    return cy.get('[data-cy="sign-up-btn"]');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSignUp() {
    this.signUpButton.click();
  }
}

export default SignUpPageObject;
