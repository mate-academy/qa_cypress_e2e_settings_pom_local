import PageObject from '../PageObject';


class SettingsPageObject extends PageObject {
    url = '/settings';

    get urlField() {
      return cy.getByDataCy('URL-of-profile-picture');
    }

    get usernameField() {
      return cy.getByDataCy('Username');
    }

    get bioField() {
      return cy.getByDataCy('Bio');
    }

    get emailField() {
      return cy.getByDataCy('Email');
    }

    get passwordField() {
      return cy.getByDataCy('New-password');
    }

    get updateBtn() {
      return cy.getByDataCy('Update-btn');
    }

    typeUrl(userInfo) {
      this.urlField.type(userInfo);
    }

    typeUsername(userInfo) {
      this.usernameField.type(userInfo);
    }

    typeBio(userInfo) {
      this.bioField.type(userInfo);
    }

    typeEmail(userInfo) {
      this.emailField.type(userInfo);
    }

    typePassword(userInfo) {
      this.passwordField.type(userInfo);
    }

    clickUpdateBtn() {
      this.updateBtn.click();
    }

    clickLogOutBtn() {
      cy.get('button').contains('Or click here to logout.').click();
    }
  }

  export default SettingsPageObject;