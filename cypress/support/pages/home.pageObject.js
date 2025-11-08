import { de } from '@faker-js/faker';
import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get homeLink() {
    return cy.getByDataCy('home-link');
  }

  get profileLink() {
    return cy.getByDataCy('profile-link');
  }

  get settingsLink() {
    return cy.getByDataCy('settings-link');
}

get signInNavigation() {
  return cy.getByDataCy('sign-in-nav');
}

get signUpInNavigation() {
  return cy.getByDataCy('sign-up-nav');
}

  get articleLink() {
    return cy.getByDataCy('new-article-link');
  }

  get followBtn() {
    return cy.getByDataCy('follow-user-btn');
  }

  get feedBtn() {
    return cy.getByDataCy('global-feed-btn');
  }

  get newTitleInBanner() {
    return cy.getByDataCy('banner-title');
  }

  get bodyUnderBanner() {
    return cy.getByDataCy('article-page-body');
  }

  get previewTitle() {
    return cy.getByDataCy('preview-title');
  }

  get previewDescription() {
    return cy.getByDataCy('preview-description');
  }

  assertHeaderContainUsername(username) {
    this.profileLink
      .should('contain', username);
  }

    checkProfileLinkForLogout() {
    this.profileLink
    .should('not.exist');
  }

  clickHomeLink() {
    this.homeLink
    .click();
  }

  clickSettingsLink() {
    this.settingsLink
    .click();
  }

  clickSignInNav() {
    this.signInNavigation
    .click();
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

    clickInDeletionOfArticle() {
    cy.getByDataCy('delete-article-btn')
    .first()
      .click();
  }

      clickInEditionOfArticle() {
    cy.getByDataCy('edit-article-btn')
    .first()
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
    this.newTitleInBanner
    .should('contain.text', title);
    this.bodyUnderBanner
    .should('contain.text', description);
  }

    assertTitleInBanner(title) {
    this.newTitleInBanner
    .should('contain.text', title);
  }

  assertBodyUnderBanner(body) {
    this.bodyUnderBanner
    .should('contain.text', body);
  }

    assertDeletedArticle(title, description) {
    
    cy.contains('[data-cy="preview-title"]', title)
    .should('not.exist');
    cy.contains('[data-cy="preview-description"]', description)
    .should('not.exist');
  }
}

export default HomePageObject;
