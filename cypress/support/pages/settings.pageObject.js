import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  get updateBtn() {
    return cy.getByDataCy('submit-update');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-button');
  }

  typeUserName(username) {
    this.userNameField.clear().type(username);
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

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
