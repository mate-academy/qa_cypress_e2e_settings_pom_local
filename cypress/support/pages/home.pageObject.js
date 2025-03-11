import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get signInLink() {
    return cy.contains('.nav-link', 'Sign in');
  }

  assertHeaderContainsUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertHeaderContainsSignIn() {
    this.signInLink.should('exist');
  }

  assertNoSettingsInUrl() {
    cy.url().should('not.include', 'settings');
  }
}

export default HomePageObject;
