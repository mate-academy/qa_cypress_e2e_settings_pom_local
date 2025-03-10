/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const homePage = new HomePageObject();
const settingPage = new SettingsPageObject();
const signUpPage = new SignUpPageObject();
const userPage = new UserPageObject();
const articlePage = new ArticlePageObject();

describe('Follow/unfollow button', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      signUpPage.visit('');

      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpBtn();
    });
  });

  it('should provide an ability to follow the another user', () => {
    homePage.clickArticleLink();

    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickArticleBtn();
    // cy.wait(2000);
    articlePage.checkThatArticleWasCreated(article.title);

    settingPage.clickSettingsLink();
    settingPage.clickLogoutBtn();
    userPage.clickSignUpLink();

    signUpPage.typeUsername(user.username + 'newUser');
    signUpPage.typeEmail(user.email + 'ca');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.clickGlobalTab();
    articlePage.findNewArticle(article.title);
    userPage.clickFollowBtn();
    homePage.visit('');
    articlePage.checkThatUserFollowToAnotherUser(user.username);
  });
});
