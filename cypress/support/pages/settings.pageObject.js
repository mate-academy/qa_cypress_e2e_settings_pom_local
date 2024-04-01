import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('usernameField');
  }

  get bioField() {
    return cy.getByDataCy('bioField');
  }

  get emailField() {
    return cy.getByDataCy('emailField');
  }

  get passwordField() {
    return cy.getByDataCy('newPasswordField');
  }

  typeInUsernameField(username) {
    this.usernameField.type(`{selectAll}${username}`);
  }

  typeInBioField(bio) {
    this.bioField.type(`{selectAll}${bio}`);
  }

  typeInEmailField(email) {
    this.emailField.type(`{selectAll}${email}`);
  }

  typeInPasswordField(password) {
    this.passwordField.type(`{selectAll}${password}`);
  }

  clickOnSubmitButton() {
    cy.getByDataCy('submitButton').click();
  }

  clickOnLogoutButton() {
    cy.get('.btn-outline-danger').click();
  }

  assertNewUsername(newUsername) {
    this.usernameField.should('have.value', newUsername);
  }

  assertNewBio(newBio) {
    this.bioField.should('have.value', newBio);
  }

  assertNewEmail(newEmail) {
    this.emailField.should('have.value', newEmail);
  }
}

export default SettingsPageObject;
