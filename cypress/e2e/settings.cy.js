/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/SettingsPageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    cy.signIn(user.email, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();
    settingsPage.updateUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    settingsPage.updateBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();
    settingsPage.updateEmail(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();
    settingsPage.updatePassword(newPassword);
  });

  it('should provide an ability to log out', () => {
  });
});
