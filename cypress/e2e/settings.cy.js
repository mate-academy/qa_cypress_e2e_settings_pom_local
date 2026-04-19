/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');

    cy.intercept('GET', '/api/articles*', {
      articles: [],
      articlesCount: 0,
    });

    cy.intercept('GET', '/api/articles/feed*', {
      articles: [],
      articlesCount: 0,
    });

    cy.task('generateUser').then((user) => {
      return cy.register(user.email, user.username, user.password).then(() => {
        signInPage.visit();
        signInPage.typeEmail(user.email);
        signInPage.typePassword(user.password);
        signInPage.clickSignInBtn();

        cy.getByDataCy('settings-link').click();
      });
    });
  });

  it('should provide an ability to update username', () => {
    cy.task('generateUser').then((updatedUser) => {
      settingsPage.typeUsername(updatedUser.username);
      settingsPage.clickUpdateSettingsBtn();

      homePage.assertHeaderContainUsername(updatedUser.username);
    });
  });

  it('should provide an ability to update bio', () => {
    cy.task('generateUser').then((updatedUser) => {
      settingsPage.typeBio(updatedUser.bio);
      settingsPage.clickUpdateSettingsBtn();

      settingsPage.bioField.should('have.value', updatedUser.bio);
    });
  });

  it('should provide an ability to update an email', () => {
    cy.task('generateUser').then((updatedUser) => {
      settingsPage.typeEmail(updatedUser.email);
      settingsPage.clickUpdateSettingsBtn();

      settingsPage.emailField.should('have.value', updatedUser.email);
    });
  });

  it('should provide an ability to update password', () => {
    cy.task('generateUser').then((updatedUser) => {
      settingsPage.typePassword(updatedUser.password);
      settingsPage.clickUpdateSettingsBtn();

      cy.location('pathname').should('include', '/profile/');
    });
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    cy.location('pathname').should('eq', '/');
  });
});