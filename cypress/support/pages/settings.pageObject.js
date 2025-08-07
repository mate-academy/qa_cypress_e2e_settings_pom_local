import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get updateSettingsBtn() {
    return cy.get('[data-cy=update-settings-button]');
  }

  get logoutBtn() {
    return cy.get('[data-cy=logout-btn]');
  }

  changeInput(dataCy, newValue) {
    cy.get(`[data-cy=${dataCy}]`).clear().type(newValue);
  }

  assertInputValue(dataCy, expectedValue) {
    cy.get(`[data-cy=${dataCy}]`).should('have.value', expectedValue);
  }

  checkProfileUrl(username) {
    cy.url().should('include', `/profile/${username}`);
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  logout() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
