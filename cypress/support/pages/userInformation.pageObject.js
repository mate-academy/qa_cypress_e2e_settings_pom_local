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

  typeUsername(username) {
    this.usernameField.type(username, { force: true });
  }

  typeEmail(email) {
    this.emailField.type(email, { force: true });
  }

  typeBio(bio) {
    this.bioField.type(bio, { force: true });
  }

  typeNewPassword(newPassword) {
    this.newPasswordField.type(newPassword, { force: true });
  }

  clickOnUpdateSettingsBtn() {
    cy.getByDataCy('update-settings-btn');
  }
}

export default UserInformationPageObject;
