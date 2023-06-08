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
    settings.emailSettings.clear().type(user.newEmail);
    settings.updateBtnSettings.click();
    settings.assertNewEmail(user.newEmail);
   
  });

  it('should provide an ability to update password', () => {
    settings.passwordSettings.type(user.newPassword);
    settings.updateBtnSettings.click();
    settings.assertNewPassword(user.newPassword);

  });

  it('should provide an ability to log out', () => {
    settings.logoutSettings.click();
    settings.asserLogout();
  });
});
