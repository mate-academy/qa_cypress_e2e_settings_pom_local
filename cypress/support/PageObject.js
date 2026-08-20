class PageObject {
  getByDataCy(selector) {
    return cy.getByDataCy(selector);
  }

  visit(url) {
    return cy.visit(url || this.url);
  }
}

export default PageObject;
