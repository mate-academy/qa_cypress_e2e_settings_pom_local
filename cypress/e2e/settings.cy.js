/// <reference types="cypress" />
/// <reference types="../support" />
const { faker } = require('@faker-js/faker');

import SettingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new homePageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const userNewName = faker.person.firstName().toLowerCase();

    settingsPage.reName(userNewName);
    settingsPage.clickUpdateSettingsBtn();

    homePage.assertHeaderContainUsername(userNewName);
  });

  it('should provide an ability to update bio', () => {
    const bio = faker.lorem.paragraph().toLowerCase();

    settingsPage.typeBio(bio);
    settingsPage.clickUpdateSettingsBtn();

    profilePage.assertProfilePageContainBio(bio);
  });

  it('should provide an ability to update an email', () => {
    const email = faker.internet.email().toLowerCase();

    settingsPage.changeEmail(email);
    settingsPage.clickUpdateSettingsBtn();
    cy.contains('Edit Profile Settings').click();
    settingsPage.verifyNewEmail(email);
  });

  it('should provide an ability to update password', () => {
    const password = faker.internet.password();

    settingsPage.changePassword(password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    homePage.assertHeaderNotContainUsername();
  });
});
