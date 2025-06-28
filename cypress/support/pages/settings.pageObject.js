/// <reference types="cypress" />
/// <reference types="../../support" />

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

  get updateButton() {
    return cy.getByDataCy('update-settings');
  }

  fillUsername(username) {
    return this.usernameField.clear().type(username);
  }

  fillBio(bio) {
    return this.bioField.clear().type(bio);
  }

  fillEmail(email) {
    return this.emailField.clear().type(email);
  }

  fillPassword(password) {
    return this.passwordField.type(password);
  }

  updateSettings() {
    return this.updateButton.click();
  }

  checkEmailValue(email) {
    return this.emailField.should('have.value', email);
  }
}

export default SettingsPageObject;
