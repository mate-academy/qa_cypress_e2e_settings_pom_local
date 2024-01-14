import PageObject from '../PageObject';

class SettingsPage extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('settings-username').clear();
  }

  typeNewUsername(newUsername) {
    this.usernameField.type(newUsername);
  }

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainUsername(newUsername) {
    this.usernameLink
      .should('have.text', newUsername);
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  typeNewBio(newBio) {
    this.bioField.type(newBio);
  }

  assertBioContainNewBio(newBio) {
    this.bioField
      .should('have.text', newBio);
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  typeNewEmail(newEmail) {
    this.emailField.clear().type(newEmail);
  }

  assertEmailContainNewEmail(value) {
    this.emailField
      .should('have.value', value);
  }
// password
  get passwordField() {
    return cy.getByDataCy('settings-password');
  }
  typeNewPassword(newPassword) {
    this.passwordField.clear().type(newPassword);
  }

  assertEmail(value) {
    this.emailField
      .should('have.value', value);
  }

  get updateButton() {
    return cy.getByDataCy('settings-update-btn');
  }

  clickUpdateButton() {
    this.updateButton.click();
  }

  get logoutButton() {
    return cy.getByDataCy('logout-button');
  }

  clickLogOutButton() {
    this.logoutButton.click();
  }

  assertUserLogout() {
    return cy.url().should('not.include', this.url);
  }
}

export default SettingsPage;