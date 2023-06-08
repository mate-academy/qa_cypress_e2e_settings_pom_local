import PageObject from "../PageObject";
const faker = require('faker');

class SettingsPage extends PageObject {
  url ='/settings';

  typeBio(bio) {
    cy.getByDataCy('textarea-bio').type(bio);
  }

  clickUpdateBtn() {
    cy.getByDataCy('update-setting-btn').click();
  }

  checkBioData(bio) {
    cy.visit(this.url);
    cy.getByDataCy('textarea-bio')
      .should('have.value', bio);
  }
  
  typeUsername(userName) {
    cy.getByDataCy('input-name')
      .clear()
      .type(userName);
    cy.getByDataCy('update-setting-btn').click();
  }

  checkUserNameData(userName) {
    cy.visit(this.url);
    cy.getByDataCy('input-name')
      .should('have.value', userName);
  }

  typeEmail(email) {
    cy.getByDataCy('input-email')
      .clear()
      .type(email);
  }

  checkEmail(email) {
    cy.visit(this.url);
    cy.getByDataCy('input-email')
      .should('have.value', email);
  }

  typePassword(password) {
    cy.getByDataCy('input-new-password')
      .clear()
      .type(password);
  }

  checkPassword(email, password, userName) {
    cy.login(password, email);
    cy.visit(this.url);
    cy.getByDataCy('/profile/')
      .should('contain', userName)
  }

  clickLogoutButton() {
    cy.getByDataCy("logout-btn").click();
  }
}

export default SettingsPage;
