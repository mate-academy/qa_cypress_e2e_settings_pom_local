import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile/';

  get userBio() {
    return cy.getByDataCy('profile-info');
  }

  assertUserBio(newBio) {
    this.userBio.should('include', newBio);
  }

}

export default ProfilePageObject;