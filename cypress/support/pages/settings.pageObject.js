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

  get updateBtnSettings() {
    return cy.getByDataCy('btnUpdate-settings');
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

  assertNewEmail(newEmail) {
   cy.getByDataCy('/settings')
    .click()
  cy.getByDataCy('email-settings')
    .should('have.value', newEmail)
  }

  assertNewPassword(newPassword) {
    cy.getByDataCy('/settings')
     .click()
   cy.getByDataCy('password-settings')
     .should('have.value', newPassword)
   }

  asserLogout() {
    cy.getByDataCy('/user/login')
      .should('exist');
  }
}

export default SettingsPageObject;