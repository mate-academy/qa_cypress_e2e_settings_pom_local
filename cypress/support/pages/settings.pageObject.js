import { faker } from '@faker-js/faker';
import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get bioField() {
    return cy.findByPlaceholder('Short bio about you');
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get userNameField() {
    return cy.findByPlaceholder('Your username');
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  get updateSettingsBtn() {
    return cy.get('.btn.btn-lg');
  }

  checkUpdate() {
    cy.get('.swal-modal').should('contain', 'Update successful!');
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
  }

  updateEmail() {
    const email = this.generateEmail();
    this.emailField.clear().type(email);
  }

  updateUserName() {
    const username = this.generateUserName();
    this.userNameField.clear().type(username);
  }

  updatePassword() {
    const password = this.generatePassword();
    this.passwordField.clear().type(password);
  }

  clickUpdateButton() {
    this.updateSettingsBtn.click();
  }

  logout() {
    return cy
      .get('.btn.btn-outline-danger')
      .click();
  }
}

export default SettingsPageObject;
