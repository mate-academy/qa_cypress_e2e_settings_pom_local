class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default PageObject;
