
import SettingsPageObject from "../support/pages/settings.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import ProfilePageObject from "../support/pages/Profile.PageObject";

/// <reference types="cypress" />
/// <reference types="../support" />

describe('Settings page', () => {
  const homePage = new HomePageObject();
  const signInPage = new SignInPageObject();
  const settingsPage = new SettingsPageObject();
  const profilePage = new ProfilePageObject();
  let user;

  before(() => {
    cy.task('db:clear');
  });
  
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email,user.username,user.password);
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.enterNewUserName(user.newUsername);
    settingsPage.clickOnTheUpdateBtn();
    profilePage.assertHeaderIncludNewUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.enterBio(user.bio);
    settingsPage.clickOnTheUpdateBtn();
    settingsPage.visit();
    settingsPage.assertBioFieldUpdated(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.enterNewUserEmail(user.newEmail);
    settingsPage.clickOnTheUpdateBtn();
    settingsPage.visit();
    settingsPage.assertEmailFieldUpdated(user.newEmail);

  });

  it('should provide an ability to update password', () => {
    settingsPage.enterNewPassword(user.newPassword);
    settingsPage.clickOnTheUpdateBtn();
    settingsPage.clickOnTheLogOutButton();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });
 });

