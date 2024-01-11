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

  get signInLink() {
    return cy.contains('[class="nav-link"]', 'Sign in');
  }
  
  assertsignInLinkOnTheHome() {
    this.signInLink.should('be.visible');
  }
}

export default HomePageObject;
