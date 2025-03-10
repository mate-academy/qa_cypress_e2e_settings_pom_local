/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.page-object';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
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
    settingsPage.usernameField.should
      ('have.value', user.username + 'new');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField.type('new');
    settingsPage.updateBtn.click();
    //cy.reload();
    settingsPage.bioField.should('have.value', 'new');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.clear().type('riot1@qa.team');
    settingsPage.updateBtn.click();
    //cy.reload();
    settingsPage.emailField.should('have.value', 'riot1@qa.team');
  });

  it('should provide an ability to update password', () => {
    const newPass = '12345Qwerty!';

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
    //cy.url().should('not.include', 'settings');
    cy.get('.nav-link').should('contain', 'Sign in');
    //cy.getByDataCy('sign-in-link').should('exist');
    //cy.getCookie('drash_sess').should('have.property', 'value', 'null');
  });
});
