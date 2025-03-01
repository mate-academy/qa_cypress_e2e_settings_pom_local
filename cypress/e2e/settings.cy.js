/// <reference types="cypress" />
/// <reference types="../support" />

const faker = require('faker');
import settingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import homePageObject from "../support/pages/home.pageObject";

const settingsPage = new settingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new homePageObject();

const testData = {
  username: faker.name.firstName().toLowerCase(),
  userBio: 'I am Oleh Horyk',
  email: 'oleh888@qa.team',
  password: 'Oleh1234!'
};

describe('Settings page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to update username', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.usernameField
      .clear()
      .type(testData.username);
    settingsPage.updateBtn
      .click();
    settingsPage.usernameField
      .should('have.value', testData.username);
    homePage.usernameLink
      .should('contain', testData.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.userBioField
      .clear()
      .type(testData.userBio);
    settingsPage.updateBtn
      .click();
    settingsPage.userBioField
      .should('have.value', testData.userBio);
  });

  it('should provide an ability to update an email', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.emailField
      .clear()
      .type(testData.email);
    settingsPage.updateBtn
      .click();
    settingsPage.emailField
      .should('have.value', testData.email);
  });

  it('should provide an ability to update password', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.passwordField
      .type(testData.password)
    settingsPage.updateBtn
      .click();
    settingsPage.passwordField
      .should('have.value', testData.password);
    cy.clearCookies();
    cy.reload();
    signInPage.visit();
    signInPage.emailField
      .type('riot@qa.team');
    signInPage.passwordField
      .type(testData.password);
    signInPage.signInBtn
      .click();
    homePage.usernameLink
      .should('contain', 'riot');
  });

  it('should provide an ability to log out', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.logoutBtn
      .click();
    cy.getCookies()
      .should('be.empty')
      .visit('/');
    cy.get('.navbar-nav')
      .should('contain', 'Sign in')
      .and('contain', 'Sign up');
  });
});
