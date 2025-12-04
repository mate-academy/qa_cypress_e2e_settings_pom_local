/* eslint-disable max-len */
/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/ArticlePageObject';
import { faker } from '@faker-js/faker';

const articlePage = new ArticlePageObject();

describe('Article', () => {

  beforeEach(() => {
    cy.task('db:clear'); // очистка базы перед каждым тестом

    // создаем и логиним пользователя перед каждым тестом
    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
    });
  });

  it('should create a new article', () => {
    const title = faker.lorem.words(3);
    const description = faker.lorem.sentence();
    const body = faker.lorem.paragraph();

    articlePage.visitNewArticle();
    articlePage.typeTitle(title);
    articlePage.typeDescription(description);
    articlePage.typeBody(body);
    articlePage.publishArticle();
    articlePage.assertArticleExists(title);
  });

  it('should edit an article', () => {
    const originalTitle = faker.lorem.words(3);
    const editedTitle = faker.lorem.words(3);

    cy.createArticle(originalTitle, faker.lorem.sentence(), faker.lorem.paragraph());
    articlePage.editArticle();
    articlePage.typeTitle(editedTitle);
    articlePage.publishArticle();
    articlePage.assertArticleExists(editedTitle);
  });

  it('should delete an article', () => {
    const titleToDelete = faker.lorem.words(3);

    cy.createArticle(titleToDelete, faker.lorem.sentence(), faker.lorem.paragraph());
    articlePage.deleteArticle();
    articlePage.assertArticleNotExists(titleToDelete);
  });

});
