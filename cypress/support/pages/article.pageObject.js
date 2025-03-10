import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/editor';

  get titleField() {
    return cy.getByDataCy('article-title-field');
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  get descriptionField() {
    return cy.getByDataCy('article-description');
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  get articleInpytField() {
    return cy.getByDataCy('article-text');
  }

  typeBody(body) {
    this.articleInpytField.type(body);
  }

  get findBtn() {
    return cy.getByDataCy('create-article-btn');
  }

  clickArticleBtn() {
    this.findBtn.click();
  }

  get articleSection() {
    return cy.getByDataCy('article-title');
  }

  checkThatArticleWasCreated(title) {
    this.articleSection.should('contain.text', title);
  }

  get findArticlesList() {
    return cy.getByDataCy('article-list');
  }

  findNewArticle(title) {
    this.findArticlesList.should('contain.text', title).click();
  }

  get findEditBtn() {
    return cy.get('[data-cy="article-title"] ' +
    '> .article-meta > :nth-child(3) > .btn-outline-secondary');
  }

  clickEditBtn() {
    this.findEditBtn.click();
  }

  get findDeleteBtn() {
    return cy.get('[data-cy="article-title"] ' +
    '> .article-meta > :nth-child(3) > [data-cy="delete-btn"]');
  }

  clickDeleteBtn() {
    this.findDeleteBtn.click();
  }

  get checkList() {
    return cy.getByDataCy('article-list');
  }

  articleWasDeleted(title) {
    this.checkList.should('contain.text', 'No articles are here... yet.');
  }

  checkThatUserFollowToAnotherUser(user) {
    this.findArticlesList.should('contain.text', user);
  }
}

export default ArticlePageObject;
