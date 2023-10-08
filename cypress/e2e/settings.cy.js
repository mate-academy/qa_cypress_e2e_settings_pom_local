/* eslint-disable semi */
/// <reference types="cypress" />
/// <reference types="../support" />
const faker = require('faker')

import SettingsPageObject from '../support/pages/settings.pageObject'
import SignInPageObject from '../support/pages/signIn.pageObject'
import HomePageObject from '../support/pages/home.pageObject'

const settingsPage = new SettingsPageObject()
const signInPage = new SignInPageObject()
const homePage = new HomePageObject()

describe('Settings page', () => {
  let user

  before(() => {
    cy.task('db:clear')
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser
      cy.login(user.email, user.username, user.password)
    })
  })

  beforeEach(() => {
    signInPage.visit()
    signInPage.login(user.email, user.password)
    settingsPage.visit()
  })

  afterEach(() => {
    cy.logout()
  })

  it('should provide an ability to update username', () => {
    settingsPage.clearUsername()
    const randomNumber = Math.ceil(Math.random(1000) * 1000)
    const newUserName = faker.name.firstName() + `${randomNumber}`
    settingsPage.typeUsername(newUserName.toLowerCase())
    settingsPage.clickSubmit()
    user.username = newUserName.toLowerCase()
    settingsPage.visit()
    settingsPage.assertUsername(newUserName.toLowerCase())
  })

  it('should provide an ability to update bio', () => {
    settingsPage.clearBio()
    const newBio = faker.lorem.words()
    settingsPage.typeBio(newBio)
    settingsPage.clickSubmit()
    user.bio = newBio
    settingsPage.visit()
    settingsPage.assertBio(newBio)
  })

  it('should provide an ability to update an email', () => {
    settingsPage.clearEmail()
    const randomNumber = Math.ceil(Math.random(1000) * 1000)
    const newEmail = 'test' + `${randomNumber}` + '@mail.com'
    settingsPage.typeEmail(newEmail)
    settingsPage.clickSubmit()
    user.email = newEmail
    settingsPage.visit()
    settingsPage.assertEmail(newEmail)
  })

  it('should provide an ability to update password', () => {
    settingsPage.clearPassword()
    const newPassword = 'Qwert!12345'
    settingsPage.typePassword(newPassword)
    user.password = newPassword
    settingsPage.clickSubmit()
    settingsPage.visit()
    settingsPage.logout()
    signInPage.visit()
    signInPage.login(user.email, user.password)
    homePage.assertHeaderContainUsername(user.username)
  })

  it('should provide an ability to log out', () => {
    settingsPage.logout()
    homePage.assertHeaderDoesNotContainUsername(user.username)
  })
})
