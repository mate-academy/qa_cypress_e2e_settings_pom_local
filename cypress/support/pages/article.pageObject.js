import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/editor';

  get titleField() {
    return cy.getByDataCy('article-title');
  }

  get bioField() {
    return cy.getByDataCy('article-bio');
  }

  get bodyField() {
    return cy.getByDataCy('article-body');
  }

  get tagsField() {
    return cy.getByDataCy('article-tags');
  }

  get publishBtn() {
    return cy.getByDataCy('article-publish');
  }

  get newArticleButton() {
    return cy.getByDataCy('new-article-link');
  }

  get editArticleBtn() {
    return cy.get(
      '.container > .article-meta > :nth-child(3) > .btn-outline-secondary'
    );
  }

  get deleteArticleButton() {
    return cy.get(
      '.article-actions > .article-meta > :nth-child(3) > .btn-outline-danger'
    );
  }

  get articleTitle() {
    return cy.get('h1');
  }

  get articleBody() {
    return cy.get('div > p');
  }
  /*get errorMessages() {
    return cy.get('.error-messages > :nth-child(1)')
  }*/

  typeTitle(title) {
    this.titleField.type(title); return this;
  }

  typeBio(bio) {
    this.bioField.type(bio); return this;
  }

  typeBody(body) {
    this.bodyField.type(body); return this;
  }

  typeTags(tags) {
    this.tagsField.type(tags); return this;
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }

  clickNewArticleBtn() {
    this.newArticleButton.click();
  }

  clickeditArticleBtn() {
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleButton.click();
  }
}

export default ArticlePageObject;
