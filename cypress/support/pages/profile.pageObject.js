import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get followUserBtn() {
    return this.getByDataCy('follow-user-btn');
  }

  visitUser(username) {
    this.visit(`/profile/${encodeURIComponent(username)}`);
  }

  assertFollowButton(username) {
    this.followUserBtn
      .should('be.visible')
      .and('contain', `Follow ${username}`);
  }

  assertUnfollowButton(username) {
    this.followUserBtn
      .should('be.visible')
      .and('contain', `Unfollow ${username}`);
  }

  follow(username) {
    cy.intercept('POST', `**/api/profiles/${username}/follow`)
      .as('followUser');

    this.followUserBtn.click();

    cy.wait('@followUser')
      .its('response.statusCode')
      .should('eq', 200);
  }

  unfollow(username) {
    cy.intercept('DELETE', `**/api/profiles/${username}/follow`)
      .as('unfollowUser');

    this.followUserBtn.click();

    cy.wait('@unfollowUser')
      .its('response.statusCode')
      .should('eq', 200);
  }
}

export default ProfilePageObject;
