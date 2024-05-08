import PageObject from '../PageObject';

class ProfilePage extends PageObject {
  url = '/profile';

  get userNameProfile() {
    return cy.getByDataCy('username-profile');
  }

  get bioProfile() {
    return cy.getByDataCy('bio-profile');
  }

  checkUserName(username) {
    this.userNameProfile.should('contain', username);
  }

  checkBio(bio) {
    this.bioProfile.should('contain', bio);
  }

}

export default ProfilePage;