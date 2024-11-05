class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  static getElement(selector) {
    return cy.get(`[data-cy="${selector}"]`);
  }

  static type(selector, text) {
    this.getElement(selector).type(text);
  }

  static click(selector) {
    this.getElement(selector).click();
  }
}

export default PageObject;
