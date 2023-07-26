import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.getByDataCy('Username');
  }

  get bioField() {
    return cy.getByDataCy('bio');
  }

  get emailField() {
    return cy.getByDataCy('email');
  }

  get passwordField() {
    return cy.getByDataCy('password');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings');
  }

  get editSettingsBtn() {
    return cy.getByDataCy('edit-settings');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout');
  }

  reName(name) {
    this.userNameField.clear().type(name);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  changeEmail(email) {
    this.emailField.clear().type(email);
  }

  changePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  clickEditSettingsBtn() {
    this.editSettingsBtn.click();
  }

  verifyNewEmail(email) {
    this.emailField.should('have.attr','value', email);
  }
}

export default SettingsPageObject;
