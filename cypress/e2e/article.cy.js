/* eslint-disable semi */
/// <reference types="cypress" />
/// <reference types="../support" />
import ArticlePageObject from '../support/pages/article.pageObject'
import EditArticlePageObject from '../support/pages/editArticle.pageObject'
import HomePageObject from '../support/pages/home.pageObject'
import SettingsPageObject from '../support/pages/settings.pageObject'
const editArticlePage = new EditArticlePageObject()
const articlePage = new ArticlePageObject()
const settingsPage = new SettingsPageObject()
const homePage = new HomePageObject()

describe('Article', () => {
  let user
  let article

  beforeEach(() => {
    cy.task('db:clear')
    settingsPage.visit()
    settingsPage.logout()
    cy.task('generateUser').then((generateUser) => {
      user = generateUser
      cy.login(user.email, user.username, user.password)
      cy.task('generateArticle').then((generatedArticle) => {
        article = generatedArticle
      })
      editArticlePage.visit()
    })
  })

  it('should be created using New Article form', () => {
    editArticlePage.createArticle(article)
    articlePage.assertHasProperArticleTitle(article.title)
  })

  it('should be edited using Edit button', () => {
    editArticlePage.createArticle(article)
    articlePage.clickEditArticle()
    cy.task('generateArticle').then((newArticle) => {
      editArticlePage.editArticle(newArticle)
      articlePage.assertHasProperArticleTitle(newArticle.title)
    })
  })

  it('should be deleted using Delete button', () => {
    editArticlePage.createArticle(article)
    articlePage.clickDeleteArticle()
    articlePage.assertAllert('Do you really want to delete it?')
    homePage.assertThereAreNoArticles()
  })
})
