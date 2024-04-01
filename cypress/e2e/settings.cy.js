/// <reference types="cypress" />
/// <reference types="../support" />

import { idText } from 'typescript';
import SettingsPageObject from '../support/pages/settings.pageObject';
import { settings } from 'cluster';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  const firstEmail = 'riot@qa.team';
  const firstUsername = 'riot';
  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    cy.login();
    cy.visit('/settings');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(user.username);
    settingsPage.clickUpdateSettings;
    settingsPage.checkChanges('profile-link', user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeUserBio(user.bio);
    settingsPage.clickUpdateSettings;
    cy.visit('/settings');
    settingsPage.checkChanges('user-bio', user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeUserEmail(user.email);
    settingsPage.clickUpdateSettings;
    cy.visit('/settings');
    settingsPage.checkValue('user-email', user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typeUserPassword(user.password);
    settingsPage.clickUpdateSettings;
    cy.logout();
    cy.loginViaUi(firstEmail, user.password);
    settingsPage.checkChanges('profile-link', firstUsername);
  });

  it('should provide an ability to log out', () => {
    cy.logout();
    cy.getByDataCy('header')
      .should('not.contain.text', firstUsername);
  });
});
