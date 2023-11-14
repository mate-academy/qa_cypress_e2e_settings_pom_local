import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  clickOnUserNameLink() {
    this.usernameLink.click();
}

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername() {
    this.usernameLink
      .should('not.exist', 'profile-link');
  }
  
}

export default HomePageObject;
