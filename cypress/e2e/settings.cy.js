/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker'
import SettingsPageObject from '../support/pages/settings.pageObject'
import HomePageObject from '../support/pages/home.pageObject'

const settingsPage = new SettingsPageObject()
const homePage = new HomePageObject()

describe('Settings page', () => {
  let user

  before(() => {
    cy.task('db:clear')
  })

  beforeEach(() => {
    // Generate fresh user for each test to avoid state pollution
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser
      cy.register(user.email, user.username, user.password)
      cy.visit('/')
      cy.login(user.email, user.username, user.password)
      settingsPage.visit()
    })
  })

  it('should provide an ability to update username', () => {
    const newUsername = 'user' + faker.string.alphanumeric(5).toLowerCase()

    // Wait for form to be populated
    settingsPage.usernameInput.should('have.value', user.username)

    settingsPage.clearAndTypeUsername(newUsername)
    settingsPage.clickUpdateSettingsBtn()

    cy.url().should('include', `/profile/${newUsername}`)
    homePage.usernameLink.should('contain', newUsername)

    settingsPage.visit()
    settingsPage.assertUsernameValue(newUsername)
  })

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence()

    settingsPage.clearAndTypeBio(newBio)
    settingsPage.clickUpdateSettingsBtn()

    cy.url().should('include', `/profile/${user.username}`)

    // Verify bio was updated by visiting settings again
    settingsPage.visit()
    settingsPage.assertBioValue(newBio)
  })

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email()

    settingsPage.clearAndTypeEmail(newEmail)
    settingsPage.clickUpdateSettingsBtn()

    cy.url().should('include', `/profile/${user.username}`)

    // Verify email was updated by visiting settings again
    settingsPage.visit()
    settingsPage.assertEmailValue(newEmail)
  })

  it('should provide an ability to update password', () => {
    const timestamp = Date.now()
    const newPassword = `NewPass${timestamp}!`

    settingsPage.clearAndTypePassword(newPassword)
    settingsPage.clickUpdateSettingsBtn()

    cy.url().should('include', `/profile/${user.username}`)

    // Verify new password works by logging out and logging in again
    settingsPage.visit()
    settingsPage.clickLogoutBtn()
    cy.url().should('eq', Cypress.config().baseUrl + '/')

    // Try to login with new password
    cy.visit('/')
    cy.login(user.email, user.username, newPassword)
    settingsPage.visit()
    cy.url().should('include', '/settings')
  })

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn()

    cy.url().should('eq', Cypress.config().baseUrl + '/')

    // Verify user is logged out by checking localStorage
    cy.window().then((win) => {
      const userInStorage = win.localStorage.getItem('user')
      expect(userInStorage).to.be.null
    })
  })
})
