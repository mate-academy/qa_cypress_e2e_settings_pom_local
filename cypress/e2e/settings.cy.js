/* eslint-disable semi */
import SignInPageObject from '../support/pages/signIn.pageObject'
import SettingsPageObject from '../support/pages/settings.pageObject'
import { faker } from '@faker-js/faker'

const signInPage = new SignInPageObject()
const settingsPage = new SettingsPageObject()

describe('Settings page', () => {
  let user
  const newName = faker.internet.userName()
  const newBio = faker.lorem.sentence()
  const newEmail = faker.internet.email()
  const newPassword = faker.internet.password()

  before(() => {
    cy.task('db:clear')
  })

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser
      signInPage.visit()
      cy.login(user.email, user.username, user.password)

      signInPage.typeEmail(user.email)
      signInPage.typePassword(user.password)
      signInPage.clickSignInBtn()

      settingsPage.visit()
    })
  })

  it('updates username and persists after reload', () => {
    settingsPage.userNameField.clear()
    settingsPage.typeUserName(newName)
    settingsPage.updateSettings()

    cy.url().should('include', `/profile/${newName}`)

    settingsPage.visit()
    settingsPage.userNameField.should('have.value', newName)
  })

  it('updates bio and persists after reload', () => {
    settingsPage.bioField.clear()
    settingsPage.typeBio(newBio)
    settingsPage.updateSettings()

    cy.url().should('include', `/profile/${user.username}`)

    settingsPage.visit()
    settingsPage.bioField.should('have.value', newBio)
  })

  it('updates email and persists after reload', () => {
    settingsPage.emailField.clear()
    settingsPage.typeEmail(newEmail)
    settingsPage.updateSettings()

    cy.url().should('include', `/profile/${user.username}`)

    settingsPage.visit()
    settingsPage.emailField.should('have.value', newEmail)
  })

  it('updates password and allows re-login with the new password', () => {
    settingsPage.typePassword(newPassword)
    settingsPage.updateSettings()

    cy.url().should('include', `/profile/${user.username}`)

    // logout
    cy.get('[data-cy="logout"]').click()

    // login with new password
    signInPage.visit()
    signInPage.typeEmail(user.email)
    signInPage.typePassword(newPassword)
    signInPage.clickSignInBtn()

    cy.get('[data-cy="user-menu"]').should('be.visible')
  })
})
