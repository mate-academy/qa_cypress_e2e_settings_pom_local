/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/ArticlePageObject';
import { faker } from '@faker-js/faker';

describe('Article actions', () => {
  const articlePage = new ArticlePageObject();

  beforeEach(() => {
    cy.task('db:clear'); // Припускаючи, що у вас є така задача
    cy.visit('/articles/new'); // Або інший URL, де ви створюєте статті
  });

  it('should allow a user to create an article', () => {
    const title = faker.lorem.sentence();
    const description = faker.lorem.sentence();
    const body = faker.lorem.paragraph();

    articlePage.typeTitle(title);
    articlePage.typeDescription(description);
    articlePage.typeBody(body);
    articlePage.submitArticle();

    // Тут має бути перевірка на успішне створення статті
  });

  // Додайте інші тестові випадки за потреби
});
