import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
url = '/settings';

get profilePictureField() {
  return cy.getByDataCy('profile-picture-field');
}

get usernameField() {
  return cy.getByDataCy('username-field');
}

get bioField() {
  return cy.getByDataCy('bio-field');
}

get emailField() {
  return cy.getByDataCy('email-field');
}

get passwordField() {
  return cy.getByDataCy('password-field');
}

get profileLink() {
  return cy.getByDataCy('profile-link');
}
 get settingsLink() {
  return cy.getByDataCy('settings-link');
 }

 goToSettings(link) {
  this.settingsLink.type(link).click();
 }

fillAvatarField(url) {
  this.profilePictureField.type(url);
}

fillEmptyUsernameField(username) {
  this.usernameField.clear();
  this.usernameField.type(username);
}

fillBioField(bio) {
  this.bioField.type(bio);
}

fillEmptyEmailField(email) {
  this.emailField.clear({ force: true });
  this.emailField.type(email);
}

fillPasswordField(password) {
  this.passwordField.clear().type(password);
}

clickOnButton(buttonName) {
  cy.getByDataCy(buttonName).click();
}

assertUpdUsername(newUsername) {
  this.profileLink.should('contain.text', newUsername);
}

assertUpdEmail(newUserEmail) {
  this.emailField.should('have.value', newUserEmail);
}

assertUpdPassword(newUserPassword) {
  this.passwordField.should('have.value', newUserPassword);
}

checkUrlEndPoint(urlEndpoint) {
  cy.url().should('include', urlEndpoint);
}

assertNewPassword(value) {
  this.passwordField.should('have.value', value);
}

typeEmail(email) {
  this.emailField.clear().type(email);
}

typePassword(password) {
  this.passwordField.type(password);
}

}
export default SettingsPageObject;
