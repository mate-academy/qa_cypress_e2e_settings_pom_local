/// <reference types="cypress" />
/// <reference types="../../support" />

import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  constructor(username = '') {
    super();

    this.url = `/profile/${username}`;
  }

  get username() {
    return cy.getByDataCy('username-profile');
  }

  get bio() {
    return cy.getByDataCy('bio-profile');
  }

  checkUsernameValue(username) {
    return this.username.should('have.text', username);
  }

  checkBioValue(bio) {
    return this.bio.should('have.text', bio);
  }
}

export default ProfilePageObject;
