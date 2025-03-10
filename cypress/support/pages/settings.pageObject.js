import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.findByPlaceholder('"Username"');
  }

  get bioField() {
    return cy.findByPlaceholder('"Short bio about you"');
  }

  get emailField() {
    return cy.findByPlaceholder('"Email"');
  }

  get newPasswordField() {
    return cy.findByPlaceholder('"New Password"');
  }

  get btnUpdateSettings() {
    return cy.contains('[type="submit"]', 'Update Settings');
  }

  get btnLogout() {
    return cy.get('.btn').contains('Or click here to logout.');
  }

  typeUsername(newName) {
    this.usernameField.type(newName);
  }

  typeBio(text) {
    this.bioField.type(text);
  }

  typeEmail(newEmail) {
    this.emailField.type(newEmail);
  }

  checkEmail(newEmail) {
    this.emailField.should('have.value', newEmail);
  }

  typePassword(newPassword) {
    this.newPasswordField.type(newPassword);
  }

  clickUpdateBtn() {
    this.btnUpdateSettings.click();
  }

  clickLogoutBtn() {
    this.btnLogout.click();
  }

}

export default SettingsPageObject;