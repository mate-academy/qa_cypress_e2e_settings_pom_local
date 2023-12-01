import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-update-field');
  }

  get usernameField() {
   return cy.getByDataCy('username-update-field');
  }

  get userBioField() {
   return cy.getByDataCy('bio-update-field');
  }

  get emailField() {
   return cy.getByDataCy('email-update-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get settingsLink() {
   return cy.get(':nth-child(3) > .nav-link');
  }

  get logOutBtn() {
   return cy.getByDataCy('logout-btn');
  }

  fillPasswordField(password) {
   this.passwordField.type(password);
  }

  fillUsernameField(username) {
   this.usernameField.clear().type(username);
  }

  fillEmailField(email) {
   this.emailField.clear().type(email);
  }

  fillUserBioField(bio) {
   this.userBioField.clear().type(bio);
  }

  clickOnSettingsLink() {
   this.settingsLink.click();
  }

  clickLogOutBtn() {
   this.logOutBtn.click();
  }

  clickUpdateBtn() {
   this.updateBtn.click();
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }
}

export default SettingsPageObject;
