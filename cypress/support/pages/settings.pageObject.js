import PageObject from '../PageObject';

class SettingInPageObject extends PageObject {
      url = '/settings';


      // getters for buttons

        get settingsBtn() {
    return cy.getByDataCy('settings-link');
  }

  get submitBtn() {
    return cy.getByDataCy('update-settings');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  // getters for values


        get settingsEmail() {
    return cy.getByDataCy('settings-email');
  }

  get settingsPassword() {
return cy.getByDataCy('settings-password');
  }

  get settingsBio() {
return cy.getByDataCy('settings-bio');
  }

  get settingsUserName() {
    return cy.getByDataCy('settings-username');
  }

  //methods for buttons

    clickSettingsBtn() {
    this.settingsBtn.click();
  }

  clickSubmitBtn() {
    this.submitBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  //methods for updating values

  typeNewUserName(updatedUserName) {
    this.settingsUserName.clear().type(updatedUserName);
  }

  typeNewEmail(updatedEmail) {
    this.settingsEmail.clear().type(updatedEmail);
  }

  typeNewBio(updatedBio) {
    this.settingsBio.clear().type(updatedBio);
  }

  typeNewPassword(updatedPassword) {
    this.settingsPassword.clear().type(updatedPassword);
  }

  // methods for checking values

  checkUpdatedBio(updatedBio) {
    this.settingsBio
    .should('contain.text', updatedBio);
  }

  checkUpdatedEmail(updatedEmail) {
    this.settingsEmail
    .should('have.value', updatedEmail);
  }
}

export default SettingInPageObject;