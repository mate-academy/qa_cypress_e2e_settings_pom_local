/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateUsername(user.username);
    settingsPage.clickUpdateBtn();

    settingsPage.ensureProfileUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateBio(user.bio);
    settingsPage.clickUpdateBtn();

    settingsPage.ensureProfileBio(user.bio);

  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail(user.email);
    settingsPage.clickUpdateBtn();
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword(user.password);
    settingsPage.clickUpdateBtn();
  });
});
