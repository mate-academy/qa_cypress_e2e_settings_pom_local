import PageObject from '../PageObject';

class SettingPageObject extends PageObject {
  url = '/settings';

  FillUsernameField(data) {
    cy.getByDataCy('username-setting')
      .clear()
      .type(data);
  }

  FillBioField(data) {
    cy.getByDataCy('bio-setting')
      .type(data);
  }

  FillEmailField(data) {
    cy.getByDataCy('email-setting')
      .clear()
      .type(data);
  }

  FillPasswordField(data) {
    cy.getByDataCy('newPassword-setting')
      .type(data);
  }

  clickOnUpdate() {
    cy.getByDataCy('update-settings-btn')
      .click();
  }

  clickOnLogOut() {
    cy.getByDataCy('log-out-btn')
      .click();
  }  
}

export default SettingPageObject;
