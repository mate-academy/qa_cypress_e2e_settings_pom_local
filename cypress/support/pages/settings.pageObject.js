import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.get('[placeholder="Username"]');
  }

  get bioField() {
    return cy.get('[placeholder="Short bio about you"]');
  }

  get emailField() {
    return cy.get('[placeholder="Email"]');
  }

  get passwordField() {
    return cy.get('[placeholder="New Password"]');
  }

  get updateBtn() {
    return cy.contains('[type="submit"]', 'Update Settings');
  }

  typeUserName(name) {
    this.userNameField.type(name);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email){
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  updateSettings() {
    this.updateBtn.click();
  }
}

export default SettingsPageObject;
