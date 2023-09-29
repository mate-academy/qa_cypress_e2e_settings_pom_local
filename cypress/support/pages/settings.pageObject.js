import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }
  
  get newpasswordField() {
    return cy.getByDataCy('newpassword-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typeNewPassword(newpassword) {
    this.newpasswordField.clear().type(newpassword);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  assertProfileContainUsername(username) {
    this.usernameField
      .should('have.value', username);
  }

  assertProfileContainBio(bio) {
    this.bioField
      .should('have.value', bio);
  }

  assertProfileContainEmail(email) {
    this.emailField
      .should('have.value', email);
  }

  assertProfileContainNewPassword(newpassword) {
    this.newpasswordField
      .should('have.value', newpassword);
  }
}

export default SettingsPageObject;
