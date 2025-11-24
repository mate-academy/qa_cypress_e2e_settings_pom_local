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
// Cypress.Commands.add('register', (email, username, password) => { ... })
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
// Cypress.Commands.overwrite('request', (originalFn, ...args) => { ... })
//

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
  return cy.get(`[data-cy="${selector}"]`, ...args);
});

Cypress.Commands.add('register', (
  email = 'riot@qa.team',
  username = 'riot',
  password = '12345Qwert!',
) => {
  const baseUrl = Cypress.config('baseUrl') || 'http://localhost:3000';
  
  return cy.request({
    method: 'POST',
    url: `${baseUrl}/api/users`,
    failOnStatusCode: false,
    body: {
      user: {
        email,
        username,
        password
      }
    }
  });
});

Cypress.Commands.add('login', (
  email = 'riot@qa.team',
  password = '12345Qwert!'
) => {
  const baseUrl = Cypress.config('baseUrl') || 'http://localhost:3000';
  const loginEmail = email.includes('@')
    ? email
    : `${email}@example.com`;
  
  return cy.request({
    method: 'POST',
    url: `${baseUrl}/api/users/login`,
    failOnStatusCode: false,
    body: {
      user: {
        email: loginEmail,
        password
      }
    }
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Login failed: ${JSON.stringify(response.body)}`);
    }
    
    const user = {
      bio: response.body.user.bio,
      /* eslint-disable-next-line */
      effectiveImage: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username,
    };
    
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('auth', response.body.user.token);
    return response.body.user;
  });
});

Cypress.Commands.add('updateSettings', (user) => {
  const baseUrl = Cypress.config('baseUrl') || 'http://localhost:3000';
  return cy.getCookie('auth').then((cookie) => {
    if (!cookie) {
      throw new Error('No auth cookie found. Please login first.');
    }
    
    return cy.request({
      method: 'PUT',
      url: `${baseUrl}/api/user`,
      headers: {
        'Authorization': `Token ${cookie.value}`
      },
      failOnStatusCode: false,
      body: {
        user: settings
      }
    });
  });
});

Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('user');
  cy.clearCookie('auth');
  cy.visit('/');
});
