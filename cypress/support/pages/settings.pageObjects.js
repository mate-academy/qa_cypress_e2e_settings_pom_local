import PageObject from '../PageObject'

export class SettingsPageObject extends PageObject {
  url = 'settings'

  get usernameField() {
    return cy.getByDataCy('username')
  }

  get bioField() {
    return cy.getByDataCy('bio')
  }

  get emailField() {
    return cy.getByDataCy('email')
  }

  get passwordField() {
    return cy.getByDataCy('password')
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn')
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn')
  }

  typeUsername(username) {
    this.usernameField.clear().type(username)
  }

  typeBio(bio) {
    this.bioField.type(bio)
  }

  typeEmail(email) {
    this.emailField.clear().type(email)
  }

  typePassword(password) {
    this.passwordField.type(password)
  }

  clickUpdateBtn() {
    this.updateBtn.click()
  }
  clickLogoutBtn() {
    this.logoutBtn.click()
  }

  homePage() {
    return cy.url().should('eq', 'http://localhost:3000/')
  }
}
