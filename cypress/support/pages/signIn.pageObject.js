import PageObject from '../PageObject'

class SignInPageObject extends PageObject {
  url = '/user/login'

  get emailField() {
    return cy.getByDataCy('email-sign-in')
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in')
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn')
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

  login(email, password) {
    this.emailField.type(email)
    this.passwordField.type(password)
    this.signInBtn.click()
  }
}

export default SignInPageObject
