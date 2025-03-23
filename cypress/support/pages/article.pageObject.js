import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/editor';

  get titleField() {
    return cy.getByDataCy('title');
  }

  get descriptionField() {
    return cy.getByDataCy('description');
  }

  get bodyField() {
    return cy.getByDataCy('body');
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article');
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article');
  }

  typeTitle(title) {
    this.titleField.type(title, { force: true });
  }

  typeDescription(description) {
    this.descriptionField.type(description, { force: true });
  }

  typeBody(body) {
    this.bodyField.type(body, { force: true });
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }

  clickEditArticleBtn(first = false) {
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }
}

export default ArticlePageObject;
