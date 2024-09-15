import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/#/';

  get profileInfoContainer() {
    return cy.getByDataCy('profile-info');
  }

  assertProfileInfo(bio) {
    this.profileInfoContainer
      .should('contain', bio);
  }
}

export default ProfilePageObject;