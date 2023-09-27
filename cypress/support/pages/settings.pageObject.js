import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url='/settings/';

  get usernameField() {
    return cy.getByDataCy('usermane-field');
  }

  get shortBioField() {
    return cy.getByDataCy('short-bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get newPasswordField() {
    return cy.getByDataCy('new-password-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  fillUsernameField(username) {
    this.usernameField
      .clear()
      .type(username);
  }

  fillBioField(bio) {
    this.shortBioField
      .type(bio);
  }

  checkBio(bio) {
    this.shortBioField
      .should('contain', bio);
  }

  fillEmailField(email) {
    this.emailField
      .clear()
      .type(email);
  }

  checkEmail(email) {
    cy.visit(this.url);
    this.emailField
      .should('have.value', email);
  }

  fillnewPasswordField(password) {
    this.newPasswordField
      .type(password);
  }

  clickUpdateBtn() {
    this.updateBtn
      .click();
  }

  clickLogoutBtn() {
    this.logoutBtn
      .click();
  }
}
export default SettingsPageObject;
