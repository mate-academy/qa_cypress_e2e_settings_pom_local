class PageObject {
  visit(url) {
    cy.visit(url || this.url)
  }

  assertHaveText(element, text) {
    element.should('have.text', text)
  }
}

export default PageObject
