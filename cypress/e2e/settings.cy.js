/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

import faker from 'faker';

describe('Settings page', () => {
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.viewport(1920, 1080);
  });

  const settingsPage = new SettingsPageObject();
  const homePage = new HomePageObject();
  const signInPage = new SignInPageObject();
  let user;
  const bio = faker.lorem.words();

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.fillUsernameField(user.username);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(user.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.checkBio(bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillEmailField(user.email);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillnewPasswordField(user.password);
    settingsPage.clickUpdateBtn();
    signInPage.visit();
    signInPage.emailField
      .type('rioth@gmail.com');
    signInPage.newPasswordField
      .type(user.password);
    signInPage.signInBtn
    .click();
    homePage.usernameLink
      .should('contain', 'riot');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
  });
});
