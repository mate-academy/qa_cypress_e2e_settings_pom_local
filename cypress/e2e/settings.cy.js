/// <reference types="cypress" />
/// <reference types="../support" />

import { SettingsPageObject } from '../support/pages/settings.pageObject';
import {HomePageObject} from '../support/pages/home.pageObject';


const settingPageObject = new SettingsPageObject();


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
    settingPageObject.visit();
    settingsPage.typeNewUsername(user.newUsername);
    settingPageObject.updateSettingButton;
    settingsPage.usernameField.should('have.value', user.newUsername);
});

it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingPageObject.visit();
    settingPageObject.bioField.type(user.bio);
    settingPageObject.updateSettingButton;
    settingsPage.bioField.should('have.value', user.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingPageObject.visit();
    settingPageObject.emailField.clear().type(user.newEmail);
    settingPageObject.updateSettingButton;
    settingsPage.emailField.should('have.value', user.newEmail);
  });

it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingPageObject.visit();
    settingPageObject.passwordField.clear().type(user.newPassword);
    settingPageObject.updateSettingButton;
  settingsPage.passwordField.should('have.value', user.newPassword);
   });

    it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingPageObject.visit();
    cy.getByDataCy('logout-button').click();
     settingsPage.clickOnLogoutButton();
      settingsPage.assertUserLoggedOut();
   });
});



