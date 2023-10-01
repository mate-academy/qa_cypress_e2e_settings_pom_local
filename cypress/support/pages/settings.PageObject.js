import PageObject from '../PageObject';
import faker from 'faker';

class settingsPageObject extends PageObject {
  url = '/settings';

  static generateFakeData() {
    const fakeData = {
      username: faker.internet.userName(),
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
    this.usernameField.type(username);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  } 

  assertInput(input) {
    cy.get('body').should('contain', input);  }
}

export default settingsPageObject;
