/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/setting.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    signInPage.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewUsername(user.newUsername);
    settingsPage.clickUpdateSettingBtn();

    homePage.assertHeaderContainUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    signInPage.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewBio(user.bio);
    settingsPage.clickUpdateSettingBtn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500);

    profilePage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    signInPage.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewEmail(user.newEmail);
    settingsPage.clickUpdateSettingBtn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1500);

    homePage.clickSettings();
    settingsPage.assertNewEmail(user.newEmail);
  });

  it('should provide an ability to update password', () => {
    signInPage.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(user.newPassword);
    settingsPage.clickUpdateSettingBtn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    settingsPage.visit();
    settingsPage.clickLogOutButton();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.newPassword);
    signInPage.signInBtn.click();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    signInPage.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogOutButton();
    
    homePage.assertHeaderContainSignIn();
  });
});
