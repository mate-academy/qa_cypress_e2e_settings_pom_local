/* eslint-disable semi */
import PageObject from '../PageObject'

class EditArticlePageObject extends PageObject {
  url = '/editor'

  get title() {
    return cy.getByDataCy('article-title')
  }

  get description() {
    return cy.getByDataCy('article-description')
  }

  get body() {
    return cy.getByDataCy('article-body')
  }

  get tags() {
    return cy.getByDataCy('article-tags')
  }

  get submitButton() {
    return cy.getByDataCy('article-submit')
  }

  clearTitle() {
    this.title.clear()
  }

  typeTitle(title) {
    this.title.type(title)
  }

  clearDescription() {
    this.description.clear()
  }

  typeDesctription(description) {
    this.description.type(description)
  }

  clearBody() {
    this.body.clear()
  }

  typeBody(body) {
    this.body.type(body)
  }

  addTag(tag) {
    this.tags.type(tag + '{Enter}')
  }

  submitArticle() {
    this.submitButton.click()
  }

  createArticle(article) {
    this.typeTitle(article.title)
    this.typeDesctription(article.description)
    this.typeBody(article.body)
    this.addTag(article.tag)
    this.submitArticle()
  }

  editArticle(newArticle) {
    this.clearTitle()
    this.clearDescription()
    this.clearBody()
    this.createArticle(newArticle)
  }
}

export default EditArticlePageObject
