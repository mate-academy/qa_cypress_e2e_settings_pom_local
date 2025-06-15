/// <reference types="cypress" />
/// <reference types="../support" />

import { SettingsPage } from '../support/pages/SettingsPage';

describe('Settings page', () => {
  const settingsPage = new SettingsPage();
  let email;

  beforeEach(() => {
    const timestamp = Date.now();
    email = `yurii${timestamp}@gmail.com`;

    cy.request('POST', 'http://localhost:3000/api/users', {
      user: {
        username: `yurii${timestamp}`,
        email,
        password: '1234567Qwerty',
        bio: 'Test user bio',
      }
    });

    cy.visit('/user/login');
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type('1234567Qwerty');
    cy.contains('button', 'Sign in').click();
    cy.location('pathname', { timeout: 10000 }).should('not.include', '/login');

    settingsPage.visit();
  });

  it('should update username', () => {
    settingsPage.getUsernameInput().clear().type('superQA_user');
    settingsPage.getEmailInput().clear().type(email);
    settingsPage.getPasswordInput().clear().type('1234567Qwerty');
    settingsPage.getUpdateButton().click();
  });

  it('should update bio', () => {
    settingsPage.getBioTextarea().clear().type('I am the king of Cypress!');
    settingsPage.getUsernameInput().clear().type('superQA_user');
    settingsPage.getEmailInput().clear().type(email);
    settingsPage.getPasswordInput().clear().type('1234567Qwerty');
    settingsPage.getUpdateButton().click();
  });

  it('should update email', () => {
    settingsPage.getEmailInput().clear().type(`superqa_test_${Date.now()}@gmail.com`);
    settingsPage.getUsernameInput().clear().type('superQA_user');
    settingsPage.getPasswordInput().clear().type('1234567Qwerty');
    settingsPage.getUpdateButton().click();
  });

  it('should update password', () => {
    settingsPage.getPasswordInput().type('MegaSecret123!');
    settingsPage.getUsernameInput().clear().type('superQA_user');
    settingsPage.getEmailInput().clear().type(email);
    settingsPage.getUpdateButton().click();
  });

  it('should log out', () => {
    settingsPage.getLogoutButton().click();

    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');
    cy.contains('a', 'Sign in').should('be.visible');
  });
});
