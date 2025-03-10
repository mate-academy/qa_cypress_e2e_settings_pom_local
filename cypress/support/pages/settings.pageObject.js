import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
  url = '/settings/';

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-btn-settings');
  }

  get biographyField() {
    return cy.getByDataCy('bio-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get newPasswordField() {
    return cy.getByDataCy('new-password-settings');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn-settings');
  }
}

export default settingsPageObject;
