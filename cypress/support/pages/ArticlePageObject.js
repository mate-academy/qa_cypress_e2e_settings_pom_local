import PageObject from './PageObject';

class ArticlePageObject {
  get titleField() {
    return cy.get('[data-cy=title]');
  }

  get descriptionField() {
    return cy.get('[data-cy=description]');
  }

  get bodyField() {
    return cy.get('[data-cy=body]');
  }

  get submitButton() {
    return cy.get('[data-cy=submit]');
  }

  typeTitle(title) {
    this.titleField.clear().type(title);
  }

  typeDescription(description) {
    this.descriptionField.clear().type(description);
  }

  typeBody(body) {
    this.bodyField.clear().type(body);
  }

  submitArticle() {
    this.submitButton.click();
  }
}

export default ArticlePageObject;
