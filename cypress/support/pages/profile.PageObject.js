import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  assertBio(bio) {
    cy.getByDataCy('profile-bio').should('contain', bio);
  }

  assertHeaderContainUsername(username) {
    cy.getByDataCy('profile-link')
      .should('contain', username);
  }
}

export default ProfilePageObject;
