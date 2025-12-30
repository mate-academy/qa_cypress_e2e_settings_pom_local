/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
  
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.login(user.email, user.username, user.password);
    });

    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
  });

  it('should create article using New Article form', () => {
    articlePage.visit();
    articlePage.newArticleLink.click();

    articlePage.createArticle(
      article.title, 
      article.description, 
      article.body, 
      article.tag
    );

    articlePage.articleBtnSubmit.should('be.visible').click();

    cy.url().should('include', '/article/');
  });


  it('should be edited using Edit button', () => {
    articlePage.visit();
    articlePage.newArticleLink.click();

    articlePage.createArticle(
      article.title, 
      article.description, 
      article.body, 
      article.tag
    );

    articlePage.articleBtnSubmit.should('be.visible').click();

    cy.url().should('include', '/article/');

    articlePage.articleEditBtn.eq(0).click();

    const newArticle = {
      title: faker.lorem.word(),
      description: faker.lorem.words(),
      body: faker.lorem.words(),
      tag: faker.lorem.word()
    };

    articlePage.typeField(articlePage.articleTitleField, newArticle.title);
    articlePage.typeField(
      articlePage.articleDescriptionField, 
      newArticle.description
    );
    articlePage.typeField(articlePage.articleBodyField, newArticle.body);

    articlePage.articleBtnSubmit.should('be.visible').click();
  });

  it('should be deleted using Delete button', () => {
    articlePage.visit();
    articlePage.newArticleLink.click();

    articlePage.createArticle(
      article.title, 
      article.description, 
      article.body, 
      article.tag
    );

    articlePage.articleBtnSubmit.click().click();

    cy.url().should('include', '/article/');

    articlePage.deleteArticle();

    articlePage.articlesMessage.should('have.text', `No articles are here... yet.`);
  });
});
