import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  assertUsername(username) {
    cy.location('pathname', { timeout: 20000 })
      .should('eq', `/profile/${username}`);
    cy.getByDataCy('profile-username').should('have.text', username);
    this.assertHeaderContainUsername(username);
  }

  assertBio(bio) {
    cy.getByDataCy('profile-bio').should('have.text', bio);
  }
}

export default ProfilePageObject;
