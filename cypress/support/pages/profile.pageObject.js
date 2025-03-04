import PageObject from '../PageObject';

class profilePageObject extends PageObject {
  url = '/profile/';

  assertNewBio(bio) {
    cy.get('.col-xs-12.col-md-10.offset-md-1').should('contain', bio);
  }
}

export default profilePageObject;