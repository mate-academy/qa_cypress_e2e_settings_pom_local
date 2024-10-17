/// <reference types="cypress" />
/// <reference types="../support" />

describe('Settings page', () => {
  before(() => {
    cy.login('testuser@example.com', 'password'); // Ensure user is logged in before the tests
  });

  beforeEach(() => {
    cy.visit('/settings'); // Visit settings page before each test
  });

  it('should provide an ability to update username', () => {
    cy.get('[data-cy=username]').clear().type('NewUsername');
    cy.get('[data-cy=save-settings]').click();

    cy.contains('Your settings have been updated').should('be.visible');
  });

  it('should provide an ability to update bio', () => {
    cy.get('[data-cy=bio]').clear().type('This is my new bio');
    cy.get('[data-cy=save-settings]').click();

    cy.contains('Your settings have been updated').should('be.visible');
  });

  it('should provide an ability to update an email', () => {
    cy.get('[data-cy=email]').clear().type('newemail@example.com');
    cy.get('[data-cy=save-settings]').click();

    cy.contains('Your settings have been updated').should('be.visible');
  });

  it('should provide an ability to update password', () => {
    cy.get('[data-cy=password]').clear().type('NewPassword123');
    cy.get('[data-cy=save-settings]').click();

    cy.contains('Your settings have been updated').should('be.visible');
  });

  it('should provide an ability to log out', () => {
    cy.get('[data-cy=logout]').click();
    cy.contains('Sign in').should('be.visible');
  });
});
