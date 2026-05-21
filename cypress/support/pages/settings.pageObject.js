import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-button');
  }

  changeItem(data, newValue) {
    cy.getByDataCy(data).as('input');
    cy.get('@input').clear();
    cy.get('@input').type(newValue);
  }

  checkUrl(username) {
    cy.url().should('include', `/profile/${username}`);
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }
}

export default SettingsPageObject;
