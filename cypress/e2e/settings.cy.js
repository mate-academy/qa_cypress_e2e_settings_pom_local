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
    settingsPage.fillTheUsernameField('new');
    settingsPage.updateBtn.click();
    settingsPage.usernameField.should('have.value', user.username + 'new');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillTheBioField('new');
    settingsPage.updateBtn.click();
    settingsPage.bioField.should('have.value', 'new');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillTheEmailField('qqiot10@qa.team');
    settingsPage.updateBtn.click();
    settingsPage.emailField.should('have.value', 'qqiot10@qa.team');

    // Логін з новим email
    cy.reload().clearCookies();
    cy.visit('/user/login');
    cy.getByDataCy('email-sign-in').type('qqiot10@qa.team');
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    cy.getByDataCy('profile-link').should('contain', user.username);
  });

  it('should provide an ability to update password', () => {
    const newPass = 'qqiot10@qa!';
    settingsPage.fillThePasswordField(newPass);
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