import PageObject from '../PageObject';



class settingsPageObject extends PageObject {
  url = '/settings';
  get usernameField() {
    return cy.getByDataCy('username-input');
  }
  
  get updateBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get userBioField() {
    return cy.getByDataCy('user-bio-input');
  }

  get emailField() {
    return cy.getByDataCy('email-input');
  }

  get passwordField() {
    return cy.getByDataCy('password-input');
  }

  get logoutBtn() {
    return cy.get('.btn-outline-danger');
  }
}
export default settingsPageObject;