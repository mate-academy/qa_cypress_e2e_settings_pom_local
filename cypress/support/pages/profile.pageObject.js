import PageObject from '../PageObject';

class ProfilePajeObject extends PageObject {
  get userBio() {
    return cy.getByDataCy('user-bio');
  }

  assertBio(bio) {
    this.userBio.should('have.text', bio);
  }
}

export default ProfilePajeObject;