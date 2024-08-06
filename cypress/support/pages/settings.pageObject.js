// for local conduit only
import PageObject from '../PageObject';
class settingsPageObject extends PageObject {
  url = `/settings`;
  get usernameField() {
    return cy.getByDataCy('username-field-settings');
  }
  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }
  get modalText() {
    return cy.get('.swal-title');
  }
  get bioField() {
    return cy.getByDataCy('bio');
  }
  get emailField() {
    return cy.getByDataCy('email-field-settings');
  }
  get passwordField() {
    return cy.getByDataCy('password-field-settings');
  }
  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }
}
export default settingsPageObject;
