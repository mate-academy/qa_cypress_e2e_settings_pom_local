import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.get('.hide-text user-pic');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  get signInLink() {
    return cy.get(':nth-child(2) > .nav-link');
  }
}

export default HomePageObject;
