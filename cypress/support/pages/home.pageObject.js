import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get signInLink() {
    return cy.getByDataCy('SignInLinkHeaderUnlogged');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderContainSignInLink() {
    this.signInLink
      .should('contain', 'Sign in');
  }
}

export default HomePageObject;
