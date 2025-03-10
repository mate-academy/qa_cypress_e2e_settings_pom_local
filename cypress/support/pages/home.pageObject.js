import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  get articleLink() {
    return cy.getByDataCy('new-article-link');
  }

  clickArticleLink() {
    this.articleLink.click();
  }

  get globalTab() {
    return cy.getByDataCy('global-tab');
  }

  clickGlobalTab() {
    this.globalTab.click();
  }
}

export default HomePageObject;
