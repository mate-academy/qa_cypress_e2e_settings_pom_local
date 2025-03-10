import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get signUpLink() {
    return cy.get('[href="/user/register"]');
  }

  get navBar() {
    return cy.getByDataCy('nav-bar');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainsUsername(username) {
    this.navBar
      .should('not.contain', username);
  }
}

export default HomePageObject;
