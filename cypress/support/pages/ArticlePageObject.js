/* eslint-disable cypress/unsafe-to-chain-command */
import PageObject from '../PageObject';
import { faker } from '@faker-js/faker';

class ArticlePageObject extends PageObject {

  visitNewArticle() {
    cy.getByDataCy('new-article').click();
  }

  typeTitle(title) {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.getByDataCy('article-title').clear().type(title);
  }

  typeDescription(description) {
    cy.getByDataCy('article-description').clear().type(description);
  }

  typeBody(body) {
    cy.getByDataCy('article-body').clear().type(body);
  }

  publishArticle() {
    cy.getByDataCy('publish-article').click();
  }

  editArticle() {
    cy.getByDataCy('edit-article').click();
  }

  deleteArticle() {
    cy.getByDataCy('delete-article').click();
  }

  assertArticleExists(title) {
    cy.getByDataCy('article-title-display').should('contain', title);
  }

  assertArticleNotExists(title) {
    cy.getByDataCy('article-title-display').should('not.contain', title);
  }
}

export default ArticlePageObject;
