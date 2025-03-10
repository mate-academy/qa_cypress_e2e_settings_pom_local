/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();

describe('Settings page', () => {
  let userName;
  let email;
  let password;

  before(() => {});

  beforeEach(() => {
    userName = faker.name.firstName();
    email = faker.internet.email();
    password = 'Testpass1234';

    cy.login(email, userName, password);

    homePage.visit();
    homePage.usernameLink.click();
    homePage.editSettingsLink.click();
  });

  it('should provide an ability to update username', () => {
    cy.get('input[placeholder="Username"]').type(12345);
    cy.contains('button', 'Update Settings').click();

    cy.contains('h4', userName.toLowerCase() + '12345').should('be.visible');
  });

  it('should provide an ability to update bio', () => {
    const bio = faker.name.bio();

    cy.get('textarea[placeholder="Short bio about you"]').type(bio);
    cy.contains('button', 'Update Settings').click();

    homePage.visit();
    homePage.usernameLink.click();

    cy.contains('p', bio).should('be.visible');
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    cy.get('input[placeholder="Email"]').clear();
    cy.get('input[placeholder="Email"]').type(newEmail);
    cy.contains('button', 'Update Settings').click();

    homePage.visit();
    homePage.usernameLink.click();
    homePage.editSettingsLink.click();

    cy.get(`input[value="${newEmail.toLowerCase()}"]`).should('be.visible');
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();

    cy.get('input[placeholder="New Password"]').clear();
    cy.get('input[placeholder="New Password"]').type(newPassword);
    cy.contains('button', 'Update Settings').click();

    homePage.visit();
    homePage.usernameLink.click();
    homePage.editSettingsLink.click();

    cy.contains('button', 'Or click here to logout.').click();

    cy.contains('a', 'Sign in').click();

    cy.get('input[placeholder="Email"]').type(email.toLowerCase());
    cy.get('input[placeholder="Password"]').type(newPassword);

    cy.contains('button', 'Sign in').click();

    homePage.usernameLink.should('be.visible');
  });

  it('should provide an ability to log out', () => {
    homePage.usernameLink.click();
    homePage.editSettingsLink.click();

    cy.contains('button', 'Or click here to logout.').click();

    homePage.usernameLink.should('not.exist');
  });
});
