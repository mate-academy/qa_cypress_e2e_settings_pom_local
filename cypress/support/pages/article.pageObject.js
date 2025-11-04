import PageObject from '../PageObject';

class articlePageObject extends PageObject {
    url = '/editor';

    get articleTitleField() {
        return cy.getByDataCy('article-title-field');
    }

    typeArticleTitle(articleTitle) {
        this.articleTitleField.type(articleTitle);
    }

    get articleDescriptionField() {
        return cy.getByDataCy('article-description-field');
    }

    typeArticleDescription(description) {
        this.articleDescriptionField.type(description);
    }

    get articleBodyField() {
        return cy.getByDataCy('article-body-field');
    }

    typeArticleBody(body) {
        this.articleBodyField.type(body);
    }

    get articleTagField() {
        return cy.getByDataCy('tags-field');
    }

    typeArticleTag(tag) {
        this.articleTagField.type(`${tag}{enter}`);
    }

    get publishButton() {
        return cy.getByDataCy('publish-article-btn');
    }

    assertContainsPublishButton() {
        this.publishButton.should('be.visible');
    }

    clickInPublishButton() {
        this.publishButton.click();
        return cy.url().then((url) => {
            const slug = url.split('/article/')[1];
            return {
                article: {
                    slug
                }
            };
        });
    }

    assertContainsArticleTitle(title) {
        return cy.getByDataCy('article-title').should('contain', title);
    }

    assertContainsBody(body) {
        return cy.getByDataCy('article-body').should('contain', body);
    }

    clickInProfileLink() {
        return cy.getByDataCy('profile-link').click();
    }

    assertContainsDescription(description) {
        return cy.getByDataCy('article-description')
        .should('contain', description);
    }

    assertContainsTag(tag) {
        return cy.getByDataCy('article-tag').should('contain', tag);
    }

    clickInNewArticle() {
        cy.getByDataCy('new-article-link').click();
    }

    clickInEditButton() {
        return cy.getByDataCy('edit-article')
            .first()
            .click();
    }

    clickInUpdateArticle() {
        return cy.getByDataCy('publish-article-btn')
            .click();
    }

    clickInDeleteButton() {
        return cy.getByDataCy('delete-article-btn')
            .first()
            .click();
    }

    clickInArticle() {
        return cy.getByDataCy('article-link')
            .click();
    }

}

export default articlePageObject;