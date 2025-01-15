/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();
const settingPage = new SettingsPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('Follow/nofollow button', () => {
  before(() => {
    cy.task('db:clear');

    cy.task('generateUser')
      .then((generateUser) => {
        const { email, username, password } = generateUser;
        cy.login(email, username, password).then(() => generateUser);
      })
      .as('user');

    cy.task('generateArticle').then((generateArticle) => {
      const { title, description, body } = generateArticle;

      cy.createArticle(title, description, body);
    });
    cy.get('@user').then((user) => {
      settingPage.visit();

      homePage.assertHeaderContainUsername(user.username.toLowerCase());

      settingPage.logout();
    });
  });

  it('should provide an ability to follow the another user', () => {
    cy.task('generateUser').then((generateUser) => {
      const { email, username, password } = generateUser;
      cy.login(email, username, password).then(() => generateUser);
    });

    userPage.visit();
    userPage.moveOnGlobalFeed();
    userPage.moveOnAnotherUser();
    userPage.clickOnFollowBtn();
    homePage.visit();
    articlePage.hasArticlePreview();
  });

  it('should provide an ability to unfollow the another user', () => {
    cy.task('generateUser').then((generateUser) => {
      const { email, username, password } = generateUser;
      cy.login(email, username, password).then(() => generateUser);
    });

    userPage.visit();
    userPage.moveOnGlobalFeed();
    userPage.moveOnAnotherUser();
    userPage.clickOnFollowBtn();
    homePage.visit();
    articlePage.hasArticlePreview();

    userPage.visit();
    userPage.moveOnGlobalFeed();
    userPage.moveOnAnotherUser();
    userPage.clickOnFollowBtn();
    homePage.visit();
    articlePage.noArticles();
  });
});
