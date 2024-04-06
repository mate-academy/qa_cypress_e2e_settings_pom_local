import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/editor';

  get articleTitleField() {
    return cy.findByPlaceholder('"Article Title"');
  }

  get descriptionField() {
    return cy.findByPlaceholder('"What\'s this article about?"');
  }

  get articleBodyField() {
    return cy.findByPlaceholder('"Write your article (in markdown)"');
  }

  get publishBtn() {
    return cy.contains('[type="button"]', 'Publish Article');
  }

  get titleBannerArticle() {
    return cy.get('[class="banner"]');
  }

  get bodyBannerArticle() {
    return cy.get('[class="row article-content"]');
  }

	get btnEditArticle() {
		return cy.get('.btn').contains('Edit Article');
	}

	get btnDeleteArticle() {
		return cy.get('.btn').contains('Delete Article');
	}

	get btnUpdateArticle() {
		return cy.get('.btn').contains('Update Article');
	}

  typeTitle(article) {
    this.articleTitleField.type(article);
  }

  typeDescription(text) {
    this.descriptionField.type(text);
  }

  typeBodyArticle(text) {
    this.articleBodyField.type(text);
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }

	checkPublishArticle(title, body) {
		this.titleBannerArticle.should('contain', title);
		this.bodyBannerArticle.should('contain', body);
	}

	checkActiveBtn() {
		this.btnEditArticle.should('be.visible');
		this.btnDeleteArticle.should('be.visible');
	}

	clickEditBtn() {
		this.btnEditArticle.click();
	}

	clickUpdateBtn() {
		this.btnUpdateArticle.click();
	}

	clickDeleteBtn() {
		this.btnDeleteArticle.click();
	}
}

export default ArticlePageObject;