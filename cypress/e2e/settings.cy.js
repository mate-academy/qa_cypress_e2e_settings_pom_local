/// <reference types="cypress" />
/// <reference types="../support" />


import SettingsPageObject from '../support/pages/settings.pageObject';

const settings = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('testData').then(testData => {
      user = testData;
    });
    cy.login();
    settings.visit();
  });

  it('should provide an ability to update username', () => {
    settings.usernameSettings.clear().type(user.newUsername);
    settings.updateBtnSettings.click();
    settings.assertUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    settings.bioSettings.type(user.bio);
    settings.updateBtnSettings.click();
    settings.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.updateEmailSettings(user.newEmail);
    cy.clickUpdateBtnSettings();
    cy.assertNewEmail(user.newEmail);
  });

  it('should provide an ability to update password', () => {
    cy.updatePasswordSettings(user.newPassword);
    cy.clickUpdateBtnSettings();
    cy.assertNewPassword(user.newPassword);
  });

  it('should provide an ability to log out', () => {
    settings.logoutSettings.click();
    settings.asserLogout();
  });
});
