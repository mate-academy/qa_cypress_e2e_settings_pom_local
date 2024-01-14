import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get profilePictureField() {
    return cy.getByDataCy('profile-picture-field');
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

  get profileLink() {
    return cy.getByDataCy('profile-link');
  }
  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }

  goToSettings(link) {
    this.settingsLink.type(link).click();
  }
  fillAvatarField(url) {
    this.profilePictureField.type(url);
  }

  fillEmptyUsernameField(username) {
    this.usernameField.clear();
    this.usernameField.type(username);
  }

  fillBioField(bio) {
    this.bioField.type(bio);
  }

  fillEmptyEmailField(email) {
    this.emailField.clear();
    this.emailField.type(email);
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  clickOnButton(buttonName) {
    cy.getByDataCy(buttonName).click();
  }

  assertUpdUsername(newUsername) {
    this.profileLink.should('contain.text', newUsername);
  }

  checkUrlEndPoint(urlEndpoint) {
    cy.url().should('include', urlEndpoint);
  }

  assertEmail(email) {
    this.emailField.should('have.value', email);
  }

  assertNewPassword(value) {
    this.passwordField.should('have.value', value);
  }

}
export default SettingsPageObject;