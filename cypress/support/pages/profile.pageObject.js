import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  assertBioField(bio) {
    cy.getByDataCy('profile-bio').should('contain', bio);
  }
}

export default ProfilePageObject;