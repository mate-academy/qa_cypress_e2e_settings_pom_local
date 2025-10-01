import { faker } from '@faker-js/faker'

Cypress.Commands.add('registerAndLogin', () => {
  const email = faker.internet.email().toLowerCase()
  const username = faker.internet.userName().toLowerCase()
  const password = faker.internet.password()

  cy.request('POST', '/api/users', {
    user: { username, email, password },
  }).then((res) => {
    const { user } = res.body
    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify(user)) // ✅ match login
    })
    cy.setCookie('auth', user.token) // ✅ set cookie
    Cypress.env('currentUser', user) // useful for assertions
  })

  return cy.wrap({ email, username, password })
})

Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/api/users/login', {
    user: { email, password },
  }).then((res) => {
    const { user } = res.body
    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify(user))
    })
    cy.setCookie('auth', user.token)
    Cypress.env('currentUser', user)
  })
})

Cypress.Commands.add('logout', () => {
  cy.clearCookies()
  cy.window().then((win) => {
    win.localStorage.removeItem('user')
  })
})
