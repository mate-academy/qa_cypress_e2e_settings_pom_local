/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
import SettingsPage from '../support/pages/SettingsPage'

describe('Settings page', () => {
  beforeEach(() => {
    // clear DB and sign in
    cy.task('db:clear')
    cy.registerAndLogin() // uses commands.js implementation below
    SettingsPage.visit()
    cy.url().should('include', '/settings')
    cy.get('form').should('be.visible')
  })

 it('should update username', () => {
  const newUsername = faker.internet.userName()

  cy.intercept('PUT', '/api/user').as('updateUser') // ✅ before

  SettingsPage.updateUsername(newUsername).submit()

  cy.wait('@updateUser').its('response.statusCode').should('eq', 200)
  cy.contains(newUsername).should('be.visible')
})

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence()

    SettingsPage.fillBio(newBio)
    SettingsPage.submit()

    // Assert UI change
    SettingsPage.getBioField().should('have.value', newBio)

    // Also check API persisted
    cy.intercept('PUT', '/api/user').as('updateUserBio')
    SettingsPage.submit()
    cy.wait('@updateUserBio').its('response.statusCode').should('eq', 200)
  })

  it('should provide an ability to update an email', () => {
    const newEmail = `test_${Date.now()}@mail.com`

    SettingsPage.getEmailField().should('not.be.disabled')
    SettingsPage.fillEmail(newEmail)
    SettingsPage.submit()

    SettingsPage.getEmailField().should('have.value', newEmail)
    cy.intercept('PUT', '/api/user').as('updateUserEmail')
    SettingsPage.submit()
    cy.wait('@updateUserEmail').its('response.statusCode').should('eq', 200)
  })

  it('should provide an ability to update password', () => {
    const newPassword = 'NewP@ssw0rd!' + faker.internet.password(6)

    SettingsPage.fillPassword(newPassword)

    // Intercept the API request and assert it was made & successful.
    cy.intercept('PUT', '/api/user').as('updatePassword')
    SettingsPage.submit()
    cy.wait('@updatePassword').its('response.statusCode').should('eq', 200)
  })

  it('should provide an ability to log out', () => {
    // Use Page Object logout that clicks the logout link/button
    SettingsPage.logout()
    // App either navigates to /login or root. Accept either.
    cy.url().should('match', /\/(login|$)/)
    // localStorage and cookie should be cleared by command
    cy.window().its('localStorage.user').should('not.exist')
    cy.getCookie('auth').should('not.exist')
  })
})
