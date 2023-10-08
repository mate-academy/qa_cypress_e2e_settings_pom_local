/* eslint-disable semi */
import PageObject from '../PageObject'

class ArticlePageObject extends PageObject {
  url = '/editor'

  get title() {
    return cy.getByDataCy('banner-article-title')
  }

  get editArticleLink() {
    return cy.getByDataCy('edit-article-link').first()
  }

  get deleteArticleButton() {
    return cy.getByDataCy('delete-article-btn').first()
  }

  clickEditArticle() {
    this.editArticleLink.click()
  }

  clickDeleteArticle() {
    this.deleteArticleButton.click()
  }

  assertHasProperArticleTitle(articleTitle) {
    this.title.should('contain.text', articleTitle)
  }
}

export default ArticlePageObject
