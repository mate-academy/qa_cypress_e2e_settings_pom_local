/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
const newName = faker.internet.userName();
const newBio = faker.lorem.text();
const newEmail = faker.internet.email();
const newPassword = faker.internet.password();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      signInPage.visit();
      cy.register(user.email, user.username, user.password);

      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
      settingsPage.visit();
    });
  });

  it.only('should provide an ability to update username', () => {
    settingsPage.userNameField.should('have.value', user.username);
    settingsPage.userNameField.clear();
    settingsPage.typeUserName(newName);
    settingsPage.userNameField.should('have.value', newName);
    settingsPage.bioField.should('contain.text', '');
    settingsPage.typeBio(newBio);
    settingsPage.bioField.should('contain.text', newBio);
    settingsPage.emailField.should('have.value', user.email);
    settingsPage.emailField.clear();
    settingsPage.typeEmail(newEmail);
    settingsPage.emailField.should('have.value', newEmail);
    settingsPage.typePassword(newPassword);
    settingsPage.passwordField.should('have.value', newPassword);
    settingsPage.updateSettings();
  });

  it('should provide an ability to update bio', () => {

  });

  it('should provide an ability to update an email', () => {

  });

  it('should provide an ability to update password', () => {

  });

  it('should provide an ability to log out', () => {

  });
});
