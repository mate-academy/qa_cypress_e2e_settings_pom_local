/// <reference types="cypress" />

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add(
  'register',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    return cy.request('POST', '/api/users', {
      user: {
        email,
        username,
        password,
      },
    });
  }
);

Cypress.Commands.add('login', (email = 'riot@qa.team',
  password = '12345Qwert!') => {
  return cy.request('POST', '/api/users/login', {
    user: {
      email,
      password,
    },
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage:
      response.body.user.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username,
    };

    return cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('auth', response.body.user.token);
    });
  });
});