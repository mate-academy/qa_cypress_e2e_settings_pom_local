import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.getByDataCy('username');
  }

  get bioField() {
    return cy.getByDataCy('bio');
  }

  get emailField() {
    return cy.getByDataCy('email');
  }

  get passwordField() {
    return cy.getByDataCy('password');
  }

  get submitButton() {
    return cy.getByDataCy('submitButton');
  }

  get logoutButton() {
    return cy.getByDataCy('logoutBtn');
  }

 

  typeUserName(username) {
    this.userNameField.type(username); return this;
  }

  typeBio(bio) {
    this.bioField.type(bio); return this;
  }

  typeEmail(email) {
    this.emailField.type(email); return this;
  }

  typePassword(password) {
    this.passwordField.type(password); return this;
  }

  updateSettings() {
    return this.submitButton.click();
  }

  logoutSettings() {
    this.logoutButton.click();
}

}

export default SettingsPageObject;
