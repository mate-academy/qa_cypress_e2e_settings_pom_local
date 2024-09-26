import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  visit() {
    cy.visit(this.url);
  }

  get usernameField() {
    return cy.get('[data-cy=username-field]');
  }

  get bioField() {
    return cy.get('[data-cy=bio-field]');
  }

  get emailField() {
    return cy.get('[data-cy=email-field]');
  }

  get passwordField() {
    return cy.get('[data-cy=password-field]');
  }

  get updateSettingBtn() {
    return cy.get('[type="submit"]');
  }

  get logOutBtn() {
    return cy.get('[class="btn btn-outline-danger"]');
  }

  fillUsernameField(username) {
    this.usernameField.type(username);
  }

  fillBioField(bio) {
    this.bioField.type(bio);
  }

  fillEmailField(email) {
    this.emailField.type(email);
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  clearUsernameField() {
    this.usernameField.clear();
  }

  clearBioField() {
    this.bioField.clear();
  }

  clearEmailField() {
    this.emailField.clear();
  }

  assertEmailField(email) {
    this.emailField.should('have.value', email);
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingBtn.click();
  }

  clickOnLogOutBtn() {
    this.logOutBtn.click();
  }
}

export default SettingsPageObject;