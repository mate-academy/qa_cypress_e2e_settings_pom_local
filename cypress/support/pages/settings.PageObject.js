import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
  url = '/settings'

  get userNameField() {
    return cy.getByDataCy('username-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('new-password-field');
  }

  get logOutBtn() {
    return cy.contains('.btn', 'Or click here to logout.');
  }

  visitSettings() {
    cy.visit(this.url);
  }

  fillEmptyUsernameField(username) {
    this.userNameField.clear();
    this.userNameField.type(username);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
    cy.getByDataCy('profile-link').click();
  }

  fillEmptyBioField(bio) {
    this.bioField.clear();
    this.bioField.type(bio);
  }

  fillEmptyEmailField(email) {
    this.emailField.clear();
    this.emailField.type(email);
  }

  shouldContainNewEmail(newEmail) {
    this.emailField.should('have.value', newEmail);
  }

  fillEmptyPasswordField(password) {
    this.passwordField.type(password);
  }

  clickLogOutBtn() {
    this.logOutBtn.click();
  }
}

export default SettingsPageObject