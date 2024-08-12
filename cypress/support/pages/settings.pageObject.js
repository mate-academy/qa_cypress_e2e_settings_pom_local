import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#editor';

  get usernameField() {
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

  updateUsername(username) {
    this.usernameField.clear().type(username);
  }

  updateBio(bio) {
    this.bioField.clear().type(bio);
  }

  updateEmail(email) {
    this.emailField.clear().type(email);
  }

  updatePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickOnButton() {
    cy.get('form > :nth-child(1) > .btn').click();
  }

  navigateToSettings () {
    cy.get(':nth-child(3) > .nav-link').click();
  }
}

export default SettingsPageObject;
