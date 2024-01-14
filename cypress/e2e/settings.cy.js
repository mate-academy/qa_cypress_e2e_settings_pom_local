/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import { sign } from 'crypto';
const { faker } = require('@faker-js/faker');

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let testData;
  before(() => {
    cy.task('db:clear');
  });

  before(() => {
    
    testData = {
      username: faker.person.firstName().toLowerCase(),
      password: faker.internet.password(),
      bio: faker.lorem.words(7),
      email: faker.internet.email().toLowerCase() 
    };
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(testData.username);
    settingsPage.clickOnButton('update');

    cy.getByDataCy('profile-link').should('have.text', testData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(testData.bio);
    settingsPage.clickOnButton('update');

    cy.getByDataCy('user-bio').should('have.text', testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(testData.email);
    settingsPage.clickOnButton('update');
    settingsPage.visit();
    
    settingsPage.assertEmailField(testData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(testData.password);
    settingsPage.clickOnButton('update');
  
    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.password);
    signInPage.clickSignInBtn();
    homePage.visit();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnButton('logout');

    homePage.usernameLink.should('not.exist');
  });
});
