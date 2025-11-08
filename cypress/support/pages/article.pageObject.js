import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
    url = '/editor';

    get titleInput() {
      return cy.getByDataCy('editor-art-title');
    }

    get descriptionInput() {
      return cy.getByDataCy('editor-art-description');
    }
    
    get bodyInput() {
        return cy.getByDataCy('editor-art-body');
    }

    get tagInput() {
        return cy.getByDataCy('editor-art-tags');
    }

    get articleBtn() {
        return cy.getByDataCy('handle-article-btn');
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

    clickArticleBtn() {
        this.articleBtn
          .click()
          .click();
    }
}

export default ArticlePageObject;