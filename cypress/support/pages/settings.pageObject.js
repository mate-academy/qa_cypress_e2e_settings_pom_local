import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

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

  get submitBtn() {
    return cy.getByDataCy('updateSettings');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout');
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

  clickSubmitBtn() {
    this.submitBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

}

export default SettingsPageObject;
