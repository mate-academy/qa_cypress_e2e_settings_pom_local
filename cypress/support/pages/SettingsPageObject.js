import PageObject from './PageObject';

class SettingsPageObject {
  get usernameField() {
    return cy.get('[data-cy="username-field"]');
  }

  get emailField() {
    return cy.get('[data-cy="email-field"]');
  }

  get newPasswordField() {
    return cy.get('[data-cy="new-password-field"]');
  }

  get submitButton() {
    return cy.get('[data-cy="submit-btn"]');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typeNewPassword(newPassword) {
    this.newPasswordField.clear().type(newPassword);
  }

  submit() {
    this.submitButton.click();
  }
}

export default SettingsPageObject;
