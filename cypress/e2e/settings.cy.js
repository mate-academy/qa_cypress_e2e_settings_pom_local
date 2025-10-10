/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import {
  generateUsername,
  generateEmail,
  generatePassword,
  generateBio,
} from '../support/utils/generators';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      cy.login(
        generatedUser.email,
        generatedUser.username,
        generatedUser.password
      );
      user = generatedUser;
      cy.visit('/settings');
    });
  });

  it('should update username and persist changes', () => {
    const newUsername = generateUsername();

    settingsPage.changeUsername(newUsername);
    settingsPage.clickOnUpdateSettingsBtn();

    cy.visit('/settings');
    settingsPage.usernameInput.should('have.value', newUsername);
  });

  it('should update bio and persist changes', () => {
    const newBio = generateBio();

    settingsPage.changeBio(newBio);
    settingsPage.clickOnUpdateSettingsBtn();

    cy.visit('/settings');
    settingsPage.bioInput.should('have.value', newBio);
  });

  it('should update email and persist changes', () => {
    const newEmail = generateEmail();

    settingsPage.changeEmail(newEmail);
    settingsPage.clickOnUpdateSettingsBtn();

    cy.visit('/settings');
    settingsPage.emailInput.should('have.value', newEmail);
  });

  it('should update password and allow login with the new one', () => {
    const newPass = generatePassword();

    settingsPage.changePassword(newPass);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.clickLogout();

    cy.login(user.email, user.username, newPass);
    cy.contains(user.username).should('be.visible');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogout();
    cy.url().should('include', '/');
  });
});
