import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
  url = '/settings';
 
  typeUsername(username) {
    cy.getByDataCy('usernameSettings').type(`{selectAll}{del}${username}`);
  }

  typeBio(bio) {
    cy.getByDataCy('bio').type(`${bio}`);
  }

  typeEmail(email) {
    cy.getByDataCy('email').type(`{selectAll}{del}${email}`);
  } 

  typePassword(password) {
    cy.getByDataCy('password').type(`${password}`);
  }

  clickOnUpdateSettings() {
    cy.getByDataCy('updateSettings').click();
  }

  assertEmail(email) {
    cy.getByDataCy('email').should('have.value', email);
  }

  clickOnLogOut() {
    cy.getByDataCy('logOutBtn').click();
  }
}

export default SettingsPageObject;