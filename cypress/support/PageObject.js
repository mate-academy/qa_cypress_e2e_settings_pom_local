class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  openSettings() {
    cy.get('[data-cy="nav-settings"]').click();
  }

  assertLoggedUsername(username) {
    cy.get('[data-cy="nav-username"]')
      .should('be.visible')
      .and('contain', username);
  }
}

export default PageObject;
