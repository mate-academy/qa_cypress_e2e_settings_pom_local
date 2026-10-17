import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get updateButton() {
    return cy.getByDataCy('settings-update-btn');
  }

  get logoutButton() {
    return cy.getByDataCy('settings-logout-btn');
  }

  updateUsername(username) {
    this.usernameField.clear().type(username);
    this.updateButton.click();
  }

  updateBio(bio) {
    this.bioField.clear().type(bio);
    this.updateButton.click();
  }

  updateEmail(email) {
    this.emailField.clear().type(email);
    this.updateButton.click();
  }

  updatePassword(password) {
    this.passwordField.clear().type(password);
    this.updateButton.click();
  }
}

export default SettingsPageObject;
