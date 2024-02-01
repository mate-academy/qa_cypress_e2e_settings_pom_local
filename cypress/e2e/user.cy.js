/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from '../support/pages/UserPageObject';

const userPage = new UserPageObject();

describe('Follow/unfollow button', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.createUserAndSignIn();

    userPage.visit('/user-profile');
  });

  it('should provide an ability to follow another user', () => {
    userPage.followUser();
    userPage.assertFollowed();
  });

  it('should provide an ability to unfollow the followed user', () => {
    userPage.unfollowUser();
    userPage.assertUnfollowed();
  });
});
