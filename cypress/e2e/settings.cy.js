/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const progilePage= new ProfilePageObject();

const { faker } = require('@faker-js/faker');

describe('Settings page', () => {
  let user;
  const settingsData = {
    username: faker.person.firstName().toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    bio: faker.lorem.sentence()
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser')
      .then((generateUser) => {
        user = generateUser;
        cy.login(user.email, user.username, user.password);
        settingsPage.visit();
      });
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearUsernameField();
    settingsPage.fillUsernameField(settingsData.username);
    settingsPage.clickOnUpdateSettingsBtn();
    homePage.assertHeaderContainUsername(settingsData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(settingsData.bio);
    settingsPage.clickOnUpdateSettingsBtn();
    progilePage.assertBioField(settingsData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearEmailField();
    settingsPage.fillEmailField(settingsData.email);
    settingsPage.clickOnUpdateSettingsBtn();
    //cy.contains('My Posts').should('be.visible');
    settingsPage.visit();
    settingsPage.assertEmailField(settingsData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField(settingsData.password);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.clickOnLogOutBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(settingsData.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogOutBtn();
    cy.contains('Sign in').should('be.visible');
  });
});
