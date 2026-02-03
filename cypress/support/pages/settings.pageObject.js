import PageObject from '../PageObject';

class SettingsPage extends PageObject {
  url = '/settings';

  // ===== Elements =====
  get usernameInput() {
    return cy.get('[data-cy="settings-username"]');
  }

  get bioTextarea() {
    return cy.get('[data-cy="settings-bio"]');
  }

  get emailInput() {
    return cy.get('[data-cy="settings-email"]');
  }

  get passwordInput() {
    return cy.get('[data-cy="settings-password"]');
  }

  get submitButton() {
    return cy.get('[data-cy="settings-submit"]');
  }

  get logoutButton() {
    return cy.get('[data-cy="settings-logout"]');
  }

  // ===== Actions =====
  open() {
    this.visit(this.url);
  }

  updateUsername(username) {
    this.usernameInput.clear().type(username);
    this.submitButton.click();
  }

  updateBio(bio) {
    this.bioTextarea.clear().type(bio);
    this.submitButton.click();
  }

  updateEmail(email) {
    this.emailInput.clear().type(email);
    this.submitButton.click();
  }

  updatePassword(password) {
    this.passwordInput.clear().type(password);
    this.submitButton.click();
  }

  logout() {
    this.logoutButton.click();
  }
}

export default SettingsPage;
