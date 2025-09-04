/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

const safeUsername = () =>
  faker.string.alpha({ length: 1, casing: 'lower' }) +
  faker.string.alphanumeric({ length: 9, casing: 'lower' }).replace(/[^a-z0-9]/g, '');

describe('Sign Up page', () => {
  // Wymagane: czyszczenie DB w każdym teście
  beforeEach(() => { cy.task('db:clear'); });

  it('should allow user to sign up via API helper and be recognized', () => {
    const email = faker.internet.email(
      { allowSpecialCharacters: false }).toLowerCase();
    const username = safeUsername();
    const password = faker.internet.password({ length: 12 }) + '1!';

    cy.register(email, username, password);
    cy.login(email, password);

    cy.getByDataCy('nav-username-link').should('contain', username);
  });
});
