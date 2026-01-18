import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get updateSettingsBtn() {
    return cy.get('[data-cy="update-settings-btn"]');
  }

  get logoutBtn() {
    return cy.get('[data-cy="logout-btn"]');
  }

  changeUsername(newValue) {
    cy.get('[data-cy="username-input"]').clear().type(newValue);
  }

  changeBio(newValue) {
    cy.get('[data-cy="bio-input"]').clear().type(newValue);
  }

  changeEmail(newValue) {
    cy.get('[data-cy="email-input"]').clear().type(newValue);
  }

  changePassword(newValue) {
    cy.get('[data-cy="password-input"]').clear().type(newValue);
  }

  checkUrl(username) {
    cy.url().should('include', `/profile/${username}`);
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  getUsername() {
    return cy.get('[data-cy="username-input"]').invoke('val');
  }

  getBio() {
    return cy.get('[data-cy="bio-input"]').invoke('val');
  }

  getEmail() {
    return cy.get('[data-cy="email-input"]').invoke('val');
  }
}

export default SettingsPageObject;