/// <reference types="cypress" />

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy^="${selector}"]`);
});

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/api/users', {
    user: { email, username, password },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add(
  'login',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/api/users', {
      user: {
        email,
        username,
        password,
      },
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
  }
);
