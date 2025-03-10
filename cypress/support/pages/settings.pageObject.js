import PageObject from '../PageObject'

class settingPageObject extends PageObject {
  url = '/settings'

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }

  updateUsernameField(username) {
    this.usernameField.clear().type(username);
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  updateBioField(bio) {
    this.bioField.clear().type(bio);
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  updateEmailField(email) {
    this.emailField.clear().type(email);
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  updatePasswordField(password) {
    this.passwordField.clear().type(password);
  }

  get updateSetBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  clickUpdateSetBtn() {
    this.updateSetBtn.click();
  }

  get logOutBtn() {
    return cy.getByDataCy('log-out-btn');
  }

  clickLogOutBtn() {
    this.logOutBtn.click();
  }
}

export default settingPageObject
