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
  let userForUpdate

  before(() => {})

  beforeEach(() => {
    cy.task('db:clear')

    cy.task('generateUser').then((generatedUser) => {
      userForUpdate = generatedUser
    })

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser

      cy.register(user.email, user.username, user.password)
      signInPage.visit()

      signInPage.typeEmail(user.email)
      signInPage.typePassword(user.password)
      signInPage.clickSignInBtn()

      settingsPage.visit()
    })
  })

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(userForUpdate.username)
    settingsPage.clickUpdateBtn()

    homePage.assertTitleUsername(userForUpdate.username)
  })

  it('should provide an ability to update bio', () => {
    const newBio = userForUpdate.bio ? userForUpdate.bio + 'asdf' : 'asdf'

    settingsPage.typeBio(newBio)
    settingsPage.clickUpdateBtn()

    homePage.assertTitleBio(newBio)
  })

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(userForUpdate.email)
    settingsPage.clickUpdateBtn()

    settingsPage.visit()

    settingsPage.emailField.should('contain', userForUpdate.email)
  })

  it('should provide an ability to update password', () => {
    settingsPage.typeEmail(userForUpdate.password)
    settingsPage.clickUpdateBtn()
  })

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn()

    homePage.assertSignInBtn()
  })
})
