/// <reference types="cypress" />
/// <reference types="../support" />
const faker = require("faker");

import homePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const homePage = new homePageObject();
const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();
const randomNumber = Math.floor(Math.random(1000) * 1000);

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
    cy.login(user.username, user.email, user.password);
    homePage.visit();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const usernameDraft = faker.name.lastName() + randomNumber;
    const newUsername = usernameDraft.toLowerCase();

    settingsPage.typeUsername(newUsername);
    settingsPage.clickOnSubmitButton();
    profilePage.assertProfileContainsInfo(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const bio = faker.lorem.words();

    settingsPage.typeBio(bio);
    settingsPage.clickOnSubmitButton();
    profilePage.assertProfileContainsInfo(bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.clickOnSubmitButton();
    profilePage.clickOnSettingsLink();
    settingsPage.assertEditVewEmail(user.email);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.random.word() + randomNumber;
    homePage.assertHeaderContainUsername(user.username);
    settingsPage.typePassword(newPassword);
    settingsPage.clickOnSubmitButton();
    profilePage.clickOnSettingsLink();
    settingsPage.clickLogoutButton();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutButton();
    homePage.assertHeaderNotContainsUsername();
  });
});
