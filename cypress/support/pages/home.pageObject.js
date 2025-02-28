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

  checkHomePageTitle() {
    cy.getByDataCy('home-logo').should('contain', 'conduit');
  }
}

export default HomePageObject;
