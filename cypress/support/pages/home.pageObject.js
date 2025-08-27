import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get userBio() {
    return cy.getByDataCy('user-bio');
  }

  get navbar() {
    return cy.getByDataCy('navbar');
  }

  get signInLink() {
    return cy.getByDataCy('sign-in');
  }

  get signUpLink() {
    return cy.getByDataCy('sign-up');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  checkUserBio(bio) {
    this.userBio.should('contain', bio);
  }

  isConduitHomePage() {
    this.navbar.within(() => {
      this.signInLink;
      this.signUpLink;
    });
  }
}

export default HomePageObject;
