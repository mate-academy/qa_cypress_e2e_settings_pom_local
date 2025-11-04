/// <reference types="cypress" />
/// <reference types="../support" />

import articlePageObject from '../support/pages/article.pageObject';
import settingsPageObject from '../support/pages/settings.pageObject';
import PageObject from '../support/PageObject';
import HomePageObject from '../support/pages/home.pageObject';

describe('Follow/unfollow button', () => {

  const articlePage = new articlePageObject();
  const settingsPage = new settingsPageObject();
  const pageObject = new PageObject();
  const homePage = new HomePageObject();

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
    });
    cy.createArticle();
    settingsPage.visit();
    settingsPage.clickInLogout();
    settingsPage.assertLoggedOutUser();
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
    });
    cy.visit('/');
  });

  it('should provide an ability to follow the another user', () => {
    homePage.clickInGlobalFeed();
    homePage.clickInAuthor();
    homePage.followUser();
    homePage.assertFollowedUser();
  });

  it('should provide an ability to unfollow the another user', () => {
    cy.followUser();
    homePage.unfollowUser();
    homePage.assertUnfollowedUser();
  });
});