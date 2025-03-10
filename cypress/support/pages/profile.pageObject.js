import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
 

  get profileInfo() {
    return cy.getByDataCy('profile-info');
  }

  assertUserInfo(newBio) {
    this.profileInfo.should('contain',newBio);
  }
}

export default ProfilePageObject;