/// <reference types="cypress" />
/// <reference types="../support" />

import { SettingsPage } from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPage();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();

    settingsPage.typeUsername(newUsername);
    settingsPage.submit();

    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();

    settingsPage.typeBio(newBio);
    settingsPage.submit();

    settingsPage.assertSuccess();
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    settingsPage.typeEmail(newEmail);
    settingsPage.submit();

    settingsPage.assertSuccess();
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password(10);

    settingsPage.typePassword(newPassword);
    settingsPage.submit();

    cy.clearCookies();
    cy.visit('/#/login');
    cy.login(user.email, user.username, newPassword);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogout();
    cy.url().should('include', '/login');
  });
});
