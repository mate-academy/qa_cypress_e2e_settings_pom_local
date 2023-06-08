import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }
  updateUsernameField(username) {
    this.usernameField.clear().type(username)
  }
  get bioField() {
    return cy.getByDataCy('bio-settings');
  }
  updateBioField(bio) {
    this.bioField.clear().type(bio)
  }
  get emailField() {
    return cy.getByDataCy('email-settings');
  }
  updateEmailField(email) {
    this.emailField.clear().type(email)
  }
  get passwordField() {
    return cy.getByDataCy('new-password-settings');
  }
  updatePasswordField(password) {
    this.passwordField.clear().type(password)
  }
  get updateBtnSet() {
    return cy.getByDataCy('update-btn-settings');
  }
  clickOnUpdateBtnSet() {
    this.updateBtnSet.click()
  }
  get logOutBtnSet() {
    return cy.getByDataCy('logout-btn-settings');
  }
  clickOnLogOutBtnSet() {
    this.logOutBtnSet.click()
  }
}
export default SettingsPageObject;
