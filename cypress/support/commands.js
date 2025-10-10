/* eslint-disable max-len */
/// <reference types="cypress" />

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  return cy
    .request('POST', '/api/users', {
      user: { email, username, password },
    })
    .then((response) => {
      const user = response.body.user;

      const storedUser = {
        bio: user.bio,
        email: user.email,
        image: user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        token: user.token,
        username: user.username,
      };

      return cy
        .window()
        .then((win) => {
          win.localStorage.setItem('user', JSON.stringify(storedUser));
        })
        .then(() => cy.setCookie('auth', user.token))
        .then(() => response);
    });
});

Cypress.Commands.add('login', (email = 'riot@qa.team', password = '12345Qwert!') => {
  return cy
    .request('POST', '/api/users/login', {
      user: { email, password },
    })
    .then((response) => {
      const user = response.body.user;

      const storedUser = {
        bio: user.bio,
        email: user.email,
        image: user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        token: user.token,
        username: user.username,
      };

      return cy
        .window()
        .then((win) => {
          win.localStorage.setItem('user', JSON.stringify(storedUser));
        })
        .then(() => cy.setCookie('auth', user.token))
        .then(() => response);
    });
});
