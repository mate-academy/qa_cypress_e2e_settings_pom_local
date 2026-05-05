/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy^="${selector}"]`)
})

Cypress.Commands.add(
  'register',
  (
    email = faker.internet.email(),
    username = 'user' + faker.string.alphanumeric(5).toLowerCase(),
    password = '12345Qwert!',
  ) => {
    cy.request('POST', '/api/users', {
      user: {
        email,
        username,
        password,
      },
    })
  },
)

Cypress.Commands.add(
  'login',
  (
    email = faker.internet.email(),
    username = 'user' + faker.string.alphanumeric(5).toLowerCase(),
    password = '12345Qwert!',
  ) => {
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
      }
      cy.window().then((win) => {
        win.localStorage.setItem('user', JSON.stringify(user))
      })
      cy.setCookie('auth', response.body.user.token)
    })
  },
)
