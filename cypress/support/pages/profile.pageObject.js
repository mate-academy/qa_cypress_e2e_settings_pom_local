import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get profileBio() {
    return cy.getByDataCy('bio');
  }

  assertBio(bio) {
    this.profileBio
      .should('contain', bio);
  }
}

export default ProfilePageObject;