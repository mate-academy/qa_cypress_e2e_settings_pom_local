import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get passwordField() {
    return cy.getByDataCy('password-update-field');
  }

  get usernameField() {
    return cy.getByDataCy('username-update-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-update-field');
  }

  get emailField() {
    return cy.getByDataCy('email-update-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  get bannerUser() {
    return cy.getByDataCy('banner-username');
  }

  checkUserBanner(username) {
    this.bannerUser.should('contain', username);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBiofield(bio) {
    this.bioField.type(bio);
  }

  typeEmailfield(email) {
    this.emailField.clear().type(email);
  }

  clickSignInBtn() {
    this.updateBtn.click();
  }

  clicklogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
