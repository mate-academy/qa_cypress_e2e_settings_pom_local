import PageObject from '../PageObject';

class SettingsPage extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.get('[data-cy="username-field"]');
  }

  get userBioField() {
    return cy.get('[data-cy="user-bio-field"]');
  }

  get emailField() {
    return cy.get('[data-cy="email-field"]');
  }

  get newPasswordField() {
    return cy.get('[data-cy="new-password-field"]');
  }

  get updateSettingsBtn() {
    return cy.get('[type="submit"]')
  }

  get settingsLink() {
    return cy.get(':nth-child(3) > .nav-link');
  }

  get logOutBtn() {
    return cy.get('[class="btn btn-outline-danger"]');
  }

  visit() {
    cy.visit(this.url);
  }

  fillUsernameField(username) {
    this.usernameField.type(username);
  }

  clearUsernameField() {
    this.usernameField.clear();
  }

  fillUserBioField(bio) {
    this.userBioField.type(bio);
  }

  fillEmailField(email) {
    this.emailField.type(email);
  }

  clearEmailField() {
    this.emailField.clear();
  }

  fillNewPasswordField(password) {
    this.newPasswordField.type(password);
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickOnSettingsLink() {
    this.settingsLink.click();
  }

  clickOnLogOutBtn() {
    this.logOutBtn.click();
  }

}

export default SettingsPage;
