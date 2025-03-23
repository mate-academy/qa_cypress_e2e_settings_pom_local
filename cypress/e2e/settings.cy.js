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
    homePage.visit();
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(settings.username);
    settingsPage.clickUpdateBtn();
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(settings.bio);
    settingsPage.clickUpdateBtn();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(settings.email);
    settingsPage.clickUpdateBtn();
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(settings.password);
    settingsPage.clickUpdateBtn();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
  });
});
