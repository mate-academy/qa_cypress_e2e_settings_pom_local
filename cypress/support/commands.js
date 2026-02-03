/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

// ===============================
// Utils
// ===============================
Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
});

// ===============================
// Test data generator (REQUIRED)
// ===============================
Cypress.Commands.add('generateUser', () => {
  const random = Math.floor(Math.random() * 100000);

  return {
    username: `user${random}`,
    email: `user${random}@mail.com`,
    password: faker.internet.password({
      length: 12,
      memorable: false,
      pattern: /[A-Za-z0-9!@#$%^&*]/,
    }),
    // used only for password update test
    newPassword: faker.internet.password({
      length: 14,
      memorable: false,
      pattern: /[A-Za-z0-9!@#$%^&*]/,
    }),
  };
});

// ===============================
// Auth commands
// ===============================

// REGISTER
Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/api/users', {
    user: { email, username, password },
  });
});

// LOGIN
Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/api/users/login', {
    user: { email, password },
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage:
        response.body.user.image ||
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
