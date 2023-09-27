import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get signInLink() {
    return cy.contains('.nav-link', 'Sign in');
  }

  get signUpBtn() {
    return cy.contains('.nav-link', 'Sign up');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickSignInBtn() {
    this.signInLink.click();
  }

  accertLogOut() {
    this.signInLink.should('exist');
    this.signUpBtn.should('exist');
  }
}

export default HomePageObject;
