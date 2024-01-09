/// <reference types="cypress" />
/// <reference types="../support" />

import { SettingsPageObject } from "../support/pages/settings.pageObject";

describe('Settings page', () => {
  let user;
  const settingsPage = new SettingsPageObject();

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewUsername(user.newUsername);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertNewUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewBio(user.bio);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertNewBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewEmail(user.newEmail);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertNewEmail(user.newEmail);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(user.newPassword);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertNewPassword(user.newPassword);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickOnLogoutButton();
    settingsPage.assertUserLogout();
  });
});
