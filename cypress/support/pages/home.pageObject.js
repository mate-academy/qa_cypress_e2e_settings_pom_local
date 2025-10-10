class HomePageObject {
  assertHeaderContainUsername(username) {
    cy.get('[data-cy="header-username"]').should('contain', username);
  }
}

export default HomePageObject;
