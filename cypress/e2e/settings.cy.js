/// <reference types="cypress" />
/// <reference types="../support" />

import { homePage } from '../support/pages/HomePage';
import { settingsPage } from '../support/pages/SettingsPage';
import { userPage } from '../support/pages/UserPage';
import { signInPage } from '../support/pages/SignInPage';

describe('Settings page', () => {
  let user;
  let edit;

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
  });
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('editUser').then((editUser) => {
      edit = editUser;
    });
  });

  it('should provide an ability to update username', () => {
    homePage.visitSetingsPage();
    settingsPage.ChangeUsernameField(edit);
    settingsPage.ClickUpdateSettings();
    userPage.AssertUserUsername(edit);
  });

  it('should provide an ability to update bio', () => {
    homePage.visitSetingsPage();
    settingsPage.ChangeBioField(edit);
    settingsPage.ClickUpdateSettings();
    userPage.AssertUserBio(edit);
  });

  it('should provide an ability to update an email', () => {
    homePage.visitSetingsPage();
    settingsPage.ChangeemailField(edit);
    settingsPage.ClickUpdateSettings();
    homePage.visitSetingsPage();
    settingsPage.ClickLogOutBtn();
    homePage.visitLoginPage();
    signInPage.typeModEmail(edit);
    signInPage.typePassword(user);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to update password', () => {
    homePage.visitSetingsPage();
    settingsPage.ChangePasswordField(edit);
    settingsPage.ClickUpdateSettings();
    homePage.visitSetingsPage();
    settingsPage.ClickLogOutBtn();
    homePage.visitLoginPage();
    signInPage.typeEmail(user);
    signInPage.typeModPassword(edit);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to log out', () => {
    homePage.visitSetingsPage();
    settingsPage.ClickLogOutBtn();
    cy.getCookie('auth').should('not.exist');

  });
});
