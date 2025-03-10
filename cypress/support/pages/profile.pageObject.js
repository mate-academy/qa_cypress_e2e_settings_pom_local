import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile';

  get userBioField() {
    return cy.get('[data-cy="user-bio"]');
  }
  assertBio(bio) {
    this.userBioField
      .should('contain', bio);
  }
}
export default ProfilePageObject;