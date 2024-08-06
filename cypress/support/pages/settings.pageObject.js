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

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;