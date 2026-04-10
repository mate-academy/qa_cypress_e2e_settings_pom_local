import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '';

  get profileHeader() {
    return cy.getByDataCy('profile-header');
  }

  get profileBio() {
    return cy.getByDataCy('profile-bio');
  }

  get profileEditLink() {
    return cy.getByDataCy('profile-edit-link');
  }

  assertHeaderContainUsername(username) {
    this.profileHeader.should('contain', username);
  }

  assertBioContainCorrectData(bio) {
    this.profileBio.should('contain', bio);
  }

  clickProfileEditLink() {
    this.profileEditLink.click();
  }
}

export default ProfilePageObject;