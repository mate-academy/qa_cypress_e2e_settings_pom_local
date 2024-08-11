// for local conduit only
/// <reference types="cypress" />
/// <reference types="../support" />


import { test } from 'mocha';
import settingsPageObject from '../support/pages/settings.page-object';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
const settingsPage = new settingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

const testData= {
  newUsername: 'Mykola',
  bio: 'new',
  email: 'riot1@qa.team',
  newPassword: '12345Qwerty!'
};
describe('Settings page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
  });
  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.clearUsername();
    settingsPage.typeUsername(testData.newUsername);
    settingsPage.clickOnUpdateBtn();
    settingsPage.checkUsername(testData.newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeBio(testData.bio);
    settingsPage.clickOnUpdateBtn();
    settingsPage.checkBio(testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.clearEmail();
    settingsPage.typeEmail(testData.email);
    settingsPage.clickOnUpdateBtn();
    settingsPage.checkEmail(testData.email);

    settingsPage.reloadAndClearCookies();

    signInPage.visit();
    signInPage.typeEmail(testData.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typePassword(testData.newPassword);
    settingsPage.clickOnUpdateBtn();

    settingsPage.reloadAndClearCookies();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it.only('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLoggout();
    homePage.assertHeaderContainsSignIn();
    homePage.assertNoSettingsInUrl();
  });
});
