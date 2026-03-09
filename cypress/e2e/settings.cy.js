/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject'
import { SettingsPageObject } from '../support/pages/settings.pageObjects'
import SignInPageObject from '../support/pages/signIn.pageObject'

const settingsPage = new SettingsPageObject()
const homePage = new HomePageObject()
const signInPage = new SignInPageObject()

describe('Settings page', () => {
  let user

  before(() => {
    cy.task('db:clear')
  })

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser

      cy.register(user.email, user.username, user.password)
      signInPage.visit()

      signInPage.typeEmail(user.email)
      signInPage.typePassword(user.password)
      signInPage.clickSignInBtn()
    })
    settingsPage.visit()
  })

  it('should provide an ability to update username', () => {
    settingsPage.visit()
    const newUsername = user.username + '123'

    settingsPage.typeUsername(newUsername)
    settingsPage.clickSignInBtn()

    homePage.assertTitleUsername(newUsername)
  })

  it('should provide an ability to update bio', () => {
    settingsPage.visit()
    const newBio = user.bio ? user.bio + 'asdf' : 'asdf'

    settingsPage.typeBio(newBio)
    settingsPage.clickSignInBtn()

    homePage.assertTitleBio(newBio)
  })

  it('should provide an ability to update an email', () => {
    settingsPage.visit()
    const newEmail = 'test@test.com'

    settingsPage.typeEmail(newEmail)
    settingsPage.clickSignInBtn()

    settingsPage.visit()

    settingsPage.emailField.should('contain', newEmail)
  })

  it('should provide an ability to update password', () => {
    settingsPage.visit()
    const newPassword = '1234'

    settingsPage.typeEmail(newPassword)
    settingsPage.clickSignInBtn()
  })

  it('should provide an ability to log out', () => {})
})
