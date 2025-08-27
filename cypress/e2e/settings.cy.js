/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let newUserData;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
    cy.task('generateUser').then((generateUser) => {
      newUserData = generateUser;
      newUserData.bio = faker.lorem.paragraph({ min: 1, max: 3 });
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(newUserData.username);

    settingsPage.clickUpdateSettingsBtn();

    homePage.assertHeaderContainUsername(newUserData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(newUserData.bio);

    settingsPage.clickUpdateSettingsBtn();

    homePage.checkUserBio(newUserData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newUserData.email);

    settingsPage.clickUpdateSettingsBtn();

    cy.url().should('include', `/profile/${user.username}`);

    settingsPage.visit();

    settingsPage.logout();

    signInPage.visit();

    signInPage.typeEmail(newUserData.email);
    signInPage.typePassword(user.password);

    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(newUserData.password);

    settingsPage.clickUpdateSettingsBtn();

    cy.url().should('include', `/profile/${user.username}`);

    settingsPage.visit();

    settingsPage.logout();

    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(newUserData.password);

    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();

    homePage.isConduitHomePage();
  });
});
