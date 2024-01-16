import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertUserIsLoggedOut() {
    this.usernameLink.should('not.exist');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }


}

export default HomePageObject;
