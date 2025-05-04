/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';

describe('Sign Up page', () => {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  before(() => {
    cy.visit('/register');
  });

  it('should register a new user', () => {
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="email"]').type(email);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="signup-button"]').click();

    cy.contains(username).should('exist')
  });
});
