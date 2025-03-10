import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get findSettingLink() {
    return cy.getByDataCy('settings-link');
  }

  clickSettingsLink() {
    this.findSettingLink.click();
  }

  get findUsernameField() {
    return cy.getByDataCy('userName-settingsForm');
  }

  inputDataToUsernameField(username) {
    this.findUsernameField.type(username);
  }

  get findUpdateBtn() {
    return cy.getByDataCy('update-btn');
  }

  clickUpdateBtn() {
    this.findUpdateBtn.click();
  }

  get findBioField() {
    return cy.getByDataCy('bio-settingsForm');
  }

  inputDataToBioField(bio) {
    this.findBioField.type(bio);
  }

  assertBioText(bio) {
    this.findBioField.should('contain.text', bio);
  }

  get findEmailField() {
    return cy.getByDataCy('email-settingForm');
  }

  inputNewEmail(email) {
    this.findEmailField.clear().type(email);
  }

  assertNewEmail(email) {
    this.findEmailField.should('contain.value', email);
  }

  get findPasswordField() {
    return cy.getByDataCy('password-settingForm');
  }

  inputNewPassword(password) {
    this.findPasswordField.clear().type(password);
  }

  get findLogoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  clickLogoutBtn() {
    this.findLogoutBtn.click();
  }

  get findLogo() {
    return cy.getByDataCy('logo');
  }

  userIsLogout(logo) {
    this.findLogo.should('contain.text', logo);
  }
}
export default SettingsPageObject;
