import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.getByDataCy('usernameField');
  }

  typeNewUserName(userName) {
    this.userNameField.clear().type(userName);
  }
  
  get userBioField() {
    return cy.getByDataCy('bioField');
  }

  typeBio(bio) {
    this.userBioField.type(bio);
  }

  assertBioFieldUpdated(data) {
    this.userBioField.should('have.value', data);
  }
  
  get emailField() {
    return cy.getByDataCy('emailField');
  }

  typeEmail(newEmail) {
    this.emailField.clear();
    this.emailField.type(newEmail);
  }

  assertEmail(email) {
    this.emailField.should('have.value', email);
  }
  
  get newPasswordField() {
    return cy.getByDataCy('passwordField');
  }

  typeNewPassword(newPassword) {
    this.newPasswordField.type(newPassword);
  }
  
  get updateButton() {
    return cy.getByDataCy('updateButton');
  }

  clickOnUpdateBtn(button) {
    this.updateButton.click(button);
  }
  
  get logoutBtn () {
    return cy.getByDataCy('logoutButton');
  }

  clickOnLogoutBtn(button) {
    this.logoutBtn.click(button);
  }

}

export default SettingsPageObject;
