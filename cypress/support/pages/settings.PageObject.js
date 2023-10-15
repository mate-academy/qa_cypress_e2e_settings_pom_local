import PageObject from '../PageObject';
import faker from 'faker';

class settingsPageObject extends PageObject {
  url = '/settings';

  static generateFakeData() {
    const fakeData = {
      username: faker.lorem.word(),
      email: faker.internet.email(),
      bio: faker.lorem.sentence(),
      password: faker.internet.password(),
    };

    return fakeData;
  }

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('newPassword-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-btn');
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

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  } 

  assertInput(input) {
    cy.get('body').should('contain', input);
  }

  assertUsername(username) {
    this.usernameField.should('have.value', username);
  }

  assertBio(bio) {
    this.bioField.should('have.value', bio);
    
  }

  assertEmail(email) {
    this.emailField.should('have.value', email);
  }

  assertPassword(password) {
    this.passwordField.should('have.value', password);
  }
}

export default settingsPageObject;
