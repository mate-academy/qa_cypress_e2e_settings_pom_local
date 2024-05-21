import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile';

  get usernameInBanner() {
    return cy.getByDataCy('username');
  }

  get bioInBanner() {
    return cy.getByDataCy('bio');
  }

  assertBannerContainUsername(username) {
    this.usernameInBanner
      .should('contain', username);
  }

  assertBannerContainBio(bio) {
    this.bioInBanner
      .should('contain', bio);
  }  
}

export default ProfilePageObject;