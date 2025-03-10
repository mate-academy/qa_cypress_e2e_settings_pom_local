/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

const faker = require('faker');

describe('Settings page', () => {

  let user;
  const newUsername = faker.name.firstName().toLowerCase();
  const newBio = faker.random.words(1);
  const newEmail = faker.internet.email().toLowerCase();
  const newPassword = 'Password1!';
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
      cy.visit('/settings');
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.fillEmptyUsernameField(newUsername);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(newBio);
    settingsPage.clickUpdateBtn();
    profilePage.assertUserInfo(newBio);

  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillEmptyEmailField(newEmail);
    settingsPage.clickUpdateBtn();
    cy.clearCookies();
    signInPage.visit();
    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();
    cy.clearCookies();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
    homePage.usernameLink.should('not.exist');
  });
});