/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject'
import SetingsPageObject from '../support/pages/settings.pageObject'
import SignInPageObject from '../support/pages/signIn.pageObject'

const signInPage = new SignInPageObject()
const settingsPage = new SetingsPageObject()
const homePage = new HomePageObject()
describe('Settings page', () => {
  let user
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser
    })
  })

  beforeEach(() => {
    cy.task('db:clear')

    cy.register(user.email, user.username, user.password)
    signInPage.visit()

    signInPage.typeEmail(user.email)
    signInPage.typePassword(user.password)
    signInPage.clickSignInBtn()
    settingsPage.visit()
  })
  it('should provide an ability to update username', () => {
    settingsPage.userNameFieldType('newusername')
    settingsPage.btnUpdate

    settingsPage.userNameFieldCheck('newusername')
  })

  it('should provide an ability to update bio', () => {
    settingsPage.bioFieldType('new')
    settingsPage.btnUpdate
    settingsPage.bioFieldCheck('new')
  })

  it.only('should provide an ability to update an email', () => {
    settingsPage.emailFieldType('qwertyu123@qa.team')
    settingsPage.btnUpdate
    settingsPage.emailFieldCheck('qwertyu123@qa.team')
    settingsPage.logOutBtn
    cy.login('qwertyu123@qa.team', user.password)
    homePage.visit()
    settingsPage.profileLinkCheck(user.username)
  })

  it.only('should provide an ability to update password', () => {
    settingsPage.passwordFieldType('newPassword')
    settingsPage.btnUpdate
    settingsPage.logOutBtn
    cy.reload().clearCookies()
    signInPage.visit()
   cy.login(user.email, 'newPassword')
   homePage.visit()
   settingsPage.profileLinkCheck(user.username)
  })

  it('should provide an ability to log out', () => {
    settingsPage.logOutBtn
    settingsPage.checkLogOut();
  })
})
