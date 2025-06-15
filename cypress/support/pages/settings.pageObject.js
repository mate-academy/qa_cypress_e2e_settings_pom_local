import PageObject from '../PageObject';

export class SettingsPage extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get submitBtn() {
    return cy.getByDataCy('settings-submit');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
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

  submit() {
    this.submitBtn.click();
  }

  clickLogout() {
    this.logoutBtn.click();
  }

  assertSuccess() {
    cy.contains('Update successful').should('exist');
  }
}
