/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new homePageObject();

describe('Follow/unfollow button', () => {
	let user;
	let user2;
  let article;

  beforeEach(() => {
		cy.task('db:clear');

		cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
		cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide an ability to follow the another user', () => {
		cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      });
		settingsPage.visit();
		settingsPage.clickLogoutBtn();
		cy.login(user2.email, user2.username, user2.password);	
		homePage.clickGlobalFead();
		cy.wait(500);
		cy.get(`[href="/profile/${user.username}"]`).click({ multiple: true });
		cy.get('.btn').contains('Follow').click();
		cy.get('.btn').contains('Unfollow').click();
		cy.get('.btn').contains('Follow').should('exist');
  });
});
