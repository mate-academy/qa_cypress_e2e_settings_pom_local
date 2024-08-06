/// <reference types="cypress" />
/// <reference types="../support" />

import SetingsPageObject from '../support/pages/settings.pageObject'
import SignInPageObject from '../support/pages/signIn.pageObject'

const signInPage = new SignInPageObject()
const settingsPage = new SetingsPageObject()
describe('Settings page', () => {
  let user
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser
    })
  })

  beforeEach(() => {
    cy.task('db:clear')

    signInPage.visit()
    cy.register(user.email, user.username, user.password)

    signInPage.typeEmail(user.email)
    signInPage.typePassword(user.password)
    signInPage.clickSignInBtn()
    settingsPage.visit()
  })
  it('should provide an ability to update username', () => {
    settingsPage.userNameField.type('new')
    settingsPage.btnUpdate.click()

    settingsPage.userNameField.should('have.value', user.username + 'new')
  })

  it('should provide an ability to update bio', () => {
    settingsPage.bioField.type('new')
    settingsPage.btnUpdate.click()
    settingsPage.bioField.should('have.value', 'new')
  })

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.clear().type('qwertyu123@qa.team')
    settingsPage.btnUpdate.click()
    settingsPage.emailField.should('have.value', 'qwertyu123@qa.team')
    settingsPage.logOutBtn.click()
    cy.reload().clearCookies()
    signInPage.visit()
    settingsPage.emailFieldSignIn.type('qwertyu123@qa.team')
    settingsPage.passwordFieldSignIn.type(user.password)
    settingsPage.btnSignIn.click()
    settingsPage.profileLink.should('contain', user.username)
  })

  it('should provide an ability to update password', () => {
    settingsPage.passwordField.type('newPassword')
    settingsPage.btnUpdate.click()
    settingsPage.logOutBtn.click()
    cy.reload().clearCookies()
    signInPage.visit()
    settingsPage.emailFieldSignIn.type(user.email)
    settingsPage.passwordFieldSignIn.type('newPassword')
    settingsPage.btnSignIn.click()
    settingsPage.profileLink.should('contain', user.username)
  })

  it('should provide an ability to log out', () => {
    settingsPage.logOutBtn.click()
    cy.contains('.nav-link', 'Sign in').should('be.visible')
  })
})
