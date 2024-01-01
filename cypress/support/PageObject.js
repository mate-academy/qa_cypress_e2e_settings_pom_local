class PageObject {
  url = 'http://localhost:3000';
  visit(url) {
    cy.visit(url || this.url);
  }
}

export default PageObject;
