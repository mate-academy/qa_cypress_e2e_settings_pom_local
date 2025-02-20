import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/';

  get globalFeed() {
    return cy.getByDataCy('user-global-feed');
  }

  get linkAuthor() {
    return cy.getByDataCy('user-author');
  }

  get followOrUnfollowBtn() {
    return cy.getByDataCy('user-follow-btn');
  }

  moveOnGlobalFeed() {
    this.globalFeed.click();
  }

  moveOnAnotherUser() {
    this.linkAuthor.click();
  }

  clickOnFollowBtn() {
    this.followOrUnfollowBtn.click();
  }
}

export default UserPageObject;
