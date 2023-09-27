
import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  baseUrl = 'http://localhost:3000/';

  get UrlProfilePictureField() {
    return cy.get('[data-cy="url-picture-field"]').click();
  }

  get UserNameField() {
    return cy.get('[data-cy="Username-field"]').click();
  }

  get BioField() {
    return cy.get('[data-cy="bio-field"]').click();
  }

  get EmailField() {
    return cy.get('[data-cy="eamil-field"]').click();
  }

  get NewPasswordField() {
    return cy.get('[data-cy="newpassword-field"]').click();
  }

  get UpdateSettingsBtn() {
    return cy.get('[data-cy="Update-settings-btn"]');
  }

  get LogOutBtn() {
    return cy.get('[data-cy="Log-out-btn"]');
  }

  assertLogout() {
    cy.url().should('eq', this.baseUrl);
  }

  clickOnLogOutBtn() {
    this.LogOutBtn.click();
  }

  clickOnUrlField(url) {
    this.UrlProfilePictureField.clear().type(url);
  }

  clickOnNameField(username) {
    this.UserNameField.clear().type(username);
  }

  clickOnBioField(bio) {
    this.BioField.clear().type(bio);
  }

  clickOnEmailField(email) {
    this.EmailField.clear().type(email);
  }

  clickOnPasswordfield(password) {
    this.NewPasswordField.clear().type(password);
  }

  clickOnUpdateSettingsBtn() {
    this.UpdateSettingsBtn.click();
  }

  confirmUpdateLink(newUserName) {
    cy.url().should('contain', `/profile/${newUserName}`);
  }

  visitSettingsPage() {
    cy.visit('http://localhost:3000/settings');
  }
}
export default SettingsPageObject;