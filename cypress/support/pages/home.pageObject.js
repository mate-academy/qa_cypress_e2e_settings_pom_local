import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertUserLogout() {
    cy.get('.navbar').should('not.contain.text', 'Settings');
  }
}

export default HomePageObject;
