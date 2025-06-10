import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  visit() {
    cy.visit('/editor');
  }

  createArticle({ title, description, body }) {
    cy.get('[data-cy=title]').should('be.visible').type(title);
    cy.get('[data-cy=description]').should('be.visible').type(description);
    cy.get('[data-cy=body]').should('be.visible').type(body);
    cy.get('[data-cy=publish]').should('be.enabled').click();

    // Wait for the article to appear in the list as confirmation of creation
    cy.get('.article-list').should('contain', title);

    cy.log('Created article with title:', title);
  }

  editArticle(newTitle) {
    cy.get('[data-cy=edit-article]')
      .should('exist')
      .click();

    cy.get('[data-cy=title]').clear();
    cy.get('[data-cy=title]').type(newTitle);
    cy.contains('Save Changes').should('be.enabled').click();

    // Wait for the updated title to appear in the article list
    cy.get('.article-list').should('contain', newTitle);

    cy.log('Edited article to:', newTitle);
  }

  deleteArticle() {
    cy.get('[data-cy^="delete-article"]')
      .should('exist')
      .click();

    // Optionally, confirm the article is removed from the list
    // Example: cy.get('.article-list').should('not.contain', <articleTitle>);

    cy.log('Deleted the article');
  }

  assertArticleExists(title) {
    cy.get('.article-list')
      .should('be.visible')
      .and('contain', title);

    cy.log('Confirmed article exists:', title);
  }

  assertArticleUpdated(newTitle) {
    cy.get('.article-list')
      .should('be.visible')
      .and('contain', newTitle);

    cy.log('Confirmed article update:', newTitle);
  }

  assertArticleDeleted(title) {
    cy.get('.article-list')
      .should('be.visible')
      .and('not.contain', title);

    cy.log('Confirmed article deletion:', title);
  }
}

export default ArticlePageObject;
