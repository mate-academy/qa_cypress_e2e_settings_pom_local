import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get settingLink() {
    return cy.getByDataCy('settings');
  }

  get signInLink() {
    return cy.getByDataCy('signIn-link');
  }

  clickSettings() {
    this.settingLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderContainSignIn() {
    this.signInLink
      .should('contain', 'Sign in');
  }
}

export default HomePageObject;
