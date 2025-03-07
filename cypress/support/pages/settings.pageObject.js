import PageObject from '../PageObject'

class SettingsPageObject extends PageObject {
  url = '/settings'

  get usernameField() {
    return cy.getByDataCy('username-input-settings');
  }
  updateUsernameField(username) {
    this.usernameField.clear().type(username);
  }
  get bioField() {
    return cy.getByDataCy('bio-textarea-settings');
  }
  updateBioField(bio) {
    this.bioField.clear().type(bio);
  }
  get emailField() {
    return cy.getByDataCy('email-inut-settings');
  }
  updateEmailField(email) {
    this.emailField.clear().type(email);
  }
  get passwordField() {
    return cy.getByDataCy('new-password-input-settings');
  }
  updatePasswordField(password) {
    this.passwordField.clear().type(password);
  }
  get updateBtnSet() {
    return cy.getByDataCy('update-settings-submit-btn');
  }
  clickOnUpdateBtnSet() {
    this.updateBtnSet.click();
  }
  get logOutBtnSet() {
    return cy.get('.btn-outline-danger');
  }
  clickOnLogOutBtnSet() {
    this.logOutBtnSet.click();
  }
}
export default SettingsPageObject
