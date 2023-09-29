/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.viewport(1920, 1080);
  });

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(user.username);
    settingsPage.clickUpdateBtn();
    settingsPage.visit();
    settingsPage.assertProfileContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.visit();
    settingsPage.assertProfileContainBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.clickUpdateBtn();
    settingsPage.visit();
    settingsPage.assertProfileContainEmail(user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typeNewPassword(user.newpassword);
    settingsPage.clickUpdateBtn();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.newpassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });
});
