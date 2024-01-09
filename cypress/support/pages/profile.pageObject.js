import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainNewUsername(newUsername) {
    this.usernameLink
      .should('contain', newUsername);
  }

}

export default ProfilePageObject;