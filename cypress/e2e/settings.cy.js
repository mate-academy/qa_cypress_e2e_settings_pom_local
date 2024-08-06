/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject.js';

const settingsPage = new SettingsPageObject();
const SignInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    cy.visit(settingsPage.url);
  });

  it('should provide an ability to update username', () => {
    const newUserName = 'stepan_bandera';
    settingsPage.usernameField
      .clear()
      .type(newUserName);
    settingsPage.clickUpdateBtn();
    settingsPage.usernameField.should('have.value', newUserName);
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'Stepan Bandera is a hero of Ukraine';
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.bioField
      .should('have.value', newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'stepan_bandera@gmail.com';
    settingsPage.emailField
      .clear()
      .type(newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.emailField.should('have.value', newEmail);
    
    cy.reload().clearCookies();
    cy.visit(SignInPage.url);
    cy.getByDataCy('email-sign-in').type(newEmail);
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    cy.getByDataCy('profile-link').should('contain', user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'SlavaUkraini2024';
    settingsPage.passwordField
      .clear()
      .type(newPassword);
    settingsPage.clickUpdateBtn();
    
    cy.reload().clearCookies();
    cy.visit(SignInPage.url);
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(newPassword);
    cy.getByDataCy('sign-in-btn').click();
    cy.getByDataCy('profile-link').should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    cy.url().should('not.include', 'settings');
    cy.contains('.nav-link', 'Sign in').should('exist');
  });
});
