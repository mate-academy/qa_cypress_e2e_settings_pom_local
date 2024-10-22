/// <reference types="cypress" />
/// <reference types="../support" />

import UpdateSettingsPageObject
 from '../support/pages/updateSettings.pageObject.cy.js';

const userSettings = new UpdateSettingsPageObject();
let user;
const bio = 'Updated bio';

describe('Settings page', () => {
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
    userSettings.visit();
  });

  it('should provide an ability to update username', () => {
    userSettings.fillUsername(user.username);
    userSettings.submitForm();
    userSettings.assertProfile(user.username);
  });

  it('should provide an ability to update bio', () => {
    userSettings.fillBio(bio);
    userSettings.submitForm();
    userSettings.assertProfile(user.username);
  });

  it('should provide an ability to update an email', () => {
    userSettings.fillEmail(user.email);
    userSettings.submitForm();
    userSettings.assertProfile(user.username);
  });

  it('should provide an ability to update password', () => {
    userSettings.fillNewPassword(user.password);
    userSettings.submitForm();
    userSettings.assertProfile(user.username);
  });

  it('should provide an ability to log out', () => {
    userSettings.logOutSettings();
    cy.url().should('include', '/');
  });
});
