import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get articleLink() {
    return cy.getByDataCy('new-article-link');
  }

  get followBtn() {
    return cy.get('.btn');
  }

  get feedBtn() {
    return cy.contains('.nav-link', 'Global Feed');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

    checkProfileLinkForLogout() {
    this.usernameLink
    .should('not.exist');
  }

  clickArticleBtn() {
    this.articleLink
     .click();
  }

  clickGlobalFeedBtn() {
    this.feedBtn
    .click();
  }

  clickFollowBtn() {
    this.followBtn
    .click();
  }

  openArticle() {
    cy.contains('span', 'Read more...')
      .click();
  }

  clickInEditionOfArticle() {
    cy.contains('.btn', 'Edit Article')
      .click();
  }

    clickInDeletionOfArticle() {
    cy.contains('.btn', 'Delete Article')
      .click();
  }

  assertFollowedUser() {
    this.followBtn
    .should('have.class', 'btn btn-sm btn-primary');
  }

    assertUnfollowedUser() {
    this.followBtn
    .should('have.class', 'btn btn-sm btn-outline-primary');
  }

  assertNewArticle(title, description) {
    cy.contains('h1', title)
      .should('exist');
    cy.contains('.preview-link > p', description)
      .should('exist');
  }

    assertDeletedArticle(title, description) {
    cy.contains('h1', title)
      .should('not.exist');
    cy.contains('.preview-link > p', description)
      .should('not.exist');
  }
}

export default HomePageObject;
