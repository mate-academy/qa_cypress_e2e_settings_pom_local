import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
  url = '/settings';

  clickOnUpdate() {
    cy.getByDataCy('settings-btn-update')
      .click();
  }

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  typeUsername(name) {
    this.usernameField
      .clear()
      .type(name);
  }

  typeBio(bio) {
    cy.getByDataCy('settings-bio')
      .type(bio);
  }


  typeEmail(email) {
    cy.getByDataCy('settings-Email')
      .clear()
      .type(email);
  }

  checkEmailValue(email) {
    cy.getByDataCy('settings-Email')
      .should('have.value', email)
  }

  typePassword(password) {
    cy.getByDataCy('settings-password')
      .type(password)
  }

  clickOnlogout() {
    cy.getByDataCy('settings-logout-btn')
      .click();
  }

}

export default settingsPageObject;
