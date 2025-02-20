/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let article;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser')
      .then((generateUser) => {
        const { email, username, password } = generateUser;
        cy.login(email, username, password).then(() => generateUser);
      })
      .as('user');

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });

    articlePage.visit();
  });

  it('should be created using New Article form', function () {
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTag(`${article.tag}{enter}`);
    articlePage.publishArticle();
    articlePage.visit(`/profile/${this.user.username.toLowerCase()}`);
    articlePage.findTitleText(article.title);
  });

  it('should be edited using Edit button', function () {
    cy.createArticle(article.title, article.description, article.body);
    articlePage.visit(`/profile/${this.user.username.toLowerCase()}`);
    articlePage.moveToArticle();
    articlePage.clickOnEdit();

    cy.task('generateArticle').then((generateArticle) => {
      articlePage.typeTitle(generateArticle.title);
      articlePage.typeDescription(generateArticle.description);
      articlePage.typeBody(generateArticle.body);
      articlePage.typeTag(`${generateArticle.tag}{enter}`);
      articlePage.publishArticle();
      articlePage.visit(`/profile/${this.user.username.toLowerCase()}`);
      articlePage.findTitleText(generateArticle.title);
    });
  });

  it('should be deleted using Delete button', function () {
    cy.createArticle(article.title, article.description, article.body);
    articlePage.visit(`/profile/${this.user.username.toLowerCase()}`);
    articlePage.moveToArticle();
    articlePage.deleteArticle();
    cy.on('window:confirm', (message) => {
      expect(message).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.visit(`/profile/${this.user.username.toLowerCase()}`);
    cy.get('.article-preview').should(
      'contain.text',
      'No articles are here... yet.'
    );
  });
});
