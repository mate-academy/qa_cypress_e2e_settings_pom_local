import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get updateBtn() {
    return cy.getByDataCy('uptadeBtn-settings');
  }

  get logoutBtn() {
    return cy.getByDataCy('logoutBtn-settings');
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
