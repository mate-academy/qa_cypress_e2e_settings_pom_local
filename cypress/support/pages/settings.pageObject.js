import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByPlaceholder('Username');
  }

  get bioField() {
    return cy.getByPlaceholder('Short bio about you');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get newPasswordField() {
    return cy.getByPlaceholder('New Password');
  }

  get updateBtn() {
    return cy.get('button[type="submit"]');
  }

  updateEmail(email) {
    this.emailField.clear().type(email);
  }

  updatePassword(password) {
    this.newPasswordField.type(password);
  }

  updateUsername(username) {
    this.usernameField.clear().type(username);
  }

  updateBio(bio) {
    this.bioField.type(bio);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  ensureProfileUsername(username) {
    return cy.url().should('contain', `/profile/${username}`);
  }
  ensureProfileBio(bio) {
    return cy.get('p').should('contain', bio);
  }
}

export default SettingsPageObject;
