// cypress/support/pages/home.pageObject.js

import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get signInLink() {
    return cy.contains('Sign in');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('be.visible').and('contain', username);
  }
}

export default HomePageObject;
