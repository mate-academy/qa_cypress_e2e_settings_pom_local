import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertUserIsNotLoggedIn() {
    this.usernameLink.should('not.exist');
  }

  clickUsernameLink() {
    this.usernameLink.click();
  }

}

export default HomePageObject;
