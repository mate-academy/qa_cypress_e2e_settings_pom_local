import { faker } from '@faker-js/faker';
import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get bioField() {
    return cy.findByPlaceholder('Short bio about you');
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get userNameField() {
    return cy.findByPlaceholder('Username');
  }

  get passwordField() {
    return cy.findByPlaceholder('New Password');
  }

  get updateSettingsBtn() {
    return cy.get('[type="submit"]');
  }

  generateBio() {
    return faker.person.bio();
  }

  generateEmail() {
    return faker.internet.email();
  }

  generateUserName() {
    return faker.internet.userName();
  }

  generatePassword() {
    return faker.internet.password();
  }

  updateBio() {
    const bio = this.generateBio();
    this.bioField.clear().type(bio);
    return bio;
  }

  updateEmail() {
    const email = this.generateEmail();
    this.emailField.clear().type(email);
  }

  updateUserName() {
    const username = this.generateUserName();
    this.userNameField.clear().type(username);
    return username;
  }

  updatePassword() {
    const password = this.generatePassword();
    this.passwordField.clear().type(password);
  }

  clickUpdateButton() {
    this.updateSettingsBtn.click();
  }

  ensureProfileUsername(username) {
    cy.url().should('contain', `/profile/${username}`);
  }

  ensureProfileBio(bio) {
    cy.contains(bio).should('be.visible');
  }
}

export default SettingsPageObject;
