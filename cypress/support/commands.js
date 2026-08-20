/// <reference types="cypress" />

const testProfileImage = '/favicon.ico';
const defaultDestination = '/';

const addLocalProfileImage = (response) => {
  const token = response.body.user.token;

  return cy.request({
    method: 'PUT',
    url: '/api/user',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: {
      user: {
        image: testProfileImage,
      },
    },
  });
};

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy^="${selector}"]`);
});

Cypress.Commands.add(
  'register',
  (
    email = 'riot@qa.team',
    username = 'riot',
    password = '12345Qwert!',
  ) => {
    return cy.request('POST', '/api/users', {
      user: {
        email,
        username,
        password,
      },
    }).then((response) => {
      return addLocalProfileImage(response);
    });
  },
);

Cypress.Commands.add(
  'login',
  (
    email = 'riot@qa.team',
    username = 'riot',
    password = '12345Qwert!',
    destination = defaultDestination,
  ) => {
    return cy.request('POST', '/api/users', {
      user: {
        email,
        username,
        password,
      },
    })
      .then((response) => {
        return addLocalProfileImage(response);
      })
      .then((response) => {
        const user = {
          bio: response.body.user.bio,
          effectiveImage: testProfileImage,
          email: response.body.user.email,
          image: response.body.user.image,
          token: response.body.user.token,
          username: response.body.user.username,
        };

        cy.visit(destination, {
          onBeforeLoad(win) {
            win.localStorage.setItem('user', JSON.stringify(user));
            win.document.cookie = `auth=${user.token};path=/`;
          },
        });
      });
  },
);
