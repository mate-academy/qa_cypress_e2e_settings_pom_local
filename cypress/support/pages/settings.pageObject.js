import PageObject from '../PageObject';
class SettingsPageObgect extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.get('[data-cy="username-settings-field"]');
  }
  get bioField() {
    return cy.get('[data-cy="bio-field"]');
  }
  get emailField() {
    return cy.get('[data-cy="email-settings-field"]');
  }

  get passwordField() {
    return cy.get('[data-cy="new-password-field"]');
  }
  get updateSettingsBtn() {
    return cy.get('[data-cy="submit-settings-btn"]');
  }
  get logoutBtn() {
    return cy.get('[data-cy="logout-button"]');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBioField(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmailField(email) {
    this.emailField.clear().type(email);
  }
  typePasswordField(password) {
    this.passwordField.clear().type(password);
  }
  clickUpdateSettings() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
  assertNewEmail(email) {
    this.emailField.should('contain', email);
  }

}
export default SettingsPageObgect;