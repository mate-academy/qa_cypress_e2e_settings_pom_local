import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get updateBtn() {
    return cy.getByDataCy('settings-updateBtn');
  }

  get logoutBtn() {
    return cy.getByDataCy('settings-logout');
  }

  typeUsername(username) {
    this.usernameField
      .clear()
      .type(username);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField
      .clear()
      .type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickOnUpdateBtn() {
    this.updateBtn.click();
  }

  clickOnLogoutBtn() {
    this.logoutBtn.click();
  }

  assertSettingsContainUsername(username) {
    this.usernameField
      .should('contain.value', username);
  }

  assertSettingsBioEmpty() {
    this.bioField
      .should('be.empty');
  }

  assertSettingsContainEmail(email) {
    this.emailField
      .should('contain.value', email);
  }

  assertSettingsPasswordEmpty() {
    this.passwordField
      .should('be.empty');
  }

  assertSettingsContainLogoutBtn() {
    this.logoutBtn
      .should('exist').and('be.visible');
  }

  assertUsernameUpdated(newUsername) {
    this.usernameField.should('contain.value', newUsername);
  }

  assertBioUpdated(newBio) {
    this.bioField.should('contain.value', newBio);
  }

  assertEmailUpdated(newEmail) {
    this.emailField.should('contain.value', newEmail);
  }

  assertPasswordUpdated(newPassword) {
    cy.getCookie('auth').then((token) => {
      const tokenBeforeUpdate = token.value;

      cy.request({
        method: 'PUT',
        url: '/api/user',
        body: {
          password: newPassword
        },
        headers: {
          Authorization: `Token ${tokenBeforeUpdate}`
        }
      }).then((response) => {
        expect(response.body.user.token).not.to.equal(tokenBeforeUpdate);
      });
    });
  }
}

export default SettingsPageObject;
