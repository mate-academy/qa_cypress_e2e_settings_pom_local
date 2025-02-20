import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.get('[data-cy="username"]');
  }

  get bioField() {
    return cy.get('[data-cy="bio"]');
  }

  get emailField() {
    return cy.get('[data-cy="email"]');
  }

  get passwordField() {
    return cy.get('[data-cy="password"]');
  }

  get updateBtn() {
    return cy.contains('[data-cy="updateBtn"]', 'Update Settings');
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
