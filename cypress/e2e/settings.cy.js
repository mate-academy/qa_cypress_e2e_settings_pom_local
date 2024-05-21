/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

describe('Settings page', () => {
  let user;
  const settingsPage = new SettingsPageObject();
  const homePage = new HomePageObject();
  const signInPage = new SignInPageObject();
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.assertUsernameField(user.username);

    settingsPage.typeInUsernameField(`${user.username}${user.randomNumber}`);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertUsernameField(`${user.username}${user.randomNumber}`);
    homePage.assertHeaderContainUsername(`${user.username}${user.randomNumber}`);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.typeInBioField(user.bio);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertBioField(user.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.assertEmailField(user.email);
    
    settingsPage.typeInEmailField(`${user.randomNumber}${user.email}`);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertEmailField(`${user.randomNumber}${user.email}`);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.typeInPasswordField(`${user.password}${user.randomNumber}`);
    settingsPage.clickOnUpdateSettingsBtn();
    
    settingsPage.visit();
    settingsPage.clickOnLogOutBtn();

    homePage.visit();
    homePage.assertHeaderContainsSignInLink();
    homePage.clickOnSignInLink();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(`${user.password}${user.randomNumber}`);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });
});
