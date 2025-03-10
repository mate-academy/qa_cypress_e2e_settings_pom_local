import PageObject from './PageObject';

class UserSettingsPage extends PageObject {
  get bioField() {
    return cy.get('[data-cy="bio-field"]');
  }

  get usernameField() {
    return cy.get('[data-cy="username-field"]');
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

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
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
}

export default UserSettingsPage;
