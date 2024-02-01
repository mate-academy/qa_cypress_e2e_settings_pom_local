/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/ArticlePageObject';
import { faker } from '@faker-js/faker';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    cy.signIn(user.email, user.password);
    article = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2)
    };
    articlePage.visit();
  });

  it('should be created using New Article form', () => {
    articlePage.createArticle(article.title, article.description, article.body);
  });

  it('should be edited using Edit button', () => {
    const newArticle = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2)
    };
    articlePage.editArticle(newArticle.title, newArticle.description, newArticle.body);
  });

  it('should be deleted using Delete button', () => {
    articlePage.deleteArticle();
  });
});
