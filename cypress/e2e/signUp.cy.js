/// <reference types="cypress" />
/// <reference types="../support" />

describe('Sign Up page', () => {
  before(() => {
    cy.visit('/register'); // Visit the registration page
  });

  it('should create a new account', () => {
    cy.get('[data-cy=username]').type('NewUser');
    cy.get('[data-cy=email]').type('newuser@example.com');
    cy.get('[data-cy=password]').type('NewPassword123');
    cy.get('[data-cy=signup-submit]').click();

    // Verify successful registration
    cy.contains('Your Feed').should('be.visible');
  });
});
