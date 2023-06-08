const faker = require('faker');

import settingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

/// <reference types="cypress" />
/// <reference types="../support" />

const settingsPage = new settingsPageObject();
const signInPage = new SignInPageObject();

const userData = {
  username: faker.name.firstName().toLowerCase(),
  userBio: 'I am a QA Engineer',
  email: faker.internet.email(),
  password: faker.random.number()
};

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });
  
  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  })

  it('should provide an ability to update username', () => {
    settingsPage.usernameField
      .clear()
      .type(userData.username);
    settingsPage.updateBtn
      .click();
    
    settingsPage.usernameField
      .should('have.value', userData.username);
    cy.get('.nav-link')
      .should('contain', userData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.userBioField
      .clear()
      .type(userData.userBio);
    settingsPage.updateBtn
      .click();
    settingsPage.userBioField
      .should('have.value', userData.userBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField
      .clear()
      .type(userData.email);
    settingsPage.updateBtn
      .click();
    settingsPage.emailField
      .should('have.value', userData.email);
  });

  it.only('should provide an ability to update password', () => {
    settingsPage.passwordField
      .type(userData.password);
    settingsPage.updateBtn
      .click();
    settingsPage.passwordField
      .should('have.value', userData.password);
    
    cy.clearCookies();
    cy.reload();

    signInPage.visit();
    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(userData.password);
    signInPage.signInBtn
      .click();
    
    cy.get('.nav-link')
      .should('contain', user.username);
  });

  it.only('should provide an ability to log out', () => {
    settingsPage.logoutBtn
      .click();
    cy.getCookies().should('be.empty').visit('/');
    cy.get('.navbar-nav')
      .should('contain', 'Sign in')
      .and('contain', 'Sign up');
  });
});
