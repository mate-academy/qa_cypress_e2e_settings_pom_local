/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signIn = new SignInPageObject();
const faker = require('faker');

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName().toLowerCase();
    cy.login();
    settingsPage.visitSettings();
    settingsPage.typeUserName(newUsername);
    settingsPage.clickUpdateButton();
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    cy.login();
    settingsPage.visitSettings();
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateButton();
    homePage.clickSettingsButton();
    settingsPage.assertBioField(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.exampleEmail().toLowerCase();
    cy.login();
    settingsPage.visitSettings();
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateButton();
    homePage.clickSettingsButton();
    settingsPage.assertEmailField(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();
    cy.login(user.email, user.username, user.password);
    settingsPage.visitSettings();
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateButton();
    homePage.clickSettingsButton();
    settingsPage.clickLogOutButton();
    signIn.visitSignIn();
    signIn.typeEmail(user.email);
    signIn.typePassword(newPassword);
    signIn.clickSignInButton();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login();
    settingsPage.visitSettings();
    settingsPage.clickLogOutButton();
    homePage.assertHomePageUrl();
  });
});
