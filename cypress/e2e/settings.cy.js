/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable max-len */
/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject.js';
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
describe('Settings page', () => {
  let user1;
  let user2;
 

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((newuser) => {
      user1 = newuser;

      
      cy.login(user1.email, user1.username, user1.password);

      signInPage.visit();
      cy.assertPageUrl('/user/login');
     
      settingsPage.visit();
      cy.assertPageUrl('/settings');
    });
    // user2 is only used as a local set of new values !!!
    cy.task('generateUser').then((newuser) => {
      user2 = newuser;

  
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.userNameField.should('have.value', user1.username);
    settingsPage.userNameField.clear();
    settingsPage.typeUserName(user2.username);
    settingsPage.submitButton.contains('Update Settings');
    settingsPage.updateSettings();
    settingsPage.visit();
    settingsPage.userNameField.should('have.value', user2.username);
  });

  it('should provide an ability to update bio', () => {
    // cy.log(user1.bio);
    // settingsPage.bioField.should('have.value', user1.bio);
    settingsPage.bioField.clear();
    settingsPage.typeBio(user2.bio);
    settingsPage.submitButton.contains('Update Settings');
    settingsPage.updateSettings();
    settingsPage.bioField.should('have.value', user2.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.should('have.value', user1.email);
    settingsPage.emailField.clear();
    settingsPage.typeEmail(user2.email);
    settingsPage.submitButton.contains('Update Settings');
    settingsPage.updateSettings();
    settingsPage.emailField.should('have.value', user2.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordField.should('have.value', '');

    settingsPage.typePassword(user2.password);
    settingsPage.submitButton.contains('Update Settings');
    settingsPage.updateSettings();
    cy.assertPageUrl('/profile/' + user1.username);
    // settingsPage.passwordField.should('have.value', user2.password);
  });

  it('should provide an ability to update username, bio, email and password', () => {
    settingsPage.userNameField.should('have.value', user1.username);
    settingsPage.userNameField.clear();
    settingsPage.typeUserName(user2.username);

    settingsPage.userNameField.should('have.value', user2.username);
    settingsPage.bioField.should('have.value', '');

    settingsPage.typeBio(user2.bio);

    settingsPage.bioField.should('have.value', user2.bio);
    settingsPage.emailField.should('have.value', user1.email);
    settingsPage.emailField.clear();
    settingsPage.typeEmail(user2.email);

    settingsPage.emailField.should('have.value', user2.email);
    settingsPage.passwordField.should('have.value', '');

    settingsPage.typePassword(user2.password);

    // settingsPage.passwordField.should('have.value', user2.password);
    settingsPage.submitButton.contains('Update Settings');
    settingsPage.updateSettings();
    cy.assertPageUrl('/profile/' + user2.username);


  });

  it('should provide an ability to log out', () => {
    settingsPage.submitButton.contains('Update Settings');
    settingsPage.logoutSettings();
    cy.assertPageUrl('/');
  });
});
