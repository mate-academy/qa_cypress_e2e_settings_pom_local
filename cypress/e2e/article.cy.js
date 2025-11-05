/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const articleInPage = new ArticlePageObject();
const homeInPage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
        cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {

    signInPage.visit();
     cy.login(user.email, user.username, user.password);
      signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should be created using New Article form', () => {
    articleInPage.visit();
    articleInPage.typeTitle(article.title);
    articleInPage.typeDescription(article.description);
    articleInPage.typeBody(article.body);
    articleInPage.typeTags(article.tag);
    articleInPage.clickPublishArticleBtn();
    homeInPage.visit();
    homeInPage.clickGlobalFeedBtn();
    homeInPage.assertNewArticle(article.title, article.description);
  });

  it('should be edited using Edit button', () => {
    articleInPage.visit();
    articleInPage.typeTitle(article.title);
    articleInPage.typeDescription(article.description);
    articleInPage.typeBody(article.body);
    articleInPage.typeTags(article.tag);
    articleInPage.clickPublishArticleBtn();
    homeInPage.visit();
    homeInPage.clickGlobalFeedBtn();
    homeInPage.openArticle();
    homeInPage.clickInEditionOfArticle();
    articleInPage.descriptionInput
    .clear()
    .type('New Editted Text!!!');
    articleInPage.clickUpdateArticleBtn();
    homeInPage.visit();
    homeInPage.clickGlobalFeedBtn();
    homeInPage.assertNewArticle(article.title, 'New Editted Text!!!');

  });

  it.only('should be deleted using Delete button', () => {
    articleInPage.visit();
    articleInPage.typeTitle(article.title);
    articleInPage.typeDescription(article.description);
    articleInPage.typeBody(article.body);
    articleInPage.typeTags(article.tag);
    articleInPage.clickPublishArticleBtn();
    homeInPage.visit();
    homeInPage.clickGlobalFeedBtn();
    homeInPage.openArticle();
    homeInPage.clickInDeletionOfArticle();
    homeInPage.clickGlobalFeedBtn();
    homeInPage.assertDeletedArticle(article.title, article.description);
  });
});
