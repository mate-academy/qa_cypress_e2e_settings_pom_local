/// <reference types="cypress" />
/// <reference types="../support" />

describe('Follow/unfollow button', () => {
  before(() => {
    cy.login('testuser@example.com', 'password'); // Ensure user is logged in
    cy.visit('/profile/another-user'); // Visit another user's profile
  });

  it('should provide an ability to follow another user', () => {
    cy.get('[data-cy=follow-button]').click();

    // Verify that the button text changes to unfollow
    cy.get('[data-cy=follow-button]').contains('Unfollow').should('be.visible');
  });

  it('should provide an ability to unfollow another user', () => {
    cy.get('[data-cy=follow-button]').click();

    // Verify that the button text changes to follow
    cy.get('[data-cy=follow-button]').contains('Follow').should('be.visible');
  });
});

