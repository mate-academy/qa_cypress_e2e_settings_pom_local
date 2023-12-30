import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('settings-form-username');
  }

  typeUsername(username) {
    this.usernameField.clear();
    this.usernameField.type(username);
  }

  get submitButton() {
    return cy.getByDataCy('settings-form-submit');
  }

  get bioField() {
    return cy.getByDataCy('settings-form-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-form-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-form-password');
  }

  get logOutButton() {
    return cy.getByDataCy('settings-form-logout');
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeNewEmail(newEmail) {
    this.emailField.clear();
    this.emailField.type(newEmail);
  }

  typeNewPassword(newPassword) {
    this.passwordField.clear();
    this.passwordField.type(newPassword);
  }

  clickSubmitButton() {
    this.submitButton.click();
  }

  clickLogOutButton() {
    this.logOutButton.click();
  }
}

export default SettingsPageObject;
