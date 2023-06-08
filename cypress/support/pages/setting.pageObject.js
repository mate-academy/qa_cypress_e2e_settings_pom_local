import PageObject from '../PageObject';

class SettingPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-setting');
  }

  get bioField() {
    return cy.getByDataCy('bio-setting');
  }

  get emailField() {
    return cy.getByDataCy('email-setting');
  }

  get passwordField() {
    return cy.getByDataCy('newPassword-setting');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }
  
}

export default SettingPageObject;