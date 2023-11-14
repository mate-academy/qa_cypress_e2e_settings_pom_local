import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get passwordField() {
    return cy.getByDataCy('update-password-field');
  }

  get usernameField() {
    return cy.getByDataCy('update-username-field');
  }

  get bioField() {
    return cy.getByDataCy('update-bio-field');
  }

  get emailField() {
    return cy.getByDataCy('update-email-field');
  }

  get updateButton() {
    return cy.getByDataCy('update-submit-btn');
  }

  get logoutButton() {
    return cy.getByDataCy('logout-btn');
  }

  get userInfo() {
    return cy.getByDataCy('profile-link');
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  typeUsername(username) {
    this.usernameField
      .clear()
      .type(username);
  }

  typeBio(bio) {
    this.bioField
      .type(bio);
  }

  typeEmail(email) {
    this.emailField
      .clear()
      .type(email);
  }

  clickUpdateButton() {
    this.updateButton
      .click();
  }

  clickLogoutButton() {
    this.logoutButton
      .click();
  }
  
  clickUserInfo() {
    this.userInfo
    .click();
  }

  assertUpdatedUsername(username) {
    this.userInfo
      .should('contain', username);
  }

  assertUpdatedBio(bio) {
    this.bioField
      .should('contain', bio);
  }

  assertUpdatedEmail(email) {
    this.emailField
      .should('contain', email);
  }

  assertUserInfo(userInfo) {
    this.userInfo.should('contain', userInfo);
  }
}

export default SettingsPageObject;