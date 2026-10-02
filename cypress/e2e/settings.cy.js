/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let updatedUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
    });
    cy.task('generateUser').then((generatedUser) => {
      updatedUser = generatedUser;
    });
    settingsPage.visit();
    cy.then(() => {
      settingsPage.assertValue('username', user.username);
      settingsPage.assertValue('email', user.email);
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.update('username', updatedUser.username);
    profilePage.assertUsername(updatedUser.username);
    cy.reload();
    profilePage.assertUsername(updatedUser.username);
    profilePage.openSettings();
    settingsPage.assertValue('username', updatedUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.update('bio', updatedUser.bio);
    profilePage.assertUsername(user.username);
    profilePage.assertBio(updatedUser.bio);
    cy.reload();
    profilePage.assertBio(updatedUser.bio);
    profilePage.openSettings();
    settingsPage.assertValue('bio', updatedUser.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.update('email', updatedUser.email);
    profilePage.assertUsername(user.username);
    profilePage.openSettings();
    settingsPage.assertValue('email', updatedUser.email);
    settingsPage.logout();
    signInPage.visit();
    signInPage.typeEmail(updatedUser.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertHeaderContainUsername(user.username);
    signInPage.openSettings();
    settingsPage.assertValue('email', updatedUser.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.update('password', updatedUser.password);
    profilePage.assertUsername(user.username);
    profilePage.openSettings();
    settingsPage.logout();
    cy.request({
      method: 'POST', url: '/api/users/login', failOnStatusCode: false,
      body: { user: { email: user.email, password: user.password } },
    }).its('status').should('eq', 422);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(updatedUser.password);
    signInPage.clickSignInBtn();
    signInPage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();
    cy.reload();
    settingsPage.assertLoggedOut();
  });
});
