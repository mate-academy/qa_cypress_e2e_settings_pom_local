/// <reference types="cypress" />
/// <reference types="../support" />

import settingsPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';

describe('Settings page', () => {
  let user;
  const settings = new settingsPageObject();
  const newUser = {
    username: faker.internet.userName().toLowerCase(),
    bio: faker.lorem.words(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(10),
  };

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = newUser.username;
    cy.intercept('PUT', '/api/user').as('updateUser');
    settings.open();
    settings.typeUsername(newUsername);
    settings.clickUpdateBtn();
    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
    cy.getByDataCy('profile-username').should('contain.text', newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = newUser.bio;
    cy.intercept('PUT', '/api/user').as('updateUser');
    settings.open();
    settings.typeBio(newBio);
    settings.clickUpdateBtn();
    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
    cy.getByDataCy('profile-bio').should('contain.text', newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = newUser.email;
    cy.intercept('PUT', '/api/user').as('updateUser');
    settings.open();
    settings.typeEmail(newEmail);
    settings.clickUpdateBtn();
    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
    settings.open();
    cy.getByDataCy('settings-email').should('have.value', newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = newUser.password;
    cy.intercept('PUT', '/api/user').as('updateUser');
    settings.open();
    settings.typePassword(newPassword);
    settings.clickUpdateBtn();
    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
    settings.open();
    cy.getByDataCy('logout-btn').click();
    cy.apiLogin(user.email, newPassword);
    cy.getByDataCy('profile-link').should('contain.text', user.username);
  });

  it('should provide an ability to log out', () => {
    settings.open();
    cy.getByDataCy('logout-btn').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.getByDataCy('home-banner').should('be.visible');
  });
});
