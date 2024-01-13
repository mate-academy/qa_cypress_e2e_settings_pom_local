import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username_field');
  }

  get bioField() {
    return cy.getByDataCy('bio_field');
  }

  get emailField() {
    return cy.getByDataCy('email_field');
  }

  get passwordField() {
    return cy.getByDataCy('password_field');
  }

  get updateBtn() {
    return cy.getByDataCy('update_btn');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  isUpdatedBio(value) {
    this.bioField.should('have.value', value);
  }

  isUpdEmail(value) {
    this.emailField.type(value);
  }

  isUpdPassword(value) {
    this.passwordField.type(value);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }
}

export default SettingsPageObject;