// cypress/e2e/settings.spec.js

/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPage from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPage();

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear'); // Clear database before each test
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.updateUsername('new_username');
    // Add assertions as needed
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.updateBio('New bio text');
    // Add assertions as needed
  });

  it('should provide an ability to update email', () => {
    settingsPage.visit();
    settingsPage.updateEmail('newemail@example.com');
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.updatePassword('new_password');
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.logout();
  });
});
