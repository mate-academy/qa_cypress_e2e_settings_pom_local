import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.getByDataCy('username-field');
  }

  typeNewUserName(username) {
    this.userNameField.clear().type(username);
  }

  get updateBtn() {
    return cy.getByDataCy('update-button');
  }

  clickOnTheUpdateBtn() {
    this.updateBtn.click();
  }

  get userBioField() {
    return cy.getByDataCy('bio-field');
  }

  typeBio(bio) {
    this.userBioField.type(bio);
  }

  assertBioFieldUpdated(data) {
    this.userBioField.should('have.value', data);
  }

  get userEmailField() {
    return cy.getByDataCy('email-field');
  }

  typeNewUserEmail(email) {
    this.userEmailField.clear().type(email);
  }

  assertEmailFieldUpdated(email) {
    this.userEmailField.should('have.value', email);
  }

  get userPasswordField() {
    return cy.getByDataCy('password-field');
  }

  typeNewUserPassword(password) {
    this.userPasswordField.type(password);
  }

  assertPasswordFieldUpdated(password) {
    this.userPasswordField.should('have.value', password);
  }

  get logOutBtn() {
    return cy.getByDataCy('logout-button');
  }

  clickOnTheLogOutBtn() {
    this.logOutBtn.click();
  }

}

export default SettingsPageObject;