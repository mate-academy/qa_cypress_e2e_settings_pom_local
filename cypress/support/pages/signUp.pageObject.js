import PageObject from '../PageObject'

export class SignUpPageObject extends PageObject {
  url = '/user/register'

  get usernameField() {
    return cy.getByDataCy('username-register')
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

  clickSignUpBtn() {
    this.signInBtn.click()
  }
}
