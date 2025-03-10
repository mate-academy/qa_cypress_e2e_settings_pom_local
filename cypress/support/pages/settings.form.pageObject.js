
import PageObject from '../PageObject';

class SettingsFormPage extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('settings-form-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-form-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-form-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-form-password');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('setting-form-update-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('settings-form-logout-btn');
  }

  clearUsernameField() {
    this.usernameField.clear();
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  clickUpdateBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  clearBioField() {
    this.bioField.clear();
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  clearEmailField() {
    this.emailField.clear();
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  clearPasswordField() {
    this.passwordField.clear();
  }

  typePassword(password) {
    this.passwordField.type(password);
  }
}

export default SettingsFormPage;
