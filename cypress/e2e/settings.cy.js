/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker'
import SettingsPage from '../support/pages/settings.pageObject'

describe('Settings page', () => {
  beforeEach(() => {
    cy.login()
    SettingsPage.visit()
  })

  it('should update username', () => {
    const newUsername = faker.person.fullName()

    SettingsPage.updateUsername(newUsername)
    SettingsPage.saveSettings()

    cy.contains(newUsername).should('exist')
  })

  it('should update bio', () => {
    const newBio = faker.lorem.sentence()

    SettingsPage.updateBio(newBio)
    SettingsPage.saveSettings()

    cy.contains(newBio).should('exist')
  })

  it('should update email', () => {
    const newEmail = faker.internet.email()

    SettingsPage.updateEmail(newEmail)
    SettingsPage.saveSettings()

    cy.contains(newEmail).should('exist')
  })

  it('should update password', () => {
    const newPassword = faker.internet.password()

    SettingsPage.updatePassword(newPassword)
    SettingsPage.saveSettings()

    cy.get('[data-cy="password-input"]').should('have.value', newPassword)
  })

  it('should provide an ability to log out', () => {
    SettingsPage.logout()

    cy.url().should('include', '/login')
  })
})
