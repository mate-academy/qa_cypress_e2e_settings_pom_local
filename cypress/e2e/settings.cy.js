/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import accountPageObject from '../support/pages/account.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = newSettingsPageObject();
const homePage = newhomePageObject();
const accountPage = newaccountPageObject();
const signInPage = newSignInPageObject();

describe('Settings page', () => {
  let user;
    settingsPage.visit();
    settingsPage.typeUsername(user2.username);
    settingsPage.clickUpdateSettingsBtn();
    homePage.assertHeaderContainUsername(user2.username);
  });

  it('should provide an ability to update bio', () => {
  describe('Settings page', () => {
    signInPage.typeEmail(user2.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user2.email);

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
