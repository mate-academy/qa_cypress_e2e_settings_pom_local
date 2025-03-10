import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get header() {
    return cy.get('[class="navbar navbar-light"]');
  }

  get settingsLink() {
    return cy.get('a.nav-link[href="/settings"]');
  }

  get signInLink() {
    return cy.get('[href="/user/login"]');
  }

  get userContainer() {
    return cy.get('.profile-page .user-info .container');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername(username) {
    this.header
      .should('not.contain', username);
  }

  assertUpdatedBio(userBio) {
    this.userContainer.should('contain', userBio);
  }

  openSettingsPage() {
    this.settingsLink.click();
  }

  openSignInPage() {
    this.signInLink.click();
  }
}

export default HomePageObject;
