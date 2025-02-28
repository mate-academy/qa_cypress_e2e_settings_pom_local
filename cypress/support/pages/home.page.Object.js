import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get h1Logo() {
    return cy.getByDataCy('h1Logo-HomePage');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderContainH1Text(text1) {
    this.h1Logo
      .should('contain', text1);
  }
}

export default HomePageObject;
