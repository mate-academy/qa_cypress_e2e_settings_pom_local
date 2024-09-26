import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get settingsLink() {
    return cy.getByDataCy('/settings');
  }

  get usernameSettings() {
    return cy.getByDataCy('username-settings');
  }

  get bioSettings() {
    return cy.getByDataCy('bio-settings');
  }

  get emailSettings() {
    return cy.getByDataCy('email-settings');
  }

  get passwordSettings() {
    return cy.getByDataCy('password-settings');
  }

  assertUsername(usernameUpdate) {
    cy.contains('h4', usernameUpdate )
      .should('exist');
  }

  assertBio(bioUpdate) {
    cy.getByDataCy('/settings')
      .click()
    cy.getByDataCy('bio-settings')
      .should('contain', bioUpdate)
  }

  get logoutSettings() {
    return cy.getByDataCy('logout-settings');
  }

  asserLogout() {
    cy.getByDataCy('/user/login')
      .should('exist');
  }
}

export default SettingsPageObject;