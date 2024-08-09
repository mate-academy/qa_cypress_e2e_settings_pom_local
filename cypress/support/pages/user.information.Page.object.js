import PageObject from '../PageObject';

class UserInformationPageObject extends PageObject {
  url = '/settings';

  get usernameField () {
    return cy.getByDataCy('username-field');
  }

  get emailField () {
    return cy.getByDataCy('email-field');
  }

  get bioField () {
    return cy.getByDataCy('bio-field');
  }

  get newPasswordField () {
    return cy.getByDataCy('new-password-field');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  typeUsername(username) {
    this.usernameField.clear();
    this.usernameField.type(username, { force: true });
  }

  typeEmail(email) {
    this.emailField.clear();
    this.emailField.type(email, { force: true });
  }

  typeBio(bio) {
    this.bioField.clear();
    this.bioField.type(bio, { force: true });
  }

  typeNewPassword(newPassword) {
    this.newPasswordField.clear();
    this.newPasswordField.type(newPassword, { force: true });
  }

  clickOnUpdateSettingsBtn() {
    cy.getByDataCy('update-settings-btn').click();
  }

  clickOnLogoutBtn() {
    this.logoutBtn.click();
  }

  verifyUsername(expectedUsername) {
    this.usernameField.should('have.value', expectedUsername);
  }

  verifyEmail(expectedEmail) {
    this.emailField.should('have.value', expectedEmail);
  }

  verifyBio(expectedBio) {
    this.bioField.should('have.value', expectedBio);
  }

  verifyBio(expectedBio) {
    this.bioField.should('have.value', expectedBio);
  }
}


export default UserInformationPageObject;
