import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  visit() {

    return cy.visit(this.url);
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
  
    return this.usernameInput.clear().type(value);
  }

  changeEmail(value) {
 
    return this.emailInput.clear().type(value);
  }

  changeBio(value) {

    return this.bioInput.clear().type(value);
  }

  changePassword(value) {
 
    return this.passwordInput.clear().type(value);
  }

  clickOnUpdateSettingsBtn() {
 
    return this.updateSettingsBtn.click();
  }

  clickLogout() {

    return this.logoutBtn.click();
  }

  checkUrl(username) {

    return cy.url().should('include', `/profile/${username}`);
  }
}

export default SettingsPageObject;
