import PageObject from '../PageObject';
export default class SettingPageObject extends PageObject {
  url = '/settings';
  get UsernameInput() {
    return cy.getByDataCy('usernameInput');
  }

  get BioInput() {
    return cy.getByDataCy('bioInput');
  }

  get EmailInput() {
    return cy.getByDataCy('emailInput');
  }

  get NewPasswordInput() {
    return cy.getByDataCy('newPasswordInput');
  }

  get SettingsLinkHeader() {
    return cy.getByDataCy('settingsLink').click();
  }

  get UpdateSettingsBtn() {
    return cy.getByDataCy('UpdateSettingsBtn').click();
  }

  get LogoutBtn() {
    return cy.getByDataCy('LogoutBtn').click();
  }

  AssertUpdatedUsername(newUsername) {
    cy.getByDataCy('profile-link').should('contain', newUsername);
  }

  AssertUpdatedEmail(newEmail) {
    cy.getByDataCy('emailInput').should('have.value', newEmail);
  }
}