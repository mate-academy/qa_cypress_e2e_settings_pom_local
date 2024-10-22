import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByPlaceholder('Username');
  }

  get bioField() {
    return cy.getByPlaceholder('Short bio about you');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('New Password');
  }

  get updateSettingsBtn() {
    return cy.get('button[type="submit"]');
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
 
  updateUsername(username) {
    this.usernameField.clear().type(username);
  }

  updateBioField(bio) {
    this.bioField.clear().type(bio);
  }
}

export default SettingsPageObject;
