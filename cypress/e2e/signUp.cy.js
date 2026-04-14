/// <reference types="cypress" />

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((res) => {
      user = res;
    });
  });

  it('should register a new user successfully', () => {
    cy.visit('/');
    cy.get('.nav-link').contains('Sign up').click();

    cy.get('input[placeholder="Username"]', { timeout: 10000 })
      .should('be.visible')
      .type(user.username);
    
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);

    cy.get('button').should('be.visible').click();

    cy.get('.nav-link', { timeout: 10000 }).should('contain', user.username);
  });
});
