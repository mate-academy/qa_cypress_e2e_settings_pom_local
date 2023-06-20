/// <reference types="cypress" />
/// <reference types="../support" />


import registratePageObject from '../support/pages/registrate.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const registrate = new registratePageObject();
const settings = new SettingsPageObject();
const homePage = new homePageObject();
const faker = require('faker');

const userData = {
  usernameData: faker.name.firstName().toLowerCase(),
  userBio: 'Burning ass',
  emailData: faker.internet.email(),
  passwordData: faker.internet.password()
};

describe('Settings page', () => {
  
  beforeEach(() => {
    cy.task('db:clear');
  })

  it('should provide an ability to update username', () => {
    cy.login();
    settings.visit();
    settings.updateUserName
    .clear()
    .type(userData.usernameData);

    settings.submitButton
    .click();

    settings.updateUserName
      .should('have.value', userData.usernameData);
    cy.get('.nav-link')
      .should('contain', userData.usernameData);
    
  });

  it('should provide an ability to update bio', () => {
    cy.login();
    settings.visit();
    settings.updateShortBio
    .type(userData.userBio);

    settings.submitButton
    .click();

    settings.updateShortBio
    .should('have.value', userData.userBio);
  });

  it('should provide an ability to update an email', () => {
    cy.login();

    settings.visit();

    settings.updateEmail
    .clear()
    .type(userData.emailData);

    settings.submitButton
    .click();

    settings.updateEmail
    .should('have.value', userData.emailData);

  });

  it('should provide an ability to update password', () => {
    cy.login();

    settings.visit();

    settings.updatePassword
    .type(userData.passwordData);

    settings.submitButton
    .click();

    settings.updatePassword
    .should('have.value', userData.passwordData);

  });

  it('should provide an ability to log out', () => {
    cy.login();
    settings.visit();
    settings.logoutBtn
      .click();
    cy.getCookies()
      .should('be.empty')
      .visit('/');
    cy.get('.navbar-nav')
      .should('contain', 'Sign in')
      .and('contain', 'Sign up');

  });
});
