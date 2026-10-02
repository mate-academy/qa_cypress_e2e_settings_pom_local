import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  field(name) {
    return cy.getByDataCy(`settings-${name}`);
  }

  update(name, value) {
    this.field(name).clear().type(value, { parseSpecialCharSequences: false });
    cy.intercept('PUT', '/api/user').as('updateSettings');
    cy.getByDataCy('settings-submit').click();
    cy.wait('@updateSettings').its('response.statusCode').should('eq', 200);
  }

  assertValue(name, value) {
    this.field(name).should('have.value', value);
  }

  logout() {
    cy.getByDataCy('logout-button').click();
    cy.location('pathname').should('eq', '/');
    this.assertLoggedOut();
  }
}

export default SettingsPageObject;
