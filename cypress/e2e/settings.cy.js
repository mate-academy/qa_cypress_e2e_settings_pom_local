/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import accountPageObject from '../support/pages/account.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new homePageObject();
const accountPage = new accountPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let user2;
  before(() => {

    cy.task('generateUser').then((generateUser1) => {
      user = generateUser1;
    });

    cy.task('generateUser').then((generateUser2) => {
      user2 = generateUser2;
    });

  });

  beforeEach(() => {
    cy.task('db:clear');

    cy.login(user.email, user.username, user.password);

  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeUsername(user2.username);
    settingsPage.clickUpdateSettingsBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateSettingsBtn();
    accountPage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeEmail(user2.email);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user2.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);

  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typePassword(user2.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user2.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it.only('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    homePage.usernameLink.should('not.exist');
  });
});
