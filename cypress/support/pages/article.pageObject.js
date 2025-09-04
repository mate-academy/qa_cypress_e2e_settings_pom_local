import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  urlFor(slug) { return `/article/${slug}`; }

  get title()     { return cy.getByDataCy('article-title'); }
  get body()      { return cy.getByDataCy('article-body'); }
  get editBtn()   { return cy.getByDataCy('article-edit'); }
  get deleteBtn() { return cy.getByDataCy('article-delete'); }

  clickEdit()  { this.editBtn.click(); }
  clickDelete(){ this.deleteBtn.click(); }
}
export default ArticlePageObject;
