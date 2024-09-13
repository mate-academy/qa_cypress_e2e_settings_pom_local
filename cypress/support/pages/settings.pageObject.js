import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('edit-username');
  }

  get bioTextarea() {
    return cy.getByDataCy('edit-bio');
  }

  get emailField() {
    return cy.getByDataCy('edit-email');
  }

  get passwordField() {
    return cy.getByDataCy('edit-password');
  }

  get submitBtn() {
    return cy.getByDataCy('edit-submit');
  }

  get logOutBtn() {
    return cy.getByDataCy('edit-logout');
  }

  typeUsername(username) {
    this.clearUsername();
    this.usernameField.type(username);
  }

  clearUsername() {
    this.usernameField.clear();
  }

  typeBio(bio) {
    this.bioTextarea.type(bio);
  }

  typeEmail(email) {
    this.clearEmail();
    this.emailField.type(email);
  }

  clearEmail() {
    this.emailField.clear();
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSubmitBtn() {
    this.submitBtn.click();
  }

  clickLogOutBtn() {
    this.logOutBtn.click();
  }

  assertUserEmail(email) {
    this.emailField
      .should('have.value', email);
  }
}

export default SettingsPageObject;
