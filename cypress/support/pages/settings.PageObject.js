import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get emailField() {
    return cy.getByDataCy('settings-email-field');
  }

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio-field');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password-field');
  }

  get updateBtn() {
    return cy.getByDataCy('settings-submit-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('settings-log-out-btn');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
