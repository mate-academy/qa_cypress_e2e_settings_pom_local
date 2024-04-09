import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
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

  get logOutButton() {
    return cy.getByDataCy('logout-button');
  }

  typeUserName(username) {
    this.userNameField.type(`{selectAll}${username}`);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.type(`{selectAll}${email}`);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateButton() {
    this.updateButton.click();
  }

  clickLogOutButton() {
    this.logOutButton.click();
  }

  visitSettings() {
    cy.visit('/settings');
  }

  assertBioField(newBio) {
    this.bioField.should('contain.value', newBio);
  }

  assertEmailField(newEmail) {
    this.emailField.should('contain.value', newEmail);
  }
}

export default SettingsPageObject;
