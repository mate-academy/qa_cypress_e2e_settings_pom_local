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
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
        cy.task('db:clear');
     cy.login(user.email, user.username, user.password);
  });

  it('should be created using New Article form', () => {
    articleInPage.visit();
    articleInPage.typeTitle(article.title);
    articleInPage.typeDescription(article.description);
    articleInPage.typeBody(article.body);
    articleInPage.typeTags(article.tag);
    articleInPage.clickArticleBtn();
    homeInPage.assertTitleInBanner(article.title);
    homeInPage.assertBodyUnderBanner(article.body);
  });

  it('should be edited using Edit button', () => {
    articleInPage.visit();
    articleInPage.typeTitle(article.title);
    articleInPage.typeDescription(article.description);
    articleInPage.typeBody(article.body);
    articleInPage.typeTags(article.tag);
    articleInPage.clickArticleBtn();
    homeInPage.clickInEditionOfArticle();
    articleInPage.bodyInput
    .clear()
    .type('New Editted Text!!!');
    articleInPage.clickArticleBtn();
    homeInPage.assertNewArticle(article.title, 'New Editted Text!!!');

  });

  it('should be deleted using Delete button', () => {
    articleInPage.visit();
    articleInPage.typeTitle(article.title);
    articleInPage.typeDescription(article.description);
    articleInPage.typeBody(article.body);
    articleInPage.typeTags(article.tag);
    articleInPage.clickArticleBtn();
    homeInPage.clickInDeletionOfArticle();
    homeInPage.clickHomeLink();
    homeInPage.clickGlobalFeedBtn();
    homeInPage.assertDeletedArticle(article.title, article.description);
  });
});
