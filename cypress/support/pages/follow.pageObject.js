import PageObject from '../PageObject';

class FollowPageObject extends PageObject {
  visitProfile(username) {
    cy.visit(`/profile/${username}`);
  }

  followUser() {
    cy.get('[data-cy=follow-btn]').should('contain', 'Follow').click();
  }

  unfollowUser() {
    cy.get('[data-cy=follow-btn]').should('contain', 'Unfollow').click();
  }

  assertFollowStatus(isFollowing) {
    cy.get('[data-cy=follow-btn]').should(
      'contain',
      isFollowing ? 'Unfollow' : 'Follow'
    );
  }

  assertFollowerCount(count) {
    cy.get('.followers-count').should('contain', count);
  }
}

export default FollowPageObject;
