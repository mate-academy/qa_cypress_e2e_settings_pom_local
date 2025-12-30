import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/';

  get newArticleLink() {
    return cy.getByDataCy('new-article-link');
  }

  get articleTitleField() {
    return cy.getByDataCy('article-input');
  }

  get articleDescriptionField() {
    return cy.getByDataCy('article-description');
  }

  get articleBodyField() {
    return cy.getByDataCy('article-textarea');
  }

  get articleTags() {
    return cy.getByDataCy('article-tags');
  }

  get articleBtnSubmit() {
    return cy.getByDataCy('article-submit');
  }

  get articleEditBtn() {
    return cy.getByDataCy('article-editor');
  }

  get articleDeleteBtn() {
    return cy.getByDataCy('delete-article-main');
  }

  get articlesMessage() {
    return cy.getByDataCy('no-articles-message');
  }

  typeArticleTitle(articleTitle) {
    this.articleTitleField.type(articleTitle);
  }

  typeArticleDescriptionField(articleDescription) {
    this.articleDescriptionField.type(articleDescription);
  }

  typeArticleBodyField(articleBody) {
    this.articleBodyField.type(articleBody);
  }

  typeArticleTags(articleTags) {
    this.articleTags.type(`${articleTags}{enter}`);
  }

  typeField(field, text) {
    field.then(($el) => {
      if ($el.val().length > 0) {
        cy.wrap($el).clear();
      }
    }).type(text);
  }

  createArticle(title,description,body,tag) {
    this.typeArticleTitle(title);
    this.typeArticleDescriptionField(description);
    this.typeArticleBodyField(body);
    this.typeArticleTags(tag);
  }

  deleteArticle() {
    this.articleDeleteBtn.eq(0).click();
  }
}

export default ArticlePageObject;