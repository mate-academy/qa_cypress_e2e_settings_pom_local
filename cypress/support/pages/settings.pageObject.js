import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-update-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-update-field');
  }

  get emailField() {
    return cy.getByDataCy('email-update-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-update-field');
  }

  get updateSettingsButton() {
    return cy.getByDataCy('update-btn');
  }

  get logoutButton() {
    return cy.getByDataCy('logout-btn');
  }

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  typeUsername(username) {
    this.usernameField.clear();
    this.usernameField.type(username, { force: true });
  }

  typeBio(bio) {
    this.bioField.clear();
    this.bioField.type(bio, { force: true });
  }

  typeEmail(email) {
    this.emailField.clear();
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.clear();
    this.passwordField.type(password);
  }

  clickOnUpdateSettingsButton() {
    this.updateSettingsButton.click();
  }

  clickOnLogoutButton() {
    this.logoutButton.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

assertUsernameFieldHasValue(username) {
    this.usernameField.should('have.value', username);
  }

  assertBioFieldContains(bio) {
    this.bioField.should('have.value', bio);
  }

  assertEmailFieldHasValue(email) {
    this.emailField.should('have.value', email);
  }
}


export default SettingsPageObject;
