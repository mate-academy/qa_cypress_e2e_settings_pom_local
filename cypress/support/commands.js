/* eslint-disable max-len */
/// <reference types="cypress" />

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy^="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  return cy.request('POST', '/api/users', {
    user: { email, username, password }
  }).then((response) => {
    const user = response.body.user;
    cy.window().then((win) => {
      const storedUser = {
        bio: user.bio,
        effectiveImage: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        email: user.email,
        image: user.image,
        token: user.token,
        username: user.username,
      };
      win.localStorage.setItem('user', JSON.stringify(storedUser));
    });
    cy.setCookie('auth', user.token);
    return response;
  });
});

Cypress.Commands.add('login', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  return cy.request('POST', '/api/users/login', {
    user: { email, password }
  }).then((response) => {
    const user = response.body.user;
    cy.window().then((win) => {
      const storedUser = {
        bio: user.bio,
        effectiveImage: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        email: user.email,
        image: user.image,
        token: user.token,
        username: user.username,
      };
      win.localStorage.setItem('user', JSON.stringify(storedUser));
    });
    cy.setCookie('auth', user.token);
    return response;
  });
});
