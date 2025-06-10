/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const bio = faker.person.bio();
const newUsername = 'bob';
const username = 'riot';
const email = 'riot@qa.team';
const newEmail = faker.internet.email().toLowerCase();
const password = 'test111';

describe('Settings page', () => {
  let user;
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login();
    cy.reload();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {

    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateButton();
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(bio);
    settingsPage.clickUpdateButton();
    cy.get('[data-cy=profile-bio]').contains(bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateButton();
    settingsPage.visit();
    settingsPage.emailField.should('have.value', newEmail);

  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(password);
    settingsPage.clickUpdateButton();
    cy.logout();
    signInPage.visit();
    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(username);
  });

  it('should provide an ability to log out', () => {
    cy.logout();
    cy.get('[data-cy="navbar-signIn"]').should('exist');
  });
});
