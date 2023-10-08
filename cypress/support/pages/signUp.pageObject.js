/* eslint-disable semi */
import PageObject from '../PageObject'

class SignUpPageObject extends PageObject {
  url = '/user/register'

  get usernameField() {
    return cy.getByDataCy('username-sign-in')
  }

  get emailField() {
    return cy.getByDataCy('email-sign-in')
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in')
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn')
  }

  typeUserName(username) {
    this.usernameField.type(username)
  }

  typeEmail(email) {
    this.emailField.type(email)
  }

  typePassword(password) {
    this.passwordField.type(password)
  }

  clickSignInBtn() {
    this.signInBtn.click()
  }
}

export default SignUpPageObject
