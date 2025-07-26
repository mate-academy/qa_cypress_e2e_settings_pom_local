/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('User Settings page', () => {
  let user;
  let newUserData = {};

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
      settingsPage.visit();
    });
  });

  it('should allow updating the bio', () => {
    cy.task('generateRandomString', 10).then((newBio) => {
      newUserData.bio = newBio;
      settingsPage.typeBio(newUserData.bio);
      settingsPage.updateSettings();
      settingsPage.visit();
      settingsPage.bioField.should('have.value', newUserData.bio);
    });
  });

  it('should allow updating the username', () => {
    cy.task('generateUser').then((generatedNewUser) => {
      newUserData.username = generatedNewUser.username;
      settingsPage.typeUserName(newUserData.username);
      settingsPage.updateSettings();
      homePage.visit();
      homePage.assertHeaderContainUsername(newUserData.username);
    });
  });

  it('should allow updating the email', () => {
    cy.task('generateUser').then((generatedNewUser) => {
      newUserData.email = generatedNewUser.email;
      settingsPage.typeEmail(newUserData.email);
      settingsPage.updateSettings();
      settingsPage.logout();
      signInPage.visit();
      signInPage.typeEmail(newUserData.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
      homePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should allow updating the password', () => {
    cy.task('generateUser').then((generatedNewUser) => {
      newUserData.password = generatedNewUser.password;
      settingsPage.typePassword(newUserData.password);
      settingsPage.updateSettings();
      settingsPage.logout();
      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(newUserData.password);
      signInPage.clickSignInBtn();
      homePage.assertHeaderContainUsername(user.username);
    });
  });
});