
import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('user-bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('new-password-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get logOutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  fillUsernameField(username) {
    this.usernameField.clear().type(username);
  }

  fillBioField(bio) {
    this.bioField.clear().type(bio);
  }

  fillEmailField(email) {
    this.emailField.clear().type(email);
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickOnLogOutBtn() {
    this.logOutBtn.click();
  }
}

export default SettingsPageObject;