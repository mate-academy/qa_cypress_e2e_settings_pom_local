const faker = require("faker");

/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  const testData = {
    newUsername: faker.name.firstName().toLowerCase(),
    newBio: faker.lorem.paragraph(),
    newEmail: faker.internet.email().toLowerCase(),
    newPassword: 'masterCypress123'
  }

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeNewUsername(testData.newUsername);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertContainNewUsername(testData.newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeNewBio(testData.newBio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertContainNewBio(testData.newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeNewEmail(testData.newEmail);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.visit();
    settingsPage.assertContainNewEmail(testData.newEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typeNewPassword(testData.newPassword);
    settingsPage.clickUpdateSettingsBtn();

    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail('riot@qa.team');
    signInPage.typePassword(testData.newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('riot');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
    
    homePage.usernameLink.should('not.exist');
  });
});
