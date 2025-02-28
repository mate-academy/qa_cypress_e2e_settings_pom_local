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
    return cy.getByDataCy('newpasswordInput');
  }

  get SettingsLinkHeader() {
    return cy.getByDataCy('settingsLink');
  }

  get UpdateSettingsBtn() {
    return cy.getByDataCy('UpdateSettingsBtn');
  }

  get LogoutBtn() {
    return cy.getByDataCy('LogoutBtn');
  }

  AssertUpdatedUsername(newUsername) {
    cy.getByDataCy('profile-link').should('contain', newUsername);
  }

  AssertUpdatedEmail(newEmail) {
    cy.getByDataCy('emailInput').should('have.value', newEmail);
  }

  AssertUpdatedBio(newBio) {
    cy.getByDataCy('bioInput').should('have.value', newBio);
  }

  visit() {
    cy.visit(this.url);
  }
}
