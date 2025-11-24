import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  get usernameField() { 
    return cy.getByDataCy('settings-username'); 
  }

  get emailField() { 
    return cy.getByDataCy('settings-email'); 
  }

  get bioField() { 
    return cy.getByDataCy('settings-bio'); 
  }

  get currentPasswordField() { 
    return cy.getByDataCy('settings-current-password'); 
  }

  get newPasswordField() { 
    return cy.getByDataCy('settings-new-password'); 
  }

  get updateButton() { 
    return cy.getByDataCy('settings-update-button'); 
  }

  get logoutButton() { 
    return cy.getByDataCy('settings-logout-button'); 
  }

  get successMessage() { 
    return cy.getByDataCy('success-message'); 
  }

  get errorMessages() { 
    return cy.getByDataCy('error-message'); 
  }

  get fieldErrors() {
    return cy.get('.error-messages');
  }

  clearUsername() {
    this.usernameField.clear();
    return this;
  }

  typeUsername(username) {
    this.usernameField.type(username);
    return this;
  }

  clearEmail() {
    this.emailField.clear();
    return this;
  }

  typeEmail(email) {
    this.emailField.type(email);
    return this;
  }

  clearBio() {
    this.bioField.clear();
    return this;
  }

  typeBio(bio) {
    this.bioField.type(bio);
    return this;
  }

  clearCurrentPassword() {
    this.currentPasswordField.clear();
    return this;
  }

  typeCurrentPassword(password) {
    this.currentPasswordField.type(password);
    return this;
  }

  clearNewPassword() {
    this.newPasswordField.clear();
    return this;
  }

  typeNewPassword(password) {
    this.newPasswordField.type(password);
    return this;
  }

  assertFieldError(field, errorMessage) {
    return cy
      .get(`[data-cy="settings-${field}"]`)
      .parent()
      .should('have.class', 'form-group')
      .find('.error-messages')
      .should('contain', errorMessage);
  }

  clickUpdateButton() {
    this.updateButton.click();
    return cy.wrap(this);
  }

  clickLogoutButton() {
    this.logoutButton.click();
    return this;
  }

  updateUsername(username) {
    return this.typeUsername(username)
      .clickUpdateButton()
      .then(() => this);
  }

  updateEmail(email) {
    return this.typeEmail(email)
      .clickUpdateButton()
      .then(() => this);
  }

  updateBio(bio) {
    return this.typeBio(bio)
      .clickUpdateButton()
      .then(() => this);
  }

  updatePassword(currentPassword, newPassword) {
    return this.typeCurrentPassword(currentPassword)
      .typeNewPassword(newPassword)
      .clickUpdateButton()
      .then(() => this);
  }
}

export default SettingsPageObject;
