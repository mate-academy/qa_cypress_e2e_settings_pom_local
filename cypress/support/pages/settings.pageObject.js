import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
  typeUsername(username) {
    cy.getByDataCy('settings-username').type(`{selectAll}${username}`);
  }

  typeUserBio(bio) {
    cy.getByDataCy('user-bio').type(`{selectAll}${bio}`);
  }
  
  
  typeUserEmail(email) {
    cy.getByDataCy('user-email').type(`{selectAll}${email}`);
  }

  typeUserPassword(password) {
    cy.getByDataCy('settings-password').type(`{selectAll}${password}`);
  }

  get clickUpdateSettings() {
    cy.getByDataCy('submit-settings').click();
  }

  checkChanges(selector, newData) {
    cy.getByDataCy(selector)
      .should('contain.text', newData);
  }

  checkValue(selector, value) {
    cy.getByDataCy(selector)
      .should('have.value', value);
  }
}

export default SettingsPageObject;