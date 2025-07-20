// cypress/e2e/settings.cy.js

/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPage from '../support/pages/SettingsPage';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPage();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.password).then(() => {
          settingsPage.visit();
          settingsPage.usernameInput.should('be.visible');
        });
      });
    });

    cy.intercept('GET', '**/api/articles/feed**', (req) => {
        if (!req.headers.authorization) {
            req.reply({
                statusCode: 200,
                body: { articles: [], articlesCount: 0 }
            });
        } else {
            req.continue();
        }
    }).as('getFeedWithoutAuth');
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName().toLowerCase()
     + Cypress._.random(1000, 9999);
    cy.intercept('PUT', '**/api/user').as('updateUsername');
    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateSettings();
    cy.wait('@updateUsername').its('response.statusCode').should('eq', 200);
    cy.url().should('eq', Cypress.config().baseUrl + '/settings');
settingsPage.usernameInput.should('have.value', newUsername);
homePage.assertHeaderContainUsername(newUsername);
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    cy.intercept('GET', `**/api/profiles/${user.username}`).as('getProfileAfterBioUpdate');
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateSettings();
    cy.url().should('include', `/profile/${user.username}`);
    cy.wait('@getProfileAfterBioUpdate');
    settingsPage.assertBioIs(newBio);
  });

  it('should provide an ability to update an email', () => {
  const newEmail = faker.internet.email().toLowerCase();
  const oldPassword = user.password;

  cy.intercept('PUT', '**/api/user').as('updateUserEmail');
  settingsPage.typeEmail(newEmail);
  settingsPage.clickUpdateSettings();
  cy.wait('@updateUserEmail').its('response.statusCode').should('eq', 200); 
  cy.url().should('include', `/profile/${user.username}`);
  homePage.assertHeaderContainUsername(user.username); 
  settingsPage.visit();
  settingsPage.logoutButton.should('be.visible').click();
  cy.url().should('eq', Cypress.config().baseUrl + '/');
  cy.login(newEmail, oldPassword);
  homePage.assertHeaderContainUsername(user.username); 
});

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password({
      length: 12, upper: true, lower: true, numeric: true, symbols: true
    });

    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettings();

    cy.url().should('include', `/profile/${user.username}`);

    homePage.assertHeaderContainUsername(user.username);

    cy.login(user.email, newPassword);
    homePage.assertHeaderContainUsername(user.username);
  });


  it('should provide an ability to log out', () => {
      homePage.usernameLink.should('be.visible');

      settingsPage.logoutButton.should('be.visible').click();
      cy.url().should('not.include', '/settings');
      cy.url().should('eq', Cypress.config().baseUrl + '/');  
  });
});
