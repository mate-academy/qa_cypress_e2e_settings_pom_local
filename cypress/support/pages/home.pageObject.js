import PageObject from '../PageObject';

class homePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertUsernameInHeader(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default homePageObject;
