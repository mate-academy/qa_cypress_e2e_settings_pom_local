// for local conduit only
/// <reference types="cypress" />
/// <reference types="../support" />


import settingsPageObject from '../support/pages/settings.page-object'
const settingsPage = new settingsPageObject()
describe('Settings page', () => {
  let user
  beforeEach(() => {
    cy.task('db:clear')
    cy.task('generateUser').then((generateUser) => {
      user = generateUser
      cy.login(user.email, user.username, user.password)
    })
  })
  it('should provide an ability to update username', () => {
    cy.visit('/settings')
    settingsPage.usernameField.type('new')
    settingsPage.updateBtn.click()

    // settingsPage.modalText.should('contain', 'Update successful!')
    settingsPage.usernameField.should('have.value', user.username + 'new')
  })

  it('should provide an ability to update bio', () => {
    settingsPage.visit()
    settingsPage.bioField.type('new')
    settingsPage.updateBtn.click()
    // settingsPage.modalText.should('contain', 'Update successful!')
    cy.reload()
    settingsPage.bioField.should('have.value', 'new')
  })

  // bug
  it('should provide an ability to update an email', () => {
    settingsPage.visit()
    settingsPage.emailField.clear().type('riot1@qa.team')
    settingsPage.updateBtn.click()
    // settingsPage.modalText.should('contain', 'Update successful!')
    cy.reload()
    settingsPage.emailField.should('have.value', 'riot1@qa.team')
  })

  it('should provide an ability to update password', () => {
    const newPass = '12345Qwerty!'
    cy.visit('/settings')
    settingsPage.passwordField.type(newPass)
    settingsPage.updateBtn.click()
    // settingsPage.modalText.should('contain', 'Update successful!')
    cy.reload().clearCookies()
    cy.visit('/user/login')
    cy.getByDataCy('email-sign-in').type(user.email)
    cy.getByDataCy('password-sign-in').type(newPass)
    cy.getByDataCy('sign-in-btn').click()
    cy.getByDataCy('sign-in-link').should('contain', user.username)
  })

  it('should provide an ability to log out', () => {
    cy.visit('/settings')
    settingsPage.logoutBtn.click()
    cy.url().should('not.include', 'settings')
    cy.getByDataCy('sign-in-link').should('exist')
    cy.getCookie('auth').should('not.exist')
  })
})
