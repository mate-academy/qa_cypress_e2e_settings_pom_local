/* eslint-disable max-len */
export default class SettingsPage {
  username() {
    return cy.get('[data-cy="settings-username"], input[placeholder="Username"]');
  }
  bio() {
    return cy.get('[data-cy="settings-bio"], textarea[placeholder="Short bio about you"]');
  }
  email() {
    return cy.get('[data-cy="settings-email"], input[placeholder="Email"]');
  }
  newPassword() {
    return cy.get('[data-cy="settings-password"], input[placeholder="New Password"]');
  }
  save() {
    return cy.contains('button', 'Update Settings');
  }
  logout() {
    return cy.get('[data-cy="settings-logout"], button').contains('Or click here to logout.');
  }
}
