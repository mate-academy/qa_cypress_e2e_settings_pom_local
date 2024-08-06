/// <reference types="cypress" />
/// <reference types="../support" />

describe('Follow/unfollow button', () => {
  before(() => {
    cy.task('db:clear');
    cy.task('createUser', { username: 'userToFollow', email: 'follow@example.com', password: 'password' });
    cy.login('yourEmail@example.com', 'yourPassword');
  });

  beforeEach(() => {
    cy.visit('/profile/userToFollow');
  });

  it('should provide an ability to follow the another user', () => {
    cy.get('[data-cy="follow-button"]').click();
    cy.get('[data-cy="follow-button"]').should('contain', 'Unfollow');

    cy.get('[data-cy="follow-button"]').click();
    cy.get('[data-cy="follow-button"]').should('contain', 'Follow');
  });
});
