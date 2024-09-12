import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = `/profile/#`;

  get usernameField() {
    return cy.getByDataCy('profile-username');
  }

  get bioField() {
    return cy.getByDataCy('profile-bio');
  }

  assertUsername() {
    this.usernameField
      .contains(user.username)
      .should('exist');
  }

  assertBio(bioText) {
    this.bioField
      .contains(bioText)
      .should('exist');
  }
}

export default ProfilePageObject;
