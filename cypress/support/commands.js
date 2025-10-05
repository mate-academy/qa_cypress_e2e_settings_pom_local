/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

/// <reference types="cypress" />

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy^="${selector}"]`);
});

Cypress.Commands.add(
  'register',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/api/users', {
      user: { email, username, password },
    });
  }
);

Cypress.Commands.add('login', (email, username, password) => {
  cy.request({
    method: 'POST',
    url: '/api/users/login',
    body: { user: { email, password } },
    failOnStatusCode: false,
  }).then((resp) => {
    if (resp.status === 200 && resp.body?.user?.token) {
      window.localStorage.setItem('jwt', resp.body.user.token);
      cy.setCookie('auth', resp.body.user.token);
      cy.visit('/');
    } else {
      cy.visit('/login');
      cy.get('[data-cy="login-email-input"]').type(email);
      cy.get('[data-cy="login-password-input"]').type(password);
      cy.get('[data-cy="login-submit-btn"]').click();
    }
  });
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="logout-btn"]').click();
});
