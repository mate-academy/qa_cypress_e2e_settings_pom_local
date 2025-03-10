/// <reference types="cypress" />
/// <reference types="../support" />

import homePageObject from '../support/pages/home.pageObject';
import settingPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const faker = require('faker');
const homePage = new homePageObject();
const settingsPage = new settingPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  const userChanged = {
    username: faker.name.firstName(),
    bio: faker.lorem.words(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.login(user.email, user.username, user.password);
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.updateUsernameField(userChanged.username);
    settingsPage.clickUpdateSetBtn();

    homePage.assertUsername;
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.updateBioField(userChanged.bio);
    settingsPage.clickUpdateSetBtn();

    homePage.assertbioProfile();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.updateEmailField(userChanged.email);
    settingsPage.clickUpdateSetBtn();
    
    cy.clearCookies();
    signInPage.submitSignInForm(userChanged.email, user.password);

    homePage.assertUsername;
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.updatePasswordField(userChanged.password);
    settingsPage.clickUpdateSetBtn();

    cy.clearCookies();
    signInPage.submitSignInForm(user.email, userChanged.password);

    homePage.assertUsername;
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogOutBtn();

    cy.getByDataCy('navbar-links-logout')
      .should('contain', 'Home')
      .and('contain', 'Sign in')
      .and('contain', 'Sign up');
  });
});
