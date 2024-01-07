import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get usernameField() {
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

  get updateButton() {
    return cy.getByDataCy('update-button');
  }

  get logoutButton() {
    return cy.getByDataCy('logout-button');
  }

  clearEmail() {
    this.emailField.clear();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertBio(bio) {
    this.bioField.should('contain', bio);
  }

  assertEmail(email) {
    this.emailField.should('have.value', email);
  }

  typeUsernameField(username) {
    this.usernameField.type(username);
  }

  typeBioField(bio) {
    this.bioField.type(bio);
  }

  typeEmailField(email) {
    this.emailField.type(email);
  }

  typePasswordField(password) {
    this.passwordField.type(password);
  }

  clickUsernameField() {
    this.usernameField.click();
  }

  clickUpdateButton() {
    this.updateButton.click();
  }

  clickLogoutButton() {
    this.logoutButton.click();
  }

}

export default SettingsPageObject;