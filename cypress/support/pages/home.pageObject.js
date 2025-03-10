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

  clickUsernameLink() {
    this.usernameLink.click();
  }

  assertUserIsNotLoggedIn(username) {
    this.usernameLink.should('not.exist');
  }
}

export default HomePageObject;
