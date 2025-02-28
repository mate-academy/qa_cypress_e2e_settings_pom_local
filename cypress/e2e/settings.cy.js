/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settingsPageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(user.username);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertProfilePage(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateSettingsBtn();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.clickUpdateSettingsBtn();

  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user.password);
    settingsPage.clickUpdateSettingsBtn();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    settingsPage.assertLogout('/login');

  });
});
