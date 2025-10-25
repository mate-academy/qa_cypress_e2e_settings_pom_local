import PageObject from '../PageObject';

class SettingsPage extends PageObject {
  get usernameField() {
    return cy.get('[data-qa="settings-username"]');
  }

  get bioField() {
    return cy.get('[data-qa="settings-bio"]');
  }

  get emailField() {
    return cy.get('[data-qa="settings-email"]');
  }

  get passwordField() {
    return cy.get('[data-qa="settings-password"]');
  }

  get updateBtn() {
    return cy.get('[data-qa="settings-update-btn"]');
  }

  get logoutBtn() {
    return cy.get('[data-qa="settings-logout-btn"]');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  // Metody asercji
  assertUsername(expectedUsername) {
    this.usernameField.should('have.value', expectedUsername);
  }

  assertBio(expectedBio) {
    this.bioField.should('have.value', expectedBio);
  }

  assertEmail(expectedEmail) {
    this.emailField.should('have.value', expectedEmail);
  }

  assertPasswordUpdated(newPassword) {
    cy.contains('Settings updated').should('be.visible');
    // alternatywnie możesz sprawdzić, że stara sesja się kończy i trzeba się zalogować ponownie
  }

  assertLoggedOut() {
    cy.url().should('include', '/login');
  }
}

export default SettingsPage;
