class PageObject {
  assertHeaderContainUsername(username) {
    cy.getByDataCy('profile-link').should('contain', username);
  }

  openSettings() {
    cy.getByDataCy('settings-link').click();
    cy.location('pathname').should('eq', '/settings');
  }

  assertLoggedOut() {
    cy.getByDataCy('sign-in-link').should('be.visible');
    cy.getByDataCy('profile-link').should('not.exist');
    cy.getCookie('auth').should('be.null');
    cy.window().its('localStorage').invoke('getItem', 'user').should('be.null');
  }
  visit(url) {
    cy.visit(url || this.url);
  }
}

export default PageObject;
