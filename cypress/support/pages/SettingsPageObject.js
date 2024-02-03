import PageObject from './PageObject';

class SettingsPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/settings';
  }

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
    return this;
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
    return this;
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
    return this;
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
    return this;
  }

  clickUpdate() {
    this.updateButton.click();
    return this;
  }

}

export default SettingsPageObject;
