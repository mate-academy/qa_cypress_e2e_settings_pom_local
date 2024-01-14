/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPage from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject;
const settingsPage = new SettingsPage;

let user;

describe('Settings page', () => {
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
    settingsPage.clickUpdateButton();
    settingsPage.assertHeaderContainUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.typeNewBio(user.newBio);
    settingsPage.clickUpdateButton();
    settingsPage.assertBioContainNewBio(user.newBio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewEmail(user.newEmail);
    settingsPage.clickUpdateButton();
    settingsPage.visit();
    settingsPage.assertEmailContainNewEmail(user.newEmail);
    settingsPage.clickLogOutButton();

    signInPage.visit();
    signInPage.typeEmail(user.newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    settingsPage.visit();
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(user.newPassword);
    settingsPage.clickUpdateButton();
    settingsPage.clickLogOutButton();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.newPassword);
    signInPage.clickSignInBtn();

    settingsPage.visit();
    settingsPage.assertEmail(user.email);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogOutButton();
    settingsPage.assertUserLogout();
  });
});
