import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  visit(user) {
    cy.visit(`/profile/${user}`);
  }

  assertBioIsExist(bio) {
    cy.get('p').should ('contain', bio);
  }
}
export default ProfilePageObject;