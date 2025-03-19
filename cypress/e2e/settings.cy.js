/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import HomePageObject from '..//support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();
const homePage = new HomePageObject();


describe('Settings page', () => {
  let updateData;
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUpdateData').then((generateUpdateData) => {
      updateData = generateUpdateData;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(updateData.username);
    settingsPage.clickOnUpdateBtn();
    profilePage.assertBannerContainUsername(updateData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(updateData.bio);
    settingsPage.clickOnUpdateBtn();
    profilePage.assertBannerContainBio(updateData.bio);
  });

  it('should provide an ability to update email', () => {
    settingsPage.typeEmail(updateData.email);
    settingsPage.clickOnUpdateBtn();
    settingsPage.visit();
    settingsPage.assertSettingsContainEmail(updateData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(updateData.password);
    settingsPage.clickOnUpdateBtn();
    settingsPage.visit();
    settingsPage.clickOnLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(updateData.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogoutBtn();
    homePage.usernameLink.should('not.exist');
  });
});
