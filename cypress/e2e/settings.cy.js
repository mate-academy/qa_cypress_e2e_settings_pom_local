/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPage from '../support/pages/settings.pageObject'
import HomePageObject from '../support/pages/home.pageObject'
import ProfilePage from '../support/pages/profile.pageObject'
import SignInPageObject from '../support/pages/signIn.pageObject'

const homePage = new HomePageObject()
const settingsPage = new SettingsPage()
const profilePage = new ProfilePage()
const signInPage = new SignInPageObject()

describe('Settings page', () => {
  let credentials
  let user

  before(() => {
    cy.task('generateUser').then((firstCredentials) => {
      credentials = firstCredentials
    })
    cy.task('generateUser').then((secondCredentials) => {
      user = secondCredentials
      cy.register(user.email, user.username)
    })
  })

  beforeEach(() => {
    cy.task('db:clear')
    cy.login(user.email, user.username)
    settingsPage.visit()
  })

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(credentials.username)
    settingsPage.updateSettingsButton.click()
    homePage.assertHeaderContainUsername(credentials.username)
  })

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(credentials.username)
    settingsPage.updateSettingsButton.click()
    settingsPage.assertHaveText(profilePage.bioField, credentials.username)
  })

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(credentials.email)
    settingsPage.updateSettingsButton.click()
    settingsPage.settingsLink.click()
    settingsPage.logoutButton.click()
    signInPage.visit()
    signInPage.login(credentials.email.toLowerCase(), user.password)
    homePage.assertHeaderContainUsername(user.username)
  })

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(settingsPage.newPassword)
    settingsPage.updateSettingsButton.click()
    settingsPage.logoutButton.click()
    signInPage.visit()
    signInPage.login(user.email.toLowerCase(), settingsPage.newPassword)
    homePage.assertHeaderContainUsername(user.username)
  })

  it('should provide an ability to log out', () => {
    settingsPage.logoutButton.click()
    homePage.assertHeaderContainSignIn(user.username)
  })
})
