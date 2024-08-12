/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.page-object';

describe('Settings page', () => {
  const settingsPage = new SettingsPageObject();
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.usernameField.type('new');
    settingsPage.updateBtn.click();
    settingsPage.usernameField.should('have.value', user.username + 'new');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField.type('new');
    settingsPage.updateBtn.click();
    settingsPage.bioField.should('have.value', 'new');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.clear().type('qqiot10@qa.team');
    settingsPage.updateBtn.click();
    settingsPage.emailField.should('have.value', 'qqiot10@qa.team');
  });

  it('should provide an ability to update password', () => {
    const newPass = 'qqiot10@qa!';
    settingsPage.passwordField.type(newPass);
    settingsPage.updateBtn.click();
    cy.reload().clearCookies();
    cy.visit('/user/login');
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(newPass);
    cy.getByDataCy('sign-in-btn').click();
    cy.getByDataCy('profile-link').should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutBtn.click();
    cy.get('.nav-link').should('contain', 'Sign in');
  });
});