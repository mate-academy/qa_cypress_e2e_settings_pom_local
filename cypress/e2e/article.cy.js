/// <reference types="cypress" />
/// <reference types="../support" />

describe('Article', () => {
  before(() => {
    // Before running any test, ensure you are logged in
    cy.login('testuser@example.com', 'password'); // Modify based on your actual login command
  });

  beforeEach(() => {
    cy.task('db:clear'); // Clear database before each test
  });

  it('should be created using New Article form', () => {
    cy.visit('/editor'); // Visit the article creation page

    cy.get('[data-cy=article-title]').type('My New Article');
    cy.get('[data-cy=article-description]').type('This is the description');
    cy.get('[data-cy=article-body]').type('This is the body of the new article.');
    cy.get('[data-cy=article-submit]').click();

    // Verify the article was created
    cy.contains('My New Article').should('be.visible');
  });

  it('should be edited using Edit button', () => {
    // Visit the article page
    cy.visit('/article/my-new-article');

    cy.get('[data-cy=edit-article]').click();
    cy.get('[data-cy=article-title]').clear().type('Updated Article Title');
    cy.get('[data-cy=article-submit]').click();

    // Verify the article was updated
    cy.contains('Updated Article Title').should('be.visible');
  });

  it('should be deleted using Delete button', () => {
    // Visit the article page
    cy.visit('/article/updated-article-title');

    cy.get('[data-cy=delete-article]').click();

    // Verify the article is deleted
    cy.contains('No articles are here... yet.').should('be.visible');
  });
});
