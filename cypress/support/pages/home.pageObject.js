import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return this.getByDataCy('profile-link');
  }

  get profileUsername() {
    return this.getByDataCy('profile-username');
  }

  get profileBio() {
    return this.getByDataCy('profile-bio');
  }

  get signInLink() {
    return this.getByDataCy('sign-in-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertProfileUsername(username) {
    this.profileUsername.should('contain', username);
  }

  assertProfileBio(bio) {
    this.profileBio.should('contain', bio);
  }

  assertUserIsLoggedOut() {
    this.signInLink.should('be.visible');
    this.usernameLink.should('not.exist');
  }
}

export default HomePageObject;
