import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  urlFor(username) { return `/profile/${username}`; }

  get profileUsername() { return cy.getByDataCy('profile-username'); }
  get profileBio()      { return cy.getByDataCy('profile-bio'); }

  assertUsernameIs(username) {
    this.profileUsername.should('contain', username);
  }

  assertBioIs(bio) {
    this.profileBio.should('contain', bio);
  }
}
export default ProfilePageObject;
