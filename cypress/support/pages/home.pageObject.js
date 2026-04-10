import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get signInBtn() {
    return cy.getByDataCy('home-sign-in-btn');
  }

  get signUpBtn() {
    return cy.getByDataCy('home-sign-up-btn');
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
