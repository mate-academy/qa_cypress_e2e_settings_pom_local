/// <reference types="cypress" />
/// <reference types="../support" />
const { faker } = require('@faker-js/faker');

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settings = new SettingsPageObject;
const home = new HomePageObject;

const { generateFakeUser } = require('../support/fakeUser');

const fakeUser = generateFakeUser();

describe('Settings page', () => {
  before(() => {

  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  function signUpUser() {
    cy.get(':nth-child(3) > .nav-link').should('contain', 'Sign up').click();
    cy.get('.text-xs-center').should('contain', 'Sign up');
    cy.get('[placeholder="Username"]').type(fakeUser.username);
    cy.get('[placeholder="Email"]').type(fakeUser.email);
    cy.get('[placeholder="Password"]').type(fakeUser.password);
    cy.get('[data-cy="sign-in-btn"]').click();

    home.assertHeaderContainUsername(fakeUser.username);
  }

  function signInUser() {
    cy.get(':nth-child(2) > .nav-link').should('contain', 'Sign in').click();
    cy.get('.text-xs-center').should('contain', 'Sign in');
    cy.get('[placeholder="Email"]').type(fakeUser.email);
    cy.get('[placeholder="Password"]').type(fakeUser.password);
    cy.get('[data-cy="sign-in-btn"]').click();
  }

  it('should provide an ability to update username', () => {
    signUpUser();
    cy.get(':nth-child(3) > .nav-link').click();

    const newUsername = faker.internet.userName().toLowerCase().replace(/\./g, '');
    settings.updateUsername(newUsername);
    settings.clickOnButton();

    cy.get('h4').should('contain', newUsername);
  });

  it('should provide an ability to update bio', () => {
    signInUser();
    cy.wait(2000);
    cy.get(':nth-child(3) > .nav-link').click();

    const newBio = faker.lorem.sentence();
    settings.updateBio(newBio);
    settings.clickOnButton();

    cy.get('.col-xs-12 > p').should('contain', newBio);
  });

  it('should provide an ability to update an email', () => {
    signInUser();
    cy.wait(2000);
    cy.get(':nth-child(3) > .nav-link').click();

    const newEmail = faker.internet.email().toLowerCase();
    settings.updateEmail(newEmail);
    settings.clickOnButton();

    cy.wait(2000);
    cy.get('.btn').click();

    settings.emailField.invoke('val').should('eq', newEmail);
  });

  it('should provide an ability to update password', () => {
    signUpUser();
    cy.wait(2000);
    cy.get(':nth-child(3) > .nav-link').click();

    const newPassword = faker.internet.password();
    settings.updatePassword(newPassword);
    settings.clickOnButton();

    cy.wait(2000);
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get('.btn-outline-danger').click();

    cy.get(':nth-child(2) > .nav-link').should('contain', 'Sign in').click();
    cy.get('.text-xs-center').should('contain', 'Sign in');
    cy.get('[placeholder="Email"]').type(fakeUser.email);
    cy.get('[placeholder="Password"]').type(newPassword);
    cy.get('[data-cy="sign-in-btn"]').click();

    home.assertHeaderContainUsername(fakeUser.username);
  });
});
