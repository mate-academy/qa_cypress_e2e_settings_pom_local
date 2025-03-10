import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
 

  get profileInfo() {
    return cy.getByDataCy('profile-info');
  }

  assertProfileBio(newBio) {
    this.profileInfo.should('contain',newBio);
  }
}

export default ProfilePageObject;
