import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-set');
  }

  typeUsernameField(username) {
    this.usernameField.clear().type(username);
  }

  get bioField() {
    return cy.getByDataCy('bio-set');
  }

  typeBioField(bio) {
    this.bioField.clear().type(bio);
  }

  get emailField() {
    return cy.getByDataCy('email-set');
  }

  typeEmailField(email) {
    this.emailField.clear().type(email);
  }

  get passField() {
    return cy.getByDataCy('pass-set');
  }

  typePassField(pass) {
    this.passField.clear().type(pass);
  }

  updateSettings() {
    cy.getByDataCy('updateBtn-set').click();
  }

  logoutFromSettings() {
    cy.getByDataCy('logoutBtn-set').click();
  }
}

export default SettingsPageObject;
