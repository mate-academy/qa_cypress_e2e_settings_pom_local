import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderLink(link) {
    cy.get('.nav-link').should('contain', link);
  }

  assertUrlAfterLogout() {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  }  
}

export default HomePageObject;
