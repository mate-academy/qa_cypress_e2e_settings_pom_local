/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import SettingsPageObject from '../support/pages/setting.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let randomNumber;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.login(user.email, user.username, user.password);
    });
    
    randomNumber = Math.ceil(Math.random(1000) * 1000);

    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
  settingsPage.openSettings();

  const newUsername = user.username + `${randomNumber}`;

  settingsPage.updateField(settingsPage.usernameInput, newUsername);

  settingsPage.userProfileName.should('have.text', newUsername);
  });

  it('should provide an ability to update bio', () => {
  settingsPage.openSettings();

  const newUserBio = faker.lorem.words();

  settingsPage.updateField(settingsPage.userBioInput, newUserBio);

  settingsPage.userProfileBio.should('have.text', newUserBio);
  });

  it('should provide an ability to update an email', () => {
  settingsPage.openSettings();

  const newUserEmail = 'test'+`${randomNumber}`+'@mail.com';

  settingsPage.updateField(settingsPage.emailInput, newUserEmail);

  settingsPage.visit('/settings');

  settingsPage.emailInput.should('have.value', newUserEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.openSettings();

    const newUserPassword = user.password + `${randomNumber}`;

    settingsPage.updateField(settingsPage.passwordInput, newUserPassword);

    settingsPage.openSettings();
    settingsPage.logoutBtn.click();

    settingsPage.signInBtn.click();
    settingsPage.signInEmail.type(user.email);
    settingsPage.signInPassword.type(newUserPassword);
    settingsPage.signInSubmit.click();

    cy.get('[data-cy="no-articles-message"]').should('be.visible');
  });

  it('should provide an ability to log out', () => {
    settingsPage.openSettings();

    settingsPage.logoutBtn.click();

    cy.get('[data-cy="main-logo"]').should('be.visible');
  });
});
