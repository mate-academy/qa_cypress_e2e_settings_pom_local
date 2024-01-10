import PageObject from '../PageObject';

export class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername(username) {
    this.usernameLink
      .not('contain', username);
  }
}

export default HomePageObject;
