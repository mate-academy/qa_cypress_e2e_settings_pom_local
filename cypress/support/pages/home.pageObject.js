import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link');
  }

  get navbar() {
    return cy.getByDataCy('navbar');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername(username) {
    this.navbar
      .should('not.contain', username);
  }

  clickUsernameLink() {
    this.usernameLink.click();
  }

  clickSettingsLink() {
    this.settingsLink.click();
  }

  clickSignInLink() {
    this.signInLink.click();
  }
}

export default HomePageObject;
