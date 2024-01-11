import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile';

  get userNameText() {
    return cy.getByDataCy('username-text');
  }

  assertProfileContainUsername(username) {
    this.userNameText
      .should('contain', username);
  }
}

export default ProfilePageObject;