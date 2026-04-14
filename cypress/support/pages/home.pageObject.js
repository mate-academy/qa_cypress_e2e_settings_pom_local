import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/';

  assertHeaderContainUsername(username) {
    this.profileLink
      .should('be.visible')
      .should('contain', username);
  }
}

export default HomePageObject;
