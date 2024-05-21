import PageObject from '../PageObject';
export default class ProfilePageObject extends PageObject {
  url = '/';

  AssertUpdatedBio(bio) {
    cy.getByDataCy('bioText').should('contain', bio);
  }
}