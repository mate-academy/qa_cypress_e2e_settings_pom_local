import PageObject from '../PageObject';

class UpdateSettingsPageObject extends PageObject {
  url = '/settings';

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
    return cy.getByDataCy('settings-password');
}

  get updateSettingsBtn() {
    return cy.getByDataCy('settings-submit');
  }

  get logOutBtn() {
    return cy.getByDataCy('settings-logout-btn');
  }

  fillUsername(username) {
    this.usernameField.clear().type(username);
  }

  fillBio(bio) {
    this.bioField.type(bio);
  }

  fillEmail(email) {
    this.emailField.clear().type(email);
  }

  fillNewPassword(password) {
    this.newPasswordField.clear().type(password);
  }

  submitForm() {
    this.updateSettingsBtn.click();
  }

  assertProfile(username) {
    return cy.url().should('contain', `/profile/${username}`);
  }

  logOutSettings() {
    this.logOutBtn.click();
  }
}

export default UpdateSettingsPageObject;