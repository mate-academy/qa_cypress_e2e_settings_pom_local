// cypress/support/pages/SettingsPage.js

import PageObject from '../PageObject'; // Імпортуємо базовий PageObject

class SettingsPage extends PageObject {
  // Розміщуємо геттери на початку для кращої читабельності та коректної роботи
  get imageInput() {
    return cy.getByDataCy('settings-image-input');
  }

  get usernameInput() {
    return cy.getByDataCy('settings-username-input');
  }

  get bioTextarea() {
    return cy.getByDataCy('settings-bio-textarea');
  }

  get emailInput() {
    return cy.getByDataCy('settings-email-input');
  }

  get passwordInput() {
    return cy.getByDataCy('settings-password-input');
  }

  get updateSettingsButton() {
    return cy.getByDataCy('update-settings-button');
  }

  get logoutButton() {
    return cy.getByDataCy('logout-button');
  }

  // Методи для взаємодії зі сторінкою
  visit() {
    cy.visit('/settings');
  }

  typeImage(url) {
    this.imageInput.clear().type(url);
  }

  typeUsername(username) {
    this.usernameInput.clear().type(username);
  }

  typeBio(bio) {
    this.bioTextarea.clear().type(bio);
  }

  typeEmail(email) {
    this.emailInput.clear().type(email);
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
  }

  clickUpdateSettings() {
    this.updateSettingsButton.click();
  }

  // Асерти для полів вводу (якщо ми перевіряємо їх значення)
  assertUsernameIs(username) {
    this.usernameInput.should('have.value', username);
  }

  assertPasswordIsEmpty() {
    this.passwordInput.should('have.value', '');
  }

  assertBioIs(expectedBio) {
    cy.getByDataCy(
      'profile-bio-text').should('be.visible').and('contain', expectedBio);
  }
}

export default SettingsPage;
