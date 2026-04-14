/// <reference types="cypress" />
import { settingsPage } from '../support/PageObject';

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((res) => {
      user = res;
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.username, user.password);
      cy.visit('/settings');
    });
  });

  it('should provide an ability to update username', () => {
    cy.intercept('PUT', '**/api/user').as('updateUser');
    const newUsername = user.username + 'NEW';
    settingsPage.usernameField.clear().type(newUsername);
    settingsPage.updateButton.click();
    cy.wait('@updateUser')
    .its('response.statusCode')
    .should('be.oneOf', [200, 204]);
        settingsPage.usernameField.should('have.value', newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.intercept('PUT', '**/api/user').as('updateUser');
    const newBio = 'New bio ' + Math.random();
    
    settingsPage.bioField.clear().type(newBio);
    settingsPage.updateButton.click();

    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);

    cy.get('body').should('contain', newBio);
  });

  it('should provide an ability to update password', () => {
    cy.intercept('PUT', '**/api/user').as('updateUser');
    const newPassword = 'new12345Qwert!';

    settingsPage.passwordField.clear().type(newPassword);
    settingsPage.updateButton.click();

    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);

    cy.get('.navbar').should('contain', user.username);
  });
});