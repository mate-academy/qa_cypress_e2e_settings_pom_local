/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let newUser = {
    password: '1qazXSW@',
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.login();
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeUsername(user.username);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertHeaderContainUsername(user.username);
    settingsPage.visit();
    settingsPage.usernameField.should('have.value', user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeBio(user.bio);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.bioField.should('contain', user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeEmail(user.email);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.visit();
    settingsPage.emailField.should('have.value', user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typePassword(newUser.password);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.visit();
    settingsPage.clickOnLogoutButton();
    signInPage.visit();
    signInPage.typeEmail('riot@qa.team');
    signInPage.typePassword(newUser.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('riot');
  });

  it('should provide an ability to log out', () => {});
});
