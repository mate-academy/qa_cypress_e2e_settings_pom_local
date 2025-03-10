import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get bioField() {
    return cy.getByDataCy('bio-update-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  fillBioField(bio) {
    this.bioField.clear().type(bio);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  fillUsernameField(username) {
    this.usernameField.clear().type(username, {force: true});
  }
  
  fillEmailField(email) {
    this.emailField.clear().type(email);
  }

  fillPasswordField(password) {
    this.passwordField.clear().type(password);
  }

  assertUpdatedUsername(username) {
    this.usernameField.should('have.value', username);
  }

  assertUpdatedBio(bio) {
    this.bioField.should('have.value', bio);
  }

  assertUpdatedEmail(email) {
    this.emailField.should('have.value', email);
  }

}

export default SettingsPageObject;