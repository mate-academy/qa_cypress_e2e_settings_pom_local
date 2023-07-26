import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get profilePageBio() {
    return cy.getByDataCy('profile-bio');
  }

  assertProfilePageContainBio(bio) {
    this.profilePageBio
      .should('contain', bio);
  }
}

export default ProfilePageObject;
