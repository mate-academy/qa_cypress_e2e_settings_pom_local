import PageObject from '../PageObject'

class settingsPageObject extends PageObject {
  url = '/settings'

  editUsername(username) {
    cy.getByDataCy('usernameSettings').type('{selectAll}' + `${username}`)
  }

  editBio(bio) {
    cy.getByDataCy('bioSettings').type('{selectAll}' + `${bio}`)
  }

  editEmail(email) {
    cy.getByDataCy('emailSettings').type('{selectAll}' + `${email}`)
  }

  editPassword(password) {
    cy.getByDataCy('passwordSettings').type('{selectAll}' + `${password}`)
  }

  submitSettings() {
    cy.getByDataCy('submitSettings').click()
    cy.wait(3000)
  }

  assertUsername(username) {
    cy.getByDataCy(`/profile/${username}`).should('contain', username)
  }

  assertBio(bio) {
    cy.getByDataCy('/settings').click()
    cy.getByDataCy('bioSettings').should('contain', bio)
  }

  logOut() {
    cy.getByDataCy('/settings').click()
    cy.get('.btn-outline-danger').click()
    cy.wait(3000)
  }

  assertLogOut() {
    cy.getByDataCy('/user/login').should('contain', 'Sign in')
    cy.getByDataCy('/user/register').should('contain', 'Sign up')
  }

  assertEmail(username, email, password) {
    cy.getByDataCy('/user/login').click()
    cy.getByDataCy('email-sign-in').type(email)
    cy.getByDataCy('password-sign-in').type(password)
    cy.getByDataCy('sign-in-btn').click()
    cy.getByDataCy(`/profile/${username}`).should('contain', username)
  }

  assertPassword(username, email, password) {
    cy.getByDataCy('/user/login').click()
    cy.getByDataCy('email-sign-in').type(email)
    cy.getByDataCy('password-sign-in').type(password)
    cy.getByDataCy('sign-in-btn').click()
    cy.getByDataCy(`/profile/${username}`).should('contain', username)
  }
}

export default settingsPageObject
