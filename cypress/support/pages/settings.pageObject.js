import PageObject from '../PageObject'

class SettingsPage extends PageObject {
  url = '/settings'

  get imageInput() {
    return cy.get('[data-cy="image-input"]')
  }

  get usernameInput() {
    return cy.get('[data-cy="username-input"]')
  }

  get bioInput() {
    return cy.get('[data-cy="bio-input"]')
  }

  get emailInput() {
    return cy.get('[data-cy="email-input"]')
  }

  get passwordInput() {
    return cy.get('[data-cy="password-input"]')
  }

  get updateSettingsBtn() {
    return cy.get('[data-cy="update-settings-btn"]')
  }

  get logoutBtn() {
    return cy.get('[data-cy="logout-btn"]')
  }

  updateImage(url) {
    this.imageInput.clear().type(url)
  }

  updateUsername(username) {
    this.usernameInput.clear().type(username)
  }

  updateBio(bio) {
    this.bioInput.clear().type(bio)
  }

  updateEmail(email) {
    this.emailInput.clear().type(email)
  }

  updatePassword(password) {
    this.passwordInput.clear().type(password)
  }

  saveSettings() {
    this.updateSettingsBtn.click()
  }

  logout() {
    this.logoutBtn.click()
  }
}

export default new SettingsPage()
