import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
  url = '/settings/';

  get visit() {
    return cy.visit('/settings/');
  }
  get usernameField(){
    return cy.getByDataCy('settings-username');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn').click();
  }

  get bioField(){
    return cy.getByDataCy('settings-bio');
  }

  get emailField(){
    return cy.getByDataCy('settings-email');
  }

  get newPasswordField(){
    return cy.getByDataCy('settings-newPassword');
  }

  get logOutBtn() {
    return cy.getByDataCy('settings-logout-btn').click();
  }
  
}

export default settingsPageObject;
