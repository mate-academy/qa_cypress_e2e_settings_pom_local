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

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings');
  }

  typeUserName(userName) {
    this.userNameField.type(userName);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateSettings() {
    this.updateSettingsBtn.click();
  }

  assertBio(value) {
    this.bioField.should('contain', value);
  }

  assertMail(value) {
    this.emailField.should('have.value', value);
  }
}

export default SettingsPageObject;
