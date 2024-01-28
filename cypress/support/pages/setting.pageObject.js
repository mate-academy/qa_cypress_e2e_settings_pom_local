import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('usernameField');
  }

  get bioField() {
    return cy.getByDataCy('bioField');
  }

  get emailField() {
    return cy.getByDataCy('emailField');
  }

  get newPasswordField() {
    return cy.getByDataCy('newPasswordField');
  }

  get updateSettingBtn() {
    return cy.getByDataCy('updateSetBtn');
  }

  get logOutBtn() {
    return cy.getByDataCy('logOutBtn');
  }

  clickUpdateSettingBtn() {
    this.updateSettingBtn.click();
  }

  clickLogOutButton() {
    this.logOutBtn.click();
  }

  typeNewUsername(newUsername) {
    this.usernameField.clear();
    this.usernameField.type(newUsername);
  }

  typeNewBio(bio) {
    this.bioField.type(bio);
  }

  typeNewEmail(newEmail) {
    this.emailField.clear();
    this.emailField.type(newEmail);
  }

  assertNewEmail(newEmail) {
    this.emailField
      .should('have.value', newEmail);
  }

  typeNewPassword(newPassword) {
    this.newPasswordField.type(newPassword);
  }
}

export default SettingsPageObject;