/// <reference types="cypress" />
/// <reference types="../support" />
const { faker } = require('@faker-js/faker');

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settings = new SettingsPageObject();
const home = new HomePageObject();

const { generateFakeUser } = require('../support/fakeUser');
const fakeUser = generateFakeUser();

const newUsername = faker.internet.userName().toLowerCase().replace(/\./g, '');
const newBio = faker.lorem.sentence();
const newEmail = faker.internet.email().toLowerCase();
const newPassword = faker.internet.password();

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.login(fakeUser.email, fakeUser.username, fakeUser.password);
  });

  it('should provide an ability to update username', () => {
    home.navigateToSettings();
    settings.updateUsername(newUsername);
    settings.clickOnButton();

    cy.get('h4').should('contain', newUsername);
  });

  it('should provide an ability to update bio', () => {
    home.navigateToSettings();
    settings.updateBio(newBio);
    settings.clickOnButton();

    cy.get('.col-xs-12 > p').should('contain', newBio);
  });

  it('should provide an ability to update an email', () => {
    home.navigateToSettings();
    settings.updateEmail(newEmail);
    settings.clickOnButton();

    cy.wait(2000);
    cy.get('.btn').click();

    settings.emailField.invoke('val').should('eq', newEmail);

    cy.login(newEmail, fakeUser.username, fakeUser.password);
    home.assertHeaderContainUsername(fakeUser.username);
  });

  it('should provide an ability to update password', () => {
    home.navigateToSettings(); 
    settings.updatePassword(newPassword);
    settings.clickOnButton();

    cy.wait(2000);
    home.logOut();

    cy.login(fakeUser.email, fakeUser.username, newPassword);
    home.assertHeaderContainUsername(fakeUser.username);
  });
});
