import { faker } from '@faker-js/faker'
import SignInPage from '../support/pages/signIn.pageObject'
import SettingsPage from '../support/pages/settings.pageObject'

describe('Settings', () => {
  const email = faker.internet.email()
  const password = '123456'

  beforeEach(() => {
    cy.login(email, password)
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

  it('should provide an ability to log out', () => {
    SettingsPage.logout()

    cy.url().should('include', '/login')
  })
})
