import PageObject from '../PageObject';

class SettingsPage extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('Username');
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

  get updateButton() {
    return cy.getByDataCy('update-btn');
  }

  get logoutButton() {
    return cy.getByDataCy('logout-button');
  }

  fillUsernameField(name) {
    this.usernameField.type(`{selectAll}${name}`);
  }

  fillBioField(bio) {
    this.bioField.type(bio);
  }

  fillEmailField(email) {
    this.emailField.type(`{selectAll}${email}`);
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  clickUpdateButton() {
    this.updateButton.click();
  }

  clickLogoutButton() {
    this.logoutButton.click();
  }

  assertEmailField(email) {
    this.emailField.should('have.value', email);
  }
}

export default SettingsPage;