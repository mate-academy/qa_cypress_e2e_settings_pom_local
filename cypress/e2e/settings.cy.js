/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import SettingsPage from '../support/pages/settings.pageObject';
import LoginPage from '../support/pages/login.pageObject';

const settingPage = new SettingsPage();
const loginPage = new LoginPage();

describe('Settings page', () => {
  const newPassword = faker.internet.password();
  const newUsername = `${faker.person.lastName().toLocaleLowerCase()}`;
  const newBio = faker.person.bio();
  const newEmail = faker.internet.email();

  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      cy.login(
        generateUser.email, 
        generateUser.username, 
        generateUser.password
      );
      user = generateUser;
      cy.visit('/settings');
    });
  });

  it('should provide an ability to update username', () => {
    settingPage.changeItem('username-input', `${newUsername}`);
    settingPage.clickUpdateSettingsBtn();
    cy.url().should('include', `/profile/${newUsername}`);
    cy.contains(newUsername).should('be.visible');
  });

  it('should provide an ability to update bio', () => {
    settingPage.changeItem('bio-input', `${newBio}`);
    settingPage.clickUpdateSettingsBtn();
    cy.contains(newBio).should('be.visible');
  });

  it('should provide an ability to update an email', () => {
    settingPage.changeItem('email-input', `${newEmail}`);
    settingPage.clickUpdateSettingsBtn();
    cy.get('[data-cy="settings-btn"]').click();
    settingPage.checkInput('email-input', newEmail.toLowerCase());
  });

  it('should provide an ability to update password', () => {
    settingPage.changeItem('password-input', `${newPassword}`);
    settingPage.clickUpdateSettingsBtn();
    cy.get('[data-cy="logout-btn"]').click();
    cy.url().should('include', '/');

    loginPage.clickSignInBtn();

    loginPage.typeInInputField('email-sign-in', user.email);
    loginPage.typeInInputField('password-sign-in', newPassword);
    cy.get('[data-cy="form-sign-in-btn"]')
      .click();
  });

  it('should provide an ability to log out', () => {
    cy.get('[data-cy="logout-btn"]').click();
    cy.url().should('include', '/');
  });
});
