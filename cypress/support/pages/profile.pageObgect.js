import PageObject from '../PageObject';

class profilePageObject extends PageObject {
  url ='/profile/';

  assertNewUsername(username) {
    cy.url().should('include', `/profile/${username}`);

    cy.getByDataCy('user-info-profile')
      .find('h4')
      .should('contain', username);
  }

  assertNewBio(bio) {
    cy.getByDataCy('user-info-profile')
      .find('p')
      .should('contain', bio);
  }
}

export default profilePageObject;