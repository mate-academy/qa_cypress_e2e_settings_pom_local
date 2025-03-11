import PageObject from '../PageObject.js';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-input-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-input-field');
  }

  get emailField() {
    return cy.getByDataCy('email-input-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-input-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-button');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-button');
  }

  get modalText() {
    return cy.get('.swal-title');
}

  typeUsername(username) {
    this.usernameField.type(username);
  }

  clearUsername() {
    this.usernameField.clear();
  }

  checkUsername(username) {
    this.usernameField.should('have.value', username);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  checkBio(bio) {
    this.bioField.should('have.value', bio);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  clearEmail() {
    this.emailField.clear();
  }

  checkEmail(email) {
    this.emailField.should('have.value', email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clearPassword() {
    this.passwordField.clear();
  }

  clickUpdateBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  visit() {
    cy.visit(this.url);
  }

  reloadAndClearCookies() {
    cy.reload().clearCookies();
  }
}

export default SettingsPageObject;