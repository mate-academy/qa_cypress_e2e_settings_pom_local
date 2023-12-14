import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get bioField() {
    return cy.getByDataCy('bio-update-field');
  }

  get usernameField() {
    return cy.getByDataCy('username-update-field');
  }

  get emailField() {
    return cy.getByDataCy('email-update-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-update-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
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

  assertBioContainValue(expectedBio) {
    this.bioField.should('be.visible').and('have.value', expectedBio);
  }

  assertEmailContainValue(expectedEmail) {
    this.emailField.should('be.visible').and('have.value', expectedEmail);
  }

}

export default SettingsPageObject;