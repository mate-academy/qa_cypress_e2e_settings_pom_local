import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.get('[data-cy="username-settings"]');
  }

  get bioField() {
    return cy.get('[data-cy="bio-settings"]');
  }

  get emailField() {
    return cy.get('[data-cy="email-settings"]');
  }

  get passwordField() {
    return cy.get('[data-cy="password-settings"]');
  }

  get updateBtn() {
    return cy.contains('[data-cy="update-settings-btn"]', 'Update Settings');
  }

  get logoutBtn() {
    return cy.contains('[data-cy="logout-btn"]', 'Or click here to logout.');
  }

  typeUserName(name) {
    this.userNameField.clear().type(name);
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

  updateSettings() {
    this.updateBtn.click();
  }

  logout() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;