import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get updateBtn() {
    return cy.getByDataCy('settings-update-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('settings-logout-btn');
  }
}

export default SettingsPageObject;
