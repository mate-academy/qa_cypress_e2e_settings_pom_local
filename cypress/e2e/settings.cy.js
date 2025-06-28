/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

describe('Settings page', () => {
  const profilePage = new ProfilePageObject();
  const settingsPage = new SettingsPageObject();

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser')
      .as('user')
      .then(({ email, username, password }) => {
        cy.login(email, username, password);
        settingsPage.visit();
      });
  });

  it('should provide an ability to update username', () => {
    cy.task('generateUser').then(({ username }) => {
      settingsPage.fillUsername(username);
      settingsPage.updateSettings();

      profilePage.checkUsernameValue(username);
    });
  });

  it('should provide an ability to update bio', () => {
    const bio = faker.lorem.paragraph();

    settingsPage.fillBio(bio);
    settingsPage.updateSettings();

    profilePage.checkBioValue(bio);
  });

  it('should provide an ability to update an email', () => {
    cy.task('generateUser').then(({ email }) => {
      settingsPage.fillEmail(email);
      settingsPage.updateSettings();

      settingsPage.visit();
      settingsPage.checkEmailValue(email);
    });
  });

  it('should provide an ability to update password', function () {
    cy.task('generateUser').then(({ password }) => {
      settingsPage.fillPassword(password);
      settingsPage.updateSettings();

      const email = this.user.email;

      cy.request('POST', 'api/users/login', {
        user: { email, password },
      }).should((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('should provide an ability to log out', () => {});
});
