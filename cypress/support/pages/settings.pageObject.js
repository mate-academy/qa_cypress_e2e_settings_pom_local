import PageObject from '../PageObject';
import { faker } from '@faker-js/faker';

class SettingsPageObject extends PageObject {
  visit() {
    cy.visit('/#/settings');
  }

  get usernameField() {
    return cy.getByDataCy('username-input');
  }

  get bioField() {
    return cy.getByDataCy('bio-input');
  }

  get emailField() {
    return cy.getByDataCy('email-input');
  }

  get passwordField() {
    return cy.getByDataCy('password-input');
  }

  get updateBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateSettings() {
    this.updateBtn.click();
  }

  clickLogout() {
    this.logoutBtn.click();
  }

  assertUsername(username) {
    cy.getByDataCy('nav-username').should('contain', username);
  }

  assertBio(bio) {
    this.bioField.should('have.value', bio);
  }

  assertEmail(email) {
    this.emailField.should('have.value', email);
  }

  assertLoggedIn() {
    cy.url().should('not.include', '/#/login');
  }
}

export default SettingsPageObject;
