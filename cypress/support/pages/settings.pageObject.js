import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-update-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-update-field');
  }

  get emailField() {
    return cy.getByDataCy('email-update-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-update-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get logOutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  fillUsernameField(username) {
    this.usernameField.clear().type(username);
  }

  fillBioField(bio) {
    this.bioField.clear().type(bio);
  }

  fillEmailField(email) {
    this.emailField.clear().type(email);
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }
  
  clickOnSettingsLink() {
    this.settingsLink.click();
   }

  clickOnLogOutBtn() {
    this.logOutBtn.click();
  }
  assertEmailField(email) {
    this.emailField.should('have.value', email);
  }
}

export default SettingsPageObject;