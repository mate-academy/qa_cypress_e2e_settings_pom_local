import PageObject from '../PageObject';

export default class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }
  get userBioField() {
    return cy.getByDataCy('user-bio-settings');
  }
  get emailField() {
    return cy.getByDataCy('email-settings');
  }
  get passwordField() {
    return cy.getByDataCy('password-settings');
  }
  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get logoutBtn() {
    return cy.get('.btn-outline-danger');
  }
}