/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(
        generateUser.email,
        generateUser.username,
        generateUser.password
      );
      cy.visit('/settings');
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.person.lastName();

    settingPage.changeItem('update-settings-username', newUsername);
    settingPage.clickOnUpdateSettingsBtn();
    settingPage.checkUrl(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.person.bio();

    settingPage.changeItem('update-settings-bio', newBio);
    settingPage.clickOnUpdateSettingsBtn();
    settingPage.checkUrl(user.username);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    settingPage.changeItem('update-settings-email', newEmail);
    settingPage.clickOnUpdateSettingsBtn();
    settingPage.checkUrl(user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();

    settingPage.changeItem('update-settings-password', newPassword);
    settingPage.clickOnUpdateSettingsBtn();
    settingPage.checkUrl(user.username);
  });

  it('should provide an ability to log out', () => {
    const newUsername = faker.person.fullName();

    cy.getByDataCy('logout-button').click();

    cy.url().should('not.include', user.username);
  });
});
