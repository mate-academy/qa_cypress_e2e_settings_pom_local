/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject.js';
import SettingsPageObject from '../support/pages/settings.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject.js';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

const newUserName = 'stepan_bandera';
const newBio = 'Stepan Bandera is a hero of Ukraine';
const newEmail = 'stepan_bandera@gmail.com';
const newPassword = 'SlavaUkraini2024';

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearUsername();
    settingsPage.typeUsername(newUserName);
    settingsPage.clickUpdateBtn();
    settingsPage.checkUsername(newUserName);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.checkBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearEmail();
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.checkEmail(newEmail);
    
    settingsPage.reloadAndClearCookies();
    
    signInPage.visit();
    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainsUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.clearPassword();
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateBtn();
    
    settingsPage.reloadAndClearCookies();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainsUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.assertNoSettingsInUrl();
    homePage.assertHeaderContainsSignIn();
  });
});
