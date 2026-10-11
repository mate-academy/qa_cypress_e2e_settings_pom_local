import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('settings-submit');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  assertUsername(username) {
    this.usernameField.should('have.value', username);
  }

  assertBio(bio) {
    this.bioField.should('have.value', bio);
  }

  assertEmail(email) {
    this.emailField.should('have.value', email);
  }
}

export default SettingsPageObject;
