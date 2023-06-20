/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateWrongCredentialsUser').then(generateWrongCredentialsUser => {
      newUser = generateWrongCredentialsUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.usernameField
      .clear()
      .type(newUser.username);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertUsername(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.bioField
      .type(user.bio);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.emailField
      .clear()
      .type(newUser.email);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertEmail(newUser.email);
  });


  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.newPasswordField
      .type(newUser.password);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.clickOnLogOutBtn();

    signInPage.visit();

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(newUser.password);
    signInPage.signInBtn
      .click();

    settingsPage.assertUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.clickOnLogOutBtn();

    settingsPage.assertLoggingOut();
  });
});
