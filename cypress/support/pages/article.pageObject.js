import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  visit() {
    cy.visit('/editor');
  }
  
  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get articleDescription() {
    return cy.getByDataCy('article-description');
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  get articleTags() {
    return cy.getByDataCy('article-tag');
  }

  clickOnPublishBtn() {
    cy.getByDataCy('article-publish')
      .click();
  }

  assertArticleCreated(title) {
    cy.get('h1')
    .should('contain', title);
  }

  clickOnEditBtn() {
    cy.getByDataCy('edit-btn')
      .eq(0)
      .click();
  }

  assertArticleUpdated(title) {
    cy.get('h1')
    .should('contain', title);
  }

  clickOnDeleteBtn() {
    cy.getByDataCy('delete-btn')
    .eq(0)
    .click();
  }

  assertArticleDeleted() {
    cy.getByDataCy('no-articles')
     .should('contain', 'No articles are here... yet.');
  }
};

export default ArticlePageObject;