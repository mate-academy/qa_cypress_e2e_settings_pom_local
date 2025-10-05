/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPage from '../support/pages/settings.pageObject';
import {
  generateUsername,
  generateEmail,
  generatePassword,
  generateBio,
} from '../support/helpers/fakerHelpers';

const settingPage = new SettingsPage();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((seed) => {
      cy.request('POST', '/api/users', {
        user: {
          username: seed.username,
          email: seed.email,
          password: seed.password,
        },
      });

      user = seed;

      cy.login(seed.email, seed.username, seed.password);
      cy.visit('/settings');
    });
  });

  it('updates username and persists', () => {
    const newUsername = generateUsername();

    settingPage.changeItem('username', newUsername);
    settingPage.clickOnUpdateSettingsBtn();

    settingPage.checkUrl(newUsername);

    cy.visit('/settings');
    // eslint-disable-next-line max-len
    cy.get('[data-cy="settings-username-input"]').should('have.value', newUsername);

    cy.then(() => { user.username = newUsername; });
  });

  it('updates bio and persists', () => {
    const newBio = generateBio();

    settingPage.changeItem('bio', newBio);
    settingPage.clickOnUpdateSettingsBtn();

    cy.visit('/settings');
    cy.get('[data-cy="settings-bio-input"]').should('have.value', newBio);
  });

  it('updates email and persists', () => {
    const newEmail = generateEmail();

    settingPage.changeItem('email', newEmail);
    settingPage.clickOnUpdateSettingsBtn();

    cy.visit('/settings');
    cy.get('[data-cy="settings-email-input"]').should('have.value', newEmail);

    cy.then(() => { user.email = newEmail; });
  });

  it('updates password and can re-login', () => {
    const newPass = generatePassword();

    settingPage.changeItem('password', newPass);
    settingPage.clickOnUpdateSettingsBtn();

    settingPage.logoutBtn.click();

    cy.login(user.email, user.username, newPass);
    cy.url().should('not.include', '/login');
  });

  it('logs out via data-cy selector', () => {
    settingPage.logoutBtn.click();
    cy.url().should('include', '/');
  });
});
