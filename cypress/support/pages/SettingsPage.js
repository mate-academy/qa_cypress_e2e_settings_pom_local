// cypress/support/pages/SettingsPage.js
class SettingsPage {
  visit() {
    cy.visit('/settings')
    // wait for the form to appear
    cy.get('[data-cy="settings-form"]').should('be.visible')
  }

  // getters
  getUsernameField() {
    return cy.getByDataCy('settings-username')
  }

  getBioField() {
    return cy.getByDataCy('settings-bio')
  }

  getEmailField() {
    return cy.getByDataCy('settings-email')
  }

  getPasswordField() {
    return cy.getByDataCy('settings-password')
  }

  getSubmitButton() {
    return cy.getByDataCy('settings-submit')
  }

  getLogoutButton() {
    return cy.getByDataCy('settings-logout')
  }

  // actions (fillers)
  fillUsername(value) {
    this.getUsernameField().clear().type(value)
  }

  fillBio(value) {
    this.getBioField().clear().type(value)
  }

  fillEmail(value) {
    this.getEmailField().clear().type(value)
  }

  fillPassword(value) {
    this.getPasswordField().clear().type(value, { log: false })
  }

  submit() {
    // break chains: alias the button, click separately
    this.getSubmitButton().as('submitBtn')
    cy.get('@submitBtn').click()
  }

  logout() {
    this.getLogoutButton().click()
  }
}

export default new SettingsPage()
