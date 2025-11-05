/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const homeInPage = new HomePageObject();
const articleInPage = new ArticlePageObject();

describe('Follow/unfollow button', () => {
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

  it('should provide an ability to follow the another user', () => {
    articleInPage.visit();
            articleInPage.typeTitle(article.title);
    articleInPage.typeDescription(article.description);
    articleInPage.typeBody(article.body);
    articleInPage.typeTags(article.tag);
    articleInPage.clickPublishArticleBtn();
    homeInPage.visit();
    homeInPage.clickGlobalFeedBtn();
    homeInPage.clickFollowBtn();
    homeInPage.assertFollowedUser();
    
  });

  it.only('should provide an ability to unfollow the another user', () => {
        articleInPage.visit();
            articleInPage.typeTitle(article.title);
    articleInPage.typeDescription(article.description);
    articleInPage.typeBody(article.body);
    articleInPage.typeTags(article.tag);
    articleInPage.clickPublishArticleBtn();
    homeInPage.visit();
    homeInPage.clickGlobalFeedBtn();
    homeInPage.clickFollowBtn();
    homeInPage.clickFollowBtn();
    homeInPage.assertUnfollowedUser();
  });
});
