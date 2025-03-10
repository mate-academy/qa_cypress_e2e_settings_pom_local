import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get userContainer() {
    return cy.get('.profile-page .user-info .container');
  }

  get settingsLink() {
    return cy.get(':nth-child(3) > .nav-link');
  }

  get signInLink() {
    return cy.get('[href="/user/login"]');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertUpdatedBio(bio) {
    this.userContainer
      .should('contain', bio);
  }

  clickOnSettingsLink() {
    this.settingsLink.click();
  }

  clickOnSignInLink() {
    this.signInLink.click();
  }
}

export default HomePageObject;