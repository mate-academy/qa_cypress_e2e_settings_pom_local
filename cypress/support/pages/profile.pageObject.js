import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  constructor(username) {
    super();

    this.url = '/profile/' + username;
  }

  get profileUsername() {
    return cy.getByDataCy('profile-username');
  }

  get profileBio() {
    return cy.getByDataCy('profile-bio');
  }

  assertProfileContainUsername(username) {
    this.profileUsername
      .should('contain', username);
  }

  assertProfielContainBio(bio) {
    this.profileBio
      .should('contain', bio);
  }

  assertProfileUsernameUpdated(newUsername) {
    this.profileUsername.should('contain', newUsername);
  }

  assertProfileBioUpdated(newBio) {
    expect(this.profileBio).to.equal(newBio);
  }
}

export default ProfilePageObject;
