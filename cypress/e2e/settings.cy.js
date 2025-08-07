// cypress/e2e/settings.cy.js
/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import SettingsPage from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPage();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generated) => {
      user = generated;
      cy.login(user.email, user.username, user.password);
    });

    cy.visit('/settings');
  });

  it('updates username via data-cy selectors and persists the change', () => {
    const newUsername = `${faker.person.lastName().toLowerCase()}${faker.number.int({ min: 1000, max: 9999 })}`;

    settingsPage.changeInput('username-input', newUsername);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.checkProfileUrl(newUsername);

    cy.visit('/settings');
    settingsPage.assertInputValue('username-input', newUsername);
  });

  it('updates bio and verifies it was saved', () => {
    const newBio = faker.lorem.sentence(8);

    settingsPage.changeInput('bio-input', newBio);
    settingsPage.clickOnUpdateSettingsBtn();

    cy.visit('/settings');
    settingsPage.assertInputValue('bio-input', newBio);
  });

  it('updates email and verifies login with new email', () => {
    const newEmail = faker.internet.email();

    settingsPage.changeInput('email-input', newEmail);
    settingsPage.clickOnUpdateSettingsBtn();

    cy.visit('/settings');
    settingsPage.assertInputValue('email-input', newEmail);

    settingsPage.logout();
    cy.login(newEmail, user.username, user.password);
    cy.get('[data-cy=header-username]').should('contain.text', user.username);
  });

  it('updates password and verifies login with new password', () => {
    const newPass = faker.internet.password({ length: 12 });

    settingsPage.changeInput('password-input', newPass);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.logout();

    cy.login(user.email, user.username, user.password, { expectFailure: true });
    cy.login(user.email, user.username, newPass);
    cy.get('[data-cy=header-username]').should('contain.text', user.username);
  });

  it('logs out from settings', () => {
    settingsPage.logout();
    cy.url().should('match', /\/$/);
  });
});
