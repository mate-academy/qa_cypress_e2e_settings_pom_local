/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

describe('Article', () => {
  let article;
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  it('should be created using New Article form', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.clickArticleLink();

    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickArticleBtn();
    articlePage.checkThatArticleWasCreated(article.title);
  });

  it('should be edited using Edit button', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.clickGlobalTab();
    articlePage.findNewArticle(article.title);
    articlePage.clickEditBtn();
    articlePage.typeTitle('123');
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickArticleBtn();
    articlePage.checkThatArticleWasCreated(article.title + '123');
  });

  it('should be deleted using Delete button', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.clickGlobalTab();
    articlePage.findNewArticle(article.title + '123');
    articlePage.clickDeleteBtn();

    homePage.clickGlobalTab();
    articlePage.articleWasDeleted();
  });
});
