import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get signInLink() {
    return cy.getByDataCy('signInLink');
  }

  assertHeaderContainsSignInLink() {
    this.signInLink
    .should('exist');
  }

  clickOnSignInLink() {
    this.signInLink
    .click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
