/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPage from '../support/pages/SettingsPage';
import { faker } from '@faker-js/faker';

describe('Settings page', () => {
  const settingsPage = new SettingsPage();

  before(() => {
    cy.task('db:clear');
    cy.login();
  });

  beforeEach(() => {
    settingsPage.visit('/settings');
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();
    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdate();
    cy.contains('Your settings have been updated').should('be.visible');
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdate();
    cy.contains('Your settings have been updated').should('be.visible');
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdate();
    cy.contains('Your settings have been updated').should('be.visible');
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdate();
    cy.contains('Your settings have been updated').should('be.visible');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogout();
    cy.url().should('include', '/login');
  });
});
