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

  get submitButton() {
    return cy.getByDataCy('submit-btn-settings');
  }

  get logoutButton() {
    return cy.getByDataCy('logout-btn');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickOnSubmitButton() {
    this.submitButton.click();
  }

  clickLogoutButton() {
    this.logoutButton.click();
  }

  assertNewEmail(email) {
    this.emailField.should('have.value', email);
  }
}

export default SettingsPageObject;