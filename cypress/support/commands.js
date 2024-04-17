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
const faker = require('@faker-js/faker');
Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy^="${selector}"]`);
});

Cypress.Commands.add('register', 
(email, username, password) => {
  cy.request('POST', '/api/users', {
    user: {
      email: faker.internet.email(),
      username: faker.internet.firstName(),
      password: 'Wehjs748#@'
    }
  });
});


Cypress.Commands.add('login',
 (email, username, password) => {
  cy.request('POST', '/api/users', {
    user: {
      email: email,
      username: username,
      password: password,
    
    }
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage:
       'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username,
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('auth', response.body.user.token);
  });
});