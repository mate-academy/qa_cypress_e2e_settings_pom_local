/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SetingsPageObject from '../support/pages/settings.pageObject';
// eslint-disable-next-line semi
import SignInPageObject from '../support/pages/signIn.pageObject'

const signInPage = new SignInPageObject();
const settingsPage = new SetingsPageObject();
const homePage = new HomePageObject();
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
    settingsPage.clickUpdateButton();
    settingsPage.verifyUsernameField(user.username + 'new');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillTheBioField('new');
    settingsPage.clickUpdateButton();
    settingsPage.verifyBioField('new');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillTheEmailField('qqiot10@qa.team');
    settingsPage.clickUpdateButton();
    settingsPage.verifyEmailField('qqiot10@qa.team');
    
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
    settingsPage.clickUpdateButton();

    cy.reload().clearCookies();
    cy.visit('/user/login');
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(newPass);
    cy.getByDataCy('sign-in-btn').click();
    cy.getByDataCy('profile-link').should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutButton();
    cy.get('.nav-link').should('contain', 'Sign in');
  });
});