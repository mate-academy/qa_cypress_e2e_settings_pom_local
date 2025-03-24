import PageObject from '../PageObject';

class SettingPageObject extends PageObject {
  url = '/settings';

  get nameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get updateButton() {
    return cy.get('[type="submit"]');
  }

  get logoutButton() {
    return cy.getByDataCy('settings-logout-btn');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeName(name) {
    this.nameField.clear().type(name);
  }

  saveChanges() {
    this.updateButton.click();
  }

  logout() {
    this.logoutButton.click();
  }

  checkEmailText(email) {
    this.emailField.should('have.value', email);
  }
}

export default SettingPageObject;
