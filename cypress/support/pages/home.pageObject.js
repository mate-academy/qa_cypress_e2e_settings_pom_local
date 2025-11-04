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
  
  clickInGlobalFeed() {
    return cy.getByDataCy('global-feed')
      .click();
  }

  clickInAuthor() {
    return cy.get('.author')
      .click();
  }

  followUser() {
    return cy.getByDataCy('follow-unfollow-user')
      .click();
  }

  assertFollowedUser() {
    return cy.getByDataCy('follow-unfollow-user').should('exist');
  }

  unfollowUser() {
    return cy.getByDataCy('follow-unfollow-user')
      .click();
  }

  assertUnfollowedUser() {
    return cy.getByDataCy('follow-unfollow-user').should('exist');
  }

}

export default HomePageObject;