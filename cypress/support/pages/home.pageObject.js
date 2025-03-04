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
    return cy.getByDataCy('/user/login');
  }

  get signUpLink() {
    return cy.getByDataCy('/user/register');
  }
}

export default HomePageObject;
