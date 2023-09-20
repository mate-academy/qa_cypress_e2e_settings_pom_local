/// <reference types="cypress" />
/// <reference types="../support" />

import settingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const settingsPage = new settingsPageObject();
const homePage = new homePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUserDataSettings').then(generateUserDataSettings => {
      user = generateUserDataSettings;
    cy.login();
    settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {

    settingsPage.editUsername(user.newUsername);
    settingsPage.submitSettings();
    settingsPage.assertUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {

    settingsPage.editBio(user.bio);
    settingsPage.submitSettings();
    settingsPage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {

    settingsPage.editEmail(user.newEmail);
    settingsPage.submitSettings();
    settingsPage.logOut();
    settingsPage.assertEmail(user.username, user.newEmail, user.password);
  });

  it('should provide an ability to update password', () => {

    settingsPage.editPassword(user.newPassword);
    settingsPage.submitSettings();
    settingsPage.logOut();
    settingsPage.assertPassword(user.username, user.email, user.newPassword);
  });

  it('should provide an ability to log out', () => {

    settingsPage.logOut();
    settingsPage.assertLogOut();
  });
});