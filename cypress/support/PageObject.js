class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  assertUrl(pageUrl) {
    cy.url().should('contain', pageUrl);
  }

  clickOnButton(buttonName) {
    cy.contains('[data-cy]', buttonName)
      .click();
  }
}

export default PageObject;
