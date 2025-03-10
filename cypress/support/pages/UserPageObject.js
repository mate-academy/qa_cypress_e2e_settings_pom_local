import PageObject from './PageObject';

import PageObject from './PageObject';

class UserPageObject extends PageObject {
  constructor() {
    super();
  }

  followUser() {
    cy.get('[data-cy=follow-btn]').click();
  }

  unfollowUser() {
    cy.get('[data-cy=unfollow-btn]').click();
  }

  assertFollowed() {
    cy.get('[data-cy=follow-btn]').should('contain', 'Unfollow');
  }

  assertUnfollowed() {
    cy.get('[data-cy=follow-btn]').should('contain', 'Follow');
  }
}

export default UserPageObject;
