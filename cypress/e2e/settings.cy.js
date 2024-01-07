/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let updateData;
  let user;

  before(() => {
    cy.task('generateUpdateData').then((generateUpdateData) => {
      updateData = generateUpdateData;
    });
    
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    homePage.visit();
    homePage.clickSettingsLink();
    settingsPage.typeUsernameField('-updated');
    settingsPage.clickUpdateButton();
    settingsPage.assertHeaderContainUsername(user.username + '-updated');
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    homePage.visit();
    homePage.clickSettingsLink();
    settingsPage.typeBioField(updateData.bio);
    settingsPage.clickUpdateButton();
    homePage.clickSettingsLink();
    settingsPage.assertBio(updateData.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    homePage.visit();
    homePage.clickSettingsLink();
    settingsPage.clearEmail();
    settingsPage.typeEmailField(updateData.email);
    settingsPage.clickUpdateButton();
    homePage.clickSettingsLink();
    settingsPage.assertEmail(updateData.email);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    homePage.visit();
    homePage.clickSettingsLink();
    settingsPage.typePasswordField(updateData.password);
    settingsPage.clickUpdateButton();
    homePage.clickSettingsLink();
    settingsPage.clickLogoutButton();
    homePage.clickSignInLink();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(updateData.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    homePage.visit();
    homePage.clickSettingsLink();
    settingsPage.clickLogoutButton();
    homePage.assertHeaderNotContainUsername(user.username);
  });
});
