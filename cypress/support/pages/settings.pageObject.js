import PageObject from '../PageObject';


class SettingsPageObject extends PageObject {
  url = '/settings';

  get updateUsernameField () {
    return cy.getByDataCy('update-username');
  }
  typeNewUserName(username) {
    this.updateUsernameField.clear().type(username);
  }

  get updateBioSettingsBtn () {
    return cy.getByDataCy('update-submit-btn');
  }
  clickOnUpdateBioSettingsBtn() {
    this.updateBioSettingsBtn.click();
  }

  get updateBioField () {
    return cy.getByDataCy('update-bio-field');
  }

  typeNewBio(bio) {
    this.updateBioField.type(bio);
  }

  get updatedBioInfo () {
    return cy.getByDataCy('updated-bio-info');
  }
  assertupdatedBioInfo(bio) {
    this.updatedBioInfo
      .should('contain', bio);
  }

  get updateEmailField () {
    return cy.getByDataCy('update-email-field');
  }

  typeUpdateEmail(email) {
    this.updateEmailField.clear().type(email);
  }

  get updatePasswordField() {
    return cy.getByDataCy('update-password-field');
  }

  typeUpdatePassword(password) {
    this.updatePasswordField.type(password);
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  clickOnLogoutBtn() {
    this.logoutBtn.click();
  }
}


export default SettingsPageObject;