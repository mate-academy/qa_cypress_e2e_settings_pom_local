import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
    url = '/editor';

    get titleInput() {
      return cy.inputByPlaceholder('Article Title');
    }

    get descriptionInput() {
      return cy.inputByPlaceholder(`What's this article about?`);
    }
    
    get bodyInput() {
        return cy.inputByPlaceholder('Write your article (in markdown)');
    }

    get tagInput() {
        return cy.inputByPlaceholder('Enter tags');
    }

    get publishArticleBtn() {
        return cy.contains('button', 'Publish Article')
          .click();
    }

        get updateArticleBtn() {
        return cy.contains('button', 'Update Article')
          .click();
    }

    typeTitle(title) {
        this.titleInput
        .type(title);
    }

    typeDescription(description) {
        this.descriptionInput
        .type(description);
    }
    typeBody(body) {
        this.bodyInput
        .type(body);
    }

    typeTags(tags) {
        this.tagInput
        .type(tags);
    }

    clickPublishArticleBtn() {
        this.publishArticleBtn
          .click();
    }

        clickUpdateArticleBtn() {
        this.updateArticleBtn
          .click();
    }
}

export default ArticlePageObject;