/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingPageObject from '../support/pages/setting.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject(); 
const settingPage = new SettingPageObject();
const homePage = new homePageObject();

describe('Settings page', () => {
  let user;
  let newUser;
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateNewUser').then(generateNewUser => {
        newUser = generateNewUser;
    });
  });

  it('should provide an ability to update username', () => {
    signInPage.visit();
    cy.login(user.email, user.username, user.password);

    settingPage.visit();
    settingPage.usernameField
      .clear()
      .type(newUser.username)

    settingPage.updateSettingsBtn
      .click();
    
    homePage.usernameLink
      .should('contain', newUser.username);
  });

  it('should provide an ability to update bio', () => {
    signInPage.visit();
    cy.login(user.email, user.username, user.password);

    settingPage.visit();
    settingPage.bioField
      .type(newUser.bio)

    settingPage.updateSettingsBtn
      .click();
  });

  it('should provide an ability to update an email', () => {
    signInPage.visit();
    cy.login(user.email, user.username, user.password);

    settingPage.visit();
    settingPage.emailField
      .clear()
      .type(newUser.email)

    settingPage.updateSettingsBtn
      .click();
  });

  it('should provide an ability to update password', () => {
    signInPage.visit();
    cy.login(user.email, user.username, user.password);

    settingPage.visit();
    settingPage.passwordField
      .type(newUser.password)

    settingPage.updateSettingsBtn
      .click();
  });

  it('should provide an ability to log out', () => {
    signInPage.visit();
    cy.login(user.email, user.username, user.password);

    settingPage.visit();

    settingPage.logoutBtn
      .click();
  });
});
