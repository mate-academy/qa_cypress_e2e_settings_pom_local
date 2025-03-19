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
    return cy.getByDataCy('Update-Settings-Btn');
  }

  get assertNewUserName() {
    return cy.getByDataCy('username');
  }

  get logOutBtn() {
    return cy.getByDataCy('logoutBtn');
  }

  typeNewUsername(newUsername) {
    this.settingsUsernameField.clear().type(newUsername);
  }

  typeNewBio(newBio) {
    this.settingsBioField.type(newBio);
  }

  typeNewEmail(newEmail) {
    this.settingsEmailField.clear().type(newEmail);
  }

  typeNewPassword(newPassword) {
    this.settingsPasswordField.type(newPassword);
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
