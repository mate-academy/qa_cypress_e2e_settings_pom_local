import PageObject from './PageObject';

class UserPageObject {
  get followButton() {
    return cy.get('[data-cy="follow-btn"]');
  }

  get unfollowButton() {
    return cy.get('[data-cy="unfollow-btn"]');
  }

  clickFollow() {
    this.followButton.click();
  }

  clickUnfollow() {
    this.unfollowButton.click();
  }
}

export default UserPageObject;
