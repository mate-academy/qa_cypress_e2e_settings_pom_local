/// <reference types="cypress" />
/// <reference types="../support" />


import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('generateUser').then((generatedUser1) => {
      newUser = generatedUser1;
    });
    cy.task('generateUser').then((generatedUser2) => {
      user = generatedUser2;
      cy.register(
        generatedUser2.email,
        generatedUser2.username,
        generatedUser2.password
      );
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUserName(newUser.username);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(newUser.username);
    settingsPage.clickUpdateBtn();
    cy.visit(`/profile/${user.username}`);
    profilePage.assertContainBio(newUser.username);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newUser.email);
    settingsPage.clickUpdateBtn();
    settingsPage.clickLogoutBtn();
    cy.loginOnly(newUser.email, user.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(newUser.password);
    settingsPage.clickUpdateBtn();
    settingsPage.clickLogoutBtn();
    cy.loginOnly(user.email, newUser.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.checkNotAuthorized();
  });
});
