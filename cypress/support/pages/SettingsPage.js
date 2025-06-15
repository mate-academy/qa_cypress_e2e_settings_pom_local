export class SettingsPage {
  visit() {
    cy.visit('/settings');
  }

  getUsernameInput() {
    return cy.get('input[placeholder="Username"]');
  }

  getEmailInput() {
    return cy.get('input[placeholder="Email"]');
  }

  getPasswordInput() {
    return cy.get('input[placeholder="New Password"]');
  }

  getBioTextarea() {
    return cy.get('textarea[placeholder="Short bio about you"]');
  }

  getUpdateButton() {
    return cy.contains('button', 'Update Settings');
  }

  getLogoutButton() {
    return cy.contains('button', 'Or click here to logout.');
  }
}
