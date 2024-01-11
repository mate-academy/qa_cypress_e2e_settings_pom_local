import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.getByDataCy('username-field');
  }

  get settingsEmailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordlField() {
    return cy.getByDataCy('newPassword-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get updateSettingsButton() {
    return cy.getByDataCy('updateSettings-button');
  } 

  get logOutButton() {
    return cy.getByDataCy('logout-button');
  } 

  assertUserBio(bio) {
    this.bioField
      .should('contain', bio);
  }

  assertUserEmail(settingsUserEmail) {
    this.settingsEmailField
    .should('have.value', settingsUserEmail);
  }

  fillTheUserNameField(newUserName) {
    this.userNameField.clear().type(newUserName);
  }

  fillTheBioField(newUserBio) {
    this.bioField.type(newUserBio);
  }

  fillTheSettingsEmailField(newUserEmail) {
    this.settingsEmailField.clear().type(newUserEmail);
  }

  fillThePasswordlField(newUserPassword) {
    this.passwordlField.type(newUserPassword);
  }

  clickUpdateSettingsButton() {
    this.updateSettingsButton.click();
  }

  clicklogOutButton() {
    this.logOutButton.click();
  }
}

export default SettingsPageObject;