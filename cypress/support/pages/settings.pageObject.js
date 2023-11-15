import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get settingsUsernameField() {
    return cy.getByDataCy('settings-username-field');
  }

  get settingsBioField() {
    return cy.getByDataCy('settings-bio-field');
  }

  get settingsEmailField() {
    return cy.getByDataCy('settings-email-field');
  }

  get settingsPasswordField() {
    return cy.getByDataCy('settings-password-field');
  }

  get UpdateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get assertNewUserName() {
    return cy.getByDataCy('username');
  }

  get logOutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  typeNewUsername(userName) {
    this.settingsUsernameField.clear().type(userName);
  }

  typeNewBio(bio) {
    this.settingsBioField.type(bio);
  }

  typeNewEmail(email) {
    this.settingsEmailField.clear().type(email);
  }

  typeNewPassword(password) {
    this.settingsPasswordField.type(password);
  }

  clickUpdateSettingsBtn() {
    this.UpdateSettingsBtn.click();
  }

  assertContainNewUsername(username) {
    this.assertNewUserName
      .should('contain', username);
  }

  assertContainNewBio(bio) {
    this.assertNewUserName
      .should('contain', bio);
  }

  assertContainNewEmail(email) {
    this.settingsEmailField
      .should('have.value', email);
  }

  assertContainNewPassword(password) {
    this.settingsEmailField
      .should('contain', password);
  }

  clickLogOutBtn() {
    this.logOutBtn.click();
  }
}

export default SettingsPageObject;