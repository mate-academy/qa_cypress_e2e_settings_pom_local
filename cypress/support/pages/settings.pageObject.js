import PageObject from '../PageObject';

class SetingsPageObject extends PageObject {
  url = 'settings'
  get userNameField() {
    return cy.getByDataCy('username-field')
  }
  get bioField() {
    return cy.getByDataCy('bio')
  }
  get emailField() {
    return cy.getByDataCy('emeil-field')
  }
  get passwordField() {
    return cy.getByDataCy('password-field')
  }
  get btnUpdate() {
    return cy.getByDataCy('btn-update')
  }
  get emailFieldSignIn() {
    return cy.getByDataCy('email-sign-in')
  }
  get passwordFieldSignIn() {
    return cy.getByDataCy('password-sign-in')
  }
  get btnSignIn() {
    return cy.getByDataCy('sign-in-btn')
  }
  get profileLink() {
    return cy.getByDataCy('profile-link')
  }
  get logOutBtn() {
    return cy.getByDataCy('btnDanger')
  }
}


export default SetingsPageObject;