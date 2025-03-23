import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get urlField() {
    return cy.getByDataCy('url');
  }

  get usernameField() {
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

  get updateBtn() {
    return cy.getByDataCy('update');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout');
  }

  typeUrl(url) {
    this.urlField.type(url, { force: true });
  }

  typeUsername(username) {
    this.usernameField.type(username, { force: true });
  }

  typeBio(bio) {
    this.bioField.type(bio, { force: true });
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(pass) {
    this.passwordField.type(pass, { force: true });
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
