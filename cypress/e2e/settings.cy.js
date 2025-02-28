/// <reference types="cypress" />
/// <reference types="../support" /

import { settings } from 'cluster';
import SettingsPage from '../support/pages/settings.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {

    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeUsername(`${user.username}${user.randomNumber}`);
    settingsPage.clickOnUpdateSettings();
    homePage.assertHeaderContainUsername(`${user.username}${user.randomNumber}`);
  });

  it('should provide an ability to update bio', () => {

    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeBio(`${user.bio}`);
    settingsPage.clickOnUpdateSettings();
    profilePage.visit(user.username);
    profilePage.assertBioIsExist(user.bio);
  });

  it('should provide an ability to update an email', () => {

    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeEmail(user.emailChanged);
    settingsPage.clickOnUpdateSettings();
    settingsPage.visit();
    settingsPage.assertEmail(user.emailChanged);
  });

  it('should provide an ability to update password', () => {

    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typePassword(user.passwordChanged);
    settingsPage.clickOnUpdateSettings();
    cy.loginOnly(user.email, user.passwordChanged);
    settingsPage.visit();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {

    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickOnLogOut();
    cy.getCookie('auth').should('not.exist');
  });
});
