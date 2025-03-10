class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }

  clickOnSettingsLink() {
    this.settingsLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername() {
    this.usernameLink
      .should('not.exist');
  }

  assertPageUrl() {
    cy.url()
      .should('equal', Cypress.config().baseUrl + `/`);
  }
}

export default PageObject;
