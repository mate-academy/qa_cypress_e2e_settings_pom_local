import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
  url = '/settings';

  typeNewUsername(username) {
    cy.getByDataCy('username-settings')
      .clear()
      .type(username);
  }

  typeNewBio(bio) {
    cy.getByDataCy('bio-settings')
      .type(bio);
  }

  typeNewEmail(email) {
    cy.getByDataCy('email-settings')
      .clear()
      .type(email);
  }

  typeNewPassword(password) {
    cy.getByDataCy('password-settings')
      .type(password);
  }

  clickUpdateBtn() {
    cy.getByDataCy('update-btn-settings')
      .click();
  }

  clickLogOut() {
    cy.getByDataCy('logout-btn')
      .click();
  }

  assertNewEmail(email) {
    cy.getByDataCy('email-settings')
      .should('have.value', email);
  }
}

export default settingsPageObject;
