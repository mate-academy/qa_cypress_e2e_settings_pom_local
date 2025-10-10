import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  visit() {
    cy.visit(this.url);
  }

  get usernameInput() {
    return cy.getByDataCy('settings-username');
  }

  get emailInput() {
    return cy.getByDataCy('settings-email');
  }

  get bioInput() {
    return cy.getByDataCy('settings-bio');
  }

  get passwordInput() {
    return cy.getByDataCy('settings-password');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  changeUsername(value) {
    this.usernameInput.clear().type(value);
    return this;
  }

  changeEmail(value) {
    this.emailInput.clear().type(value);
    return this;
  }

  changeBio(value) {
    this.bioInput.clear().type(value);
    return this;
  }

  changePassword(value) {
    this.passwordInput.clear().type(value);
    return this;
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogout() {
    this.logoutBtn.click();
  }

  checkUrl(username) {
    cy.url().should('include', `/profile/${username}`);
  }
}

export default SettingsPageObject;
