class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }
  get profileLink() {
    return cy.getByDataCy('profile-link');
  }
}

export default PageObject;
