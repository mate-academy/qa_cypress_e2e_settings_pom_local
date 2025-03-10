import PageObject from './PageObject';

class SignInPageObject {
  get emailField() {
    return cy.get('[data-cy="email-field"]');
  }

  get passwordField() {
    return cy.get('[data-cy="password-field"]');
  }

  get signInButton() {
    return cy.get('[data-cy="sign-in-btn"]');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSignIn() {
    this.signInButton.click();
  }
}

export default SignInPageObject;
