import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get userInfo() {
    return cy.getByDataCy('user-info');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  get updateButton() {
    return cy.getByDataCy('update button');
  }

  get logoutButton() {
    return cy.getByDataCy('logout-button');
  }

  get profileLinkValue() {
    return cy.getByDataCy('profile-link');
  }

  assertProfileLinkisVisible() {
    this.profileLinkValue.should('be.visible');
  }

  assertUpdatedUserInfo(newBio) {
    this.userInfo.should('contain', newBio);
  }

  assertProfileLinkValue(newUsername) {
    this.profileLinkValue.should('contain', newUsername);
  }

  clearLocalStorageAndCookies() {
    cy.clearCookies().reload();
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  }

  assertEmailValue(newEmail) {
    this.emailField.should('have.value', newEmail);
  }

  assertTokenIsRemoved() {
    cy.getCookie('auth').should('not.exist');
  }

}

export default SettingsPageObject;

