/* eslint-disable semi */
import PageObject from '../PageObject'

class SettingsPageObject extends PageObject {
  url = '/settings'

  get username() {
    return cy.getByDataCy('username')
  }

  get bio() {
    return cy.getByDataCy('bio')
  }

  get email() {
    return cy.getByDataCy('email')
  }

  get password() {
    return cy.getByDataCy('password')
  }

  get submitButton() {
    return cy.getByDataCy('submit')
  }

  get logoutButton() {
    return cy.contains('.btn', 'Or click here to logout.')
  }

  clearUsername() {
    this.username.clear()
  }

  typeUsername(username) {
    this.username.type(username)
  }

  clearBio() {
    this.bio.clear()
  }

  typeBio(bio) {
    this.bio.type(bio)
  }

  clearEmail() {
    this.email.clear()
  }

  typeEmail(email) {
    this.email.type(email)
  }

  clearPassword() {
    this.password.clear()
  }

  typePassword(password) {
    this.password.type(password)
  }

  clickSubmit() {
    this.submitButton.click()
  }

  logout() {
    this.logoutButton.click()
  }
}

export default SettingsPageObject
