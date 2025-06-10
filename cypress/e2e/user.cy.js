/// <reference types="cypress" />
/// <reference types="../support" />

import ProfilePageObject from '../support/pages/profile.pageObject';

const profilePage = new ProfilePageObject();

describe('Follow/unfollow button', () => {
  before(() => {
    cy.login('riot', '12345Qwert!', 'riot@qa.team');
    profilePage.visitAnotherUser('anotherUser');
  });

  it('should allow following another user', () => {
    profilePage.followUser();
    profilePage.assertFollowStatus(true);
  });

  it('should allow unfollowing a user', () => {
    profilePage.unfollowUser();
    profilePage.assertFollowStatus(false);
  });
});
