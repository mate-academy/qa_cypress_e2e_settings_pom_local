import PageObject from '../PageObject'

class SettingsPageObject extends PageObject {
  url = '/settings'

  get imageInput() {
    return cy.getByDataCy('image-input')
  }

  get usernameInput() {
    return cy.getByDataCy('username-input')
  }

  get bioInput() {
    return cy.getByDataCy('bio-input')
  }

  get emailInput() {
    return cy.getByDataCy('email-input')
  }

  get passwordInput() {
    return cy.getByDataCy('password-input')
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn')
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn')
  }

  clearAndTypeImage(image) {
    this.imageInput.should('be.visible').clear().type(image)
  }

  clearAndTypeUsername(username) {
    this.usernameInput
      .should('be.visible')
      .should('not.be.disabled')
      .clear()
      .type(username)
  }

  clearAndTypeBio(bio) {
    this.bioInput.should('be.visible').clear().type(bio)
  }

  clearAndTypeEmail(email) {
    this.emailInput.should('be.visible').clear().type(email)
  }

  clearAndTypePassword(password) {
    this.passwordInput.should('be.visible').clear().type(password)
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click()
  }

  clickLogoutBtn() {
    this.logoutBtn.click()
  }

  assertUsernameValue(username) {
    this.usernameInput.should('have.value', username)
  }

  assertBioValue(bio) {
    this.bioInput.should('have.value', bio)
  }

  assertEmailValue(email) {
    this.emailInput.should('have.value', email)
  }
}

export default SettingsPageObject
