import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.getByDataCy('username-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-settings-btn');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  assertContainNewUsername(username) {
    this.userNameField
      .should('have.value', username);
  }

  typeUserName(userName) {
    this.userNameField.type('{selectAll}' + userName);
  }

  typeBio(bio) {
    this.bioField.type('{selectAll}' + bio);
  }

  typeEmail(email) {
    this.emailField.type('{selectAll}' + email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  assertEmailField(email) {
    this.emailField
      .should('have.value', email);
  }
}

export default SettingsPageObject;
