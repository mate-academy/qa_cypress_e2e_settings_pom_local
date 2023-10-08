/* eslint-disable semi */
import PageObject from '../PageObject'

class HomePageObject extends PageObject {
  url = '/#/'

  get usernameLink() {
    return cy.getByDataCy('profile-link')
  }

  get settingsLink() {
    return cy.getByDataCy('settings-link')
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link')
  }

  get newArticle() {
    return cy.getByDataCy('new-article-link')
  }

  get errorMessage() {
    return cy.getByDataCy('error-messages')
  }

  get noArticlesBlock() {
    return cy.getByDataCy('no-articles')
  }

  get globalFeedTab() {
    return cy.getByDataCy('global-feed')
  }

  clickGlobalFeedTab() {
    this.globalFeedTab.click()
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username)
  }

  assertHeaderDoesNotContainUsername() {
    this.usernameLink.should('not.exist')
  }

  assertPageContainsCredsErrorMessage() {
    this.errorMessage.should('contain', 'email or password:')
    this.errorMessage.should('contain', 'is invalid')
  }

  assertThereAreNoArticles() {
    this.noArticlesBlock.should('exist')
    this.clickGlobalFeedTab()
    this.noArticlesBlock.should('exist')
  }
}

export default HomePageObject
