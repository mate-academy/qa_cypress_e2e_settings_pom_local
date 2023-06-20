import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
  visit() {
    cy.visit('/settings');
  }

  get profilePictureUrlField () {
    return cy.getByDataCy('profile-picture-url');
  }

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get newPasswordField () {
    return cy.getByDataCy('new-password-settings');
  }

  clickOnUpdateSettingsBtn() {
    cy.getByDataCy('uptade-btn')
      .click();
  }

  clickOnLogOutBtn() {
    cy.getByDataCy('logout-btn')
      .click();
  }

  assertUsername(username) {
    cy.getByDataCy(`/profile/${username}`)
      .should('contain', username);
  }

  assertBio(bio) {
    cy.getByDataCy('profile-bio')
      .should('contain', bio);
  }

  assertEmail(email) {
    cy.getByDataCy('edit-profile-btn')
    .click();

    cy.getByDataCy('email-settings')
      .should('have.value', email);
  }

  assertLoggingOut() {
    cy.getByDataCy('/user/login')
      .should('contain', 'Sign in');
  }
};

export default SettingsPageObject;
