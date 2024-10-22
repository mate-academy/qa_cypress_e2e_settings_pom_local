/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login();
    cy.visit(settingsPage.url);
  });

  it('should provide an ability to update username', () => {
    const newUsername = 'newUserName123';
    settingsPage.updateUsername(newUsername);
    settingsPage.assertUsernameContains(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'This is my new bio';
    settingsPage.updateBio(newBio);
    settingsPage.assertBioContains(newBio);
  });

  it('should provide an ability to update email', () => {
    const newEmail = 'newemail@example.com';
    settingsPage.updateEmail(newEmail);
    settingsPage.loginWithNewEmail(newEmail, user.password);
    cy.url().should('include', '/');   
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'newSecurePassword!';
    settingsPage.updatePassword(newPassword);
    settingsPage.loginWithNewPassword(user.email, newPassword);
    cy.url().should('include', '/'); 
  });
});
