import PageObject from './PageObject';

class SettingsPage extends PageObject {
  get usernameField() {
    return cy.get('[data-cy="username-field"]');
  }

  get bioField() {
    return cy.get('[data-cy="bio-field"]');
  }

  get emailField() {
    return cy.get('[data-cy="email-field"]');
  }

  get passwordField() {
    return cy.get('[data-cy="password-field"]');
  }

  get updateButton() {
    return cy.get('[data-cy="update-button"]');
  }

  get logoutButton() {
    return cy.get('[data-cy="logout-button"]');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdate() {
    this.updateButton.click();
  }

  clickLogout() {
    this.logoutButton.click();
  }
}

export default SettingsPage;
