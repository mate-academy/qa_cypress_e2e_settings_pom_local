import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings/';

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get newPasswordField() {
    return cy.getByDataCy('settings-new-password');
  }

  get updateBtn() {
    return cy.getByDataCy('settings-update-btn');
  }

  get logOutBtn() {
    return cy.getByDataCy('settings-logout-btn');
  }

  fillUsernameField(username) {
    this.usernameField.clear().type(username);
  }

  fillBioField(bio) {
    this.bioField.type(bio);
  }

  checkBio(bio) {
    this.bioField.should('contain', bio);
  }

  fillEmailField(email) {
    this.emailField.clear().type(email);
  }

  checkEmail(email) {
    cy.visit(this.url);
    this.emailField.should('have.value', email);
  }

  fillPasswordField(password) {
    this.newPasswordField.type(password);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogOutBtn() {
    this.logOutBtn.click();
  }

}

export default SettingsPageObject;