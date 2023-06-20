import PageObject from "../PageObject";

class UserProfilePage extends PageObject {
  visit(username) {
    cy.visit(`/profile/${username}`);
  }

  clickOnFollowBtn() {
    cy.getByDataCy('follow-btn')
      .click();
  }

  clickOnUnfollowBtn() {
    cy.getByDataCy('follow-btn')
      .click();
  }

  assertFollowing() {
    cy.getByDataCy('follow-btn')
      .should('contain', 'Unfollow');
  }

  assertUnfollowing() {
    cy.getByDataCy('follow-btn')
      .should('contain', 'Follow');
  }
};

export default UserProfilePage;
