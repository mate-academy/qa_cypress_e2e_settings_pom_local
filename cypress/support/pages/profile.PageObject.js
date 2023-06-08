import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile/';

  get usernameProfile() {
    return cy.getByDataCy('profile-username');
  }

  get bioProfile() {
    return cy.getByDataCy('profile-bio');
  }
}

export default ProfilePageObject;