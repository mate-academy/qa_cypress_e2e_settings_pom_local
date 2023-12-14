/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
const { faker } = require('@faker-js/faker');

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  const user = {
    username: faker.person.firstName().toLowerCase(),
    password: faker.internet.password(),
    bio: faker.lorem.words(10),
    email: faker.internet.email().toLowerCase(),
  };

  before(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
  });

  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(user.username);
    settingsPage.clickOnButton('update');
    cy.getByDataCy('profile-link').should('have.text', user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickOnButton('update');
    cy.get('[data-cy="user-bio"]').should('have.text', user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.clickOnButton('update');
    cy.url().should('include', '/profile');
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user.password);
    settingsPage.clickOnButton('update');
    cy.url().should('include', '/profile');
  });

  it.skip('should provide an ability to log out', () => {
    
  });
});
