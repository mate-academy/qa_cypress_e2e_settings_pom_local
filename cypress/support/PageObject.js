class PageObject {
  visit(url) {
    const targetUrl = url || this.url;

    cy.location('pathname').then((pathname) => {
      if (pathname === targetUrl) {
        cy.reload({
          log: true,
          timeout: 120000,
        });
      } else {
        cy.visit(targetUrl, {
          timeout: 120000,
          pageLoadTimeout: 120000,
          waitUntil: 'domcontentloaded',
        });
      }
    });
  }

  get profileLink() {
    return cy.getByDataCy('profile-link');
  }
}

export default PageObject;
