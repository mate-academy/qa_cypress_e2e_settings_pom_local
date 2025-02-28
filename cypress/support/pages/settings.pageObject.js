import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get nameField() {
    return cy.getByDataCy('setting-username');
  }

  get boiField() {
    return cy.getByDataCy('setting-bio');
  }

  get bioElement() {
    return cy.getByDataCy('setting-new-bio');
  }

  get emailField() {
    return cy.getByDataCy('setting-email');
  }

  get passwordField() {
    return cy.getByDataCy('setting-password');
  }

  get updateButton() {
    return cy.getByDataCy('setting-update');
  }

  get logoutButton() {
    return cy.getByDataCy('setting-logout');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeBio(bio) {
    this.boiField.type(bio);
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

  checkBioText(bio) {
    this.bioElement.should('contain.text', bio);
  }

  checkEmailText(email) {
    this.emailField.should('have.value', email);
  }
}

export default SettingsPageObject;
