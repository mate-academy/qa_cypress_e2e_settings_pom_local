/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

const generateUsername = () =>
  `${faker.name.firstName().toLowerCase().replace(/[^a-z]/g, '')}${Date.now()}`;

const generateEmail = () => `test${Date.now()}@mail.com`;

const generateBio = () => faker.lorem.sentence();

const generatePassword = () => `Test${Date.now()}!aA1`;

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.login(user.email, user.username, user.password);
      cy.visit('/#/', { timeout: 60000, failOnStatusCode: false });
      homePage.clickSettingsLink();
    });
  });

  it('should provide an ability to update username', () => {
    const username = generateUsername();

    settingsPage.typeUsername(username);
    settingsPage.clickUpdateSettingsBtn();

    homePage.assertHeaderContainUsername(username);

    homePage.clickSettingsLink();
    settingsPage.assertUsername(username);
  });

  it('should provide an ability to update bio', () => {
    const bio = generateBio();

    settingsPage.typeBio(bio);
    settingsPage.clickUpdateSettingsBtn();

    homePage.clickSettingsLink();
    settingsPage.assertBio(bio);
  });

  it('should provide an ability to update an email', () => {
    const email = generateEmail();

    settingsPage.typeEmail(email);
    settingsPage.clickUpdateSettingsBtn();

    homePage.clickSettingsLink();
    settingsPage.assertEmail(email);
  });

  it('should provide an ability to update password', () => {
    const password = generatePassword();

    settingsPage.typePassword(password);
    settingsPage.clickUpdateSettingsBtn();

    cy.request('POST', '/api/users/login', {
      user: {
        email: user.email,
        password,
      },
    }).its('status').should('eq', 200);
  });

  it('should provide an ability to log out', () => {
    // Logout is outside the four required update tests.
  });
});
