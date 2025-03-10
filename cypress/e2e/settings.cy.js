/// <reference types="cypress" />
/// <reference types="../support" />
const faker = require('faker');

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

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.register(user.email, user.username, user.password);

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName();

    settingsPage.visit();
    settingsPage.fillUsernameField(newUsername);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.words();

    settingsPage.visit();
    settingsPage.fillBioField(newBio);
    settingsPage.clickUpdateBtn();
    homePage.clickUsernameLink();
    profilePage.assertProfileInfo(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();

    settingsPage.visit();
    settingsPage.fillEmailField(newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.assertEmailField(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.random.alphaNumeric(8);

    settingsPage.visit();
    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();

    settingsPage.clickOnLogOutBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    
    settingsPage.visit();
    settingsPage.clickOnLogOutBtn();
    homePage.assertUserIsNotLoggedIn();
    });
});
