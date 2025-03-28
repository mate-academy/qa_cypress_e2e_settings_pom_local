/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

describe('Settings page', () => {
  const homePage = new HomePageObject();
  const settingsPage = new SettingsPageObject();

  let user;
  let settings;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateSettings').then((generateSettings) => {
      settings = generateSettings;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.login(user.email, user.username, user.password);
    cy.visit('/settings');
  });

  it('should provide an ability to update username', () => {
    settingsPage.changeUsername(settings.username);
    settingsPage.updateInfo();
    settingsPage.checkUserName(settings.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.changeBio(settings.bio);
    settingsPage.updateInfo();
    settingsPage.checkBio(settings.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.changeEmail(settings.email);
    settingsPage.updateInfo();
    settingsPage.visit();
    settingsPage.checkEmail(settings.email.toLowerCase());
  });

  it('should provide an ability to update password', () => {
    settingsPage.changePassword(settings.password);
    settingsPage.updateInfo();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();

    settingsPage.checkNoUserName();

    settingsPage.checkSingInLink();
  });
})
