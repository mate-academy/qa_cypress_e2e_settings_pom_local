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
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });    
  });

  beforeEach(() => {    
    cy.register(user.email, user.username, user.password);
    signInPage.visit(); 
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();    
    homePage.assertHeaderContainUsername(user.username);
  });

  beforeEach(() => {
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.userNameField.clear();
    settingsPage.typeUserName('new' + user.username);
    settingsPage.clickUpdateSettings();
    homePage.assertHeaderContainUsername('new' + user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateSettings();
    settingsPage.visit();
    settingsPage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.clear();
    settingsPage.typeEmail('new' + user.email);
    settingsPage.clickUpdateSettings();
    settingsPage.visit();
    settingsPage.assertMail('new' + user.email);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'new' + user.password;
    settingsPage.passwordField.clear();
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettings();

    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });
});
