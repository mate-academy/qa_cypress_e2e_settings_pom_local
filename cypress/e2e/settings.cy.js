/* eslint-disable max-len */
/* eslint-disable cypress/unsafe-to-chain-command */
// eslint-disable cypress/unsafe-to-chain-command
// eslint-disable max-len
/// <reference types="cypress" />
/// <reference types="../support" />

describe('Settings page', () => {
  let email;

  beforeEach(() => {
    const timestamp = Date.now();
    email = `yurii${timestamp}@gmail.com`;

    cy.request('POST', 'http://localhost:3000/api/users', {
      user: {
        username: `yurii${timestamp}`,
        email,
        password: '1234567Qwerty',
        bio: 'Test user bio',
      }
    });

    cy.visit('/user/login');
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type('1234567Qwerty');
    cy.contains('button', 'Sign in').click();
    cy.location('pathname', { timeout: 10000 }).should('not.include', '/login');
    cy.visit('/settings');
  });

  it('should provide an ability to update username', () => {
    cy.get('input[placeholder="Username"]').clear().type('superQA_user');
    cy.get('input[placeholder="Email"]').clear().type(email);
    cy.get('input[placeholder="New Password"]').clear().type('1234567Qwerty');
    cy.contains('button', 'Update Settings').click();
  });

  it('should provide an ability to update bio', () => {
    cy.get('textarea[placeholder="Short bio about you"]').clear().type('I am the king of Cypress!');
    cy.get('input[placeholder="Username"]').clear().type('superQA_user');
    cy.get('input[placeholder="Email"]').clear().type(email);
    cy.get('input[placeholder="New Password"]').clear().type('1234567Qwerty');
    cy.contains('button', 'Update Settings').click();
  });

  it('should provide an ability to update an email', () => {
    cy.get('input[placeholder="Email"]').clear().type(`superqa_test_${Date.now()}@gmail.com`);
    cy.get('input[placeholder="Username"]').clear().type('superQA_user');
    cy.get('input[placeholder="New Password"]').clear().type('1234567Qwerty');
    cy.contains('button', 'Update Settings').click();
  });

  it('should provide an ability to update password', () => {
    cy.get('input[placeholder="New Password"]').type('MegaSecret123!');
    cy.get('input[placeholder="Username"]').clear().type('superQA_user');
    cy.get('input[placeholder="Email"]').clear().type(email);
    cy.contains('button', 'Update Settings').click();
  });

it('should provide an ability to log out', () => {
  cy.contains('button', 'Or click here to logout.').click();

  cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');

  // Перевірка наявності кнопки Sign in після logout
  cy.contains('a', 'Sign in').should('be.visible');
});


});
