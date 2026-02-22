import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
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

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get updateBtn() {
    return cy.getByDataCy('settings-btn');
  }

  open() {
    return cy.visit(this.url);
  }

  typeUsername(username) {
    return this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    return this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    return this.emailField.clear().type(email);
  }

  typePassword(password) {
    return this.passwordField.clear().type(password);
  }

  clickUpdateBtn() {
    return this.updateBtn.click();
  }
}

export default settingsPageObject;
