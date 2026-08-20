/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let updatedData;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(
        user.email,
        user.username,
        user.password,
        settingsPage.url,
      );
    });

    cy.task('generateSettingsData').then((generatedData) => {
      updatedData = generatedData;
    });

    settingsPage.assertLoaded();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateUsername(updatedData.username);

    homePage.assertHeaderContainUsername(updatedData.username);
    homePage.assertProfileUsername(updatedData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateBio(updatedData.bio);

    homePage.assertProfileBio(updatedData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail(updatedData.email);
    settingsPage.visit();

    settingsPage.assertEmail(updatedData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword(updatedData.password);
    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(updatedData.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    homePage.assertUserIsLoggedOut();
  });
});
