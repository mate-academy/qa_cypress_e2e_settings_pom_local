/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from "../support/pages/home.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import SettingsPageObject from "../support/pages/settings.PageObject";
import ProfilePageObject from "../support/pages/profile.pageObject";

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateSettingsInfo').then(generateSettingsInfo => {
      user = generateSettingsInfo;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
    settingsPage.visitSettings();
  });

  it('should provide an ability to update username', () => {
    settingsPage.fillEmptyUsernameField(user.username);
    settingsPage.clickUpdateBtn();
    profilePage.containNewUsername(user.username);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillEmptyBioField(user.bio);
    settingsPage.clickUpdateBtn();
    profilePage.containBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillEmptyEmailField(user.email);
    settingsPage.clickUpdateBtn();
    profilePage.clickEditProfileBtn();
    settingsPage.shouldContainNewEmail(user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillEmptyPasswordField(user.newPassword);
    settingsPage.clickUpdateBtn();
    profilePage.clickEditProfileBtn();
    settingsPage.clickLogOutBtn();
    homePage.clickSignInBtn();
    signInPage.accertNewPassword(user.email, user.newPassword);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
    homePage.accertLogOut();
  });
});
