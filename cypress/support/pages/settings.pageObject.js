import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  updateUsername(username) {
    this.usernameField.clear().type(username);
  }

  updateBio(bio) {
    this.bioField.clear().type(bio);
  }

  updateEmail(email) {
    this.emailField.clear().type(email);
  }

  updatePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }
}

export default SettingsPageObject;