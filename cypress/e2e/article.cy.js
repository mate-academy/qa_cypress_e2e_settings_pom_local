/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
	let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');

		cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
		cy.login(user.email, user.username, user.password);
    articlePage.visit();
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBodyArticle(article.body);
    articlePage.clickPublishBtn();

    articlePage.checkPublishArticle(article.title, article.body);
    articlePage.checkActiveBtn();
  });

  it('should be edited using Edit button', () => {
		cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      });

    articlePage.checkPublishArticle(article.title, article.body);
    articlePage.checkActiveBtn();

		articlePage.clickEditBtn();
		articlePage.typeTitle(`New_${article.title}`);
		cy.wait(500);
		articlePage.clickUpdateBtn();
		cy.get('h1').should('contain.text', 'New_');
  });

  it('should be deleted using Delete button', () => {
		cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      });

    articlePage.checkPublishArticle(article.title, article.body);
    articlePage.checkActiveBtn();

		articlePage.clickDeleteBtn();

		cy.url().should('eq', 'http://localhost:3000/');
  });
});
