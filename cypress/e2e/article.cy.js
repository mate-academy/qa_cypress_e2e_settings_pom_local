/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import EditorPageObject from '../support/pages/editor.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const editor = new EditorPageObject();
const article = new ArticlePageObject();

describe('Article', () => {
  // Wymagane: czyszczenie DB w każdym teście
  beforeEach(() => { cy.task('db:clear'); });

  let user;

  beforeEach(() => {
    cy.task('generateUser').then((u) => {
      user = u;
      cy.register(u.email, u.username, u.password);
      cy.loginUI(u.email, u.password);
    });
  });

  it('should be created using New Article form', () => {
    const title = faker.lorem.words(3);
    const desc = faker.lorem.sentence();
    const body = faker.lorem.paragraphs(2, '\n\n');

    editor.visit();
    editor.typeTitle(title);
    editor.typeAbout(desc);
    editor.typeBody(body);
    editor.publish();

    cy.url().should('include', '/article/');
    article.title.should('contain', title);
    article.body.should('contain', body.split('\n')[0]);
  });

  it('should be edited using Edit button', () => {
    const title = faker.lorem.words(3);
    const desc = faker.lorem.sentence();
    const body = faker.lorem.paragraph();

    editor.visit();
    editor.typeTitle(title);
    editor.typeAbout(desc);
    editor.typeBody(body);
    editor.publish();

    article.editBtn.should('be.visible');
    article.clickEdit();

    const updated = faker.lorem.paragraph();
    editor.typeBody(`${updated} (edited)`);
    editor.publish();

    article.body.should('contain', '(edited)');
  });

  it('should be deleted using Delete button', () => {
    const title = faker.lorem.words(3);
    const desc = faker.lorem.sentence();
    const body = faker.lorem.paragraph();

    editor.visit();
    editor.typeTitle(title);
    editor.typeAbout(desc);
    editor.typeBody(body);
    editor.publish();

    let slug;
    cy.url().should('include', '/article/').then((u) => {
      slug = u.split('/').pop();
    });

    cy.intercept('DELETE', '**/api/articles/*').as('deleteArticle');
    cy.on('window:confirm', () => true);
    article.clickDelete();

    cy.wait('@deleteArticle').its('response.statusCode').should('eq', 204);

    cy.url().should('not.include', '/article/');
    cy.getByDataCy('nav-brand').should('be.visible');

    cy.request({
      method: 'GET',
      url: `/api/articles/${slug}`,
      failOnStatusCode: false,
    })
      .its('status')
      .should('eq', 404);
  });
});
