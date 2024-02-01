import PageObject from './PageObject';

class ArticlePageObject extends PageObject {
  constructor() {
    super();
    this.url = '/articles/new';
  }

  createArticle(title, description, body) {
    cy.get('[data-cy=title]').type(title);
    cy.get('[data-cy=description]').type(description);
    cy.get('[data-cy=body]').type(body);
    cy.get('[data-cy=submit]').click();
  }

  editArticle(title, description, body) {
    cy.get('[data-cy=edit]').click();
    cy.get('[data-cy=title]').clear().type(title);
    cy.get('[data-cy=description]').clear().type(description);
    cy.get('[data-cy=body]').clear().type(body);
    cy.get('[data-cy=submit]').click();
  }

  deleteArticle() {
    cy.get('[data-cy=delete]').click();
  }
}

export default ArticlePageObject;
