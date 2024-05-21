import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get getUsernameField() {
    return cy.getByDataCy('usernameField');
  }

  get getBioField() {
    return cy.getByDataCy('bioField');
  }

  typeInBioField(bio) {
    this.getBioField
      .type(`{selectAll}{del}${bio}`);
  }

  assertBioField(bio) {
    this.getBioField
    .should('contain.value', bio);
  }
  
  get getPasswordField() {
    return cy.getByDataCy('passwordField');
  }

  typeInPasswordField(password) {
    this.getPasswordField
      .type(`{selectAll}{del}${password}`);
  }
  
  get getEmailField() {
    return cy.getByDataCy('emailField');
  }

  typeInEmailField(email) {
    this.getEmailField
      .type(`{selectAll}{del}${email}`);
  }

  assertEmailField(email) {
    this.getEmailField
    .should('contain.value', email);
  }

  assertUsernameField(username) {
    this.getUsernameField
    .should('contain.value', username);
  }
  
  typeInUsernameField(username) {
    this.getUsernameField
      .type(`{selectAll}{del}${username}`);
  }

  get getUpdateSettingsBtn() {
    return cy.getByDataCy('updateSettingsBtn');
  }

  clickOnUpdateSettingsBtn() {
    this.getUpdateSettingsBtn.click();
  }

  get getLogOutBtn() {
    return cy.getByDataCy('LogOutBtn');
  }

  clickOnLogOutBtn() {
    this.getLogOutBtn.click();
  }
}

export default SettingsPageObject;
