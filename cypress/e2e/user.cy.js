/// <reference types="cypress" />
/// <reference types="../support" />

import ProfilePageObject from '../support/pages/profile.pageObject';

const profilePage = new ProfilePageObject();

describe('Follow/unfollow button', () => {
  let currentUser;
  let anotherUser;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      currentUser = generatedUser;
      cy.login(
        currentUser.email,
        currentUser.username,
        currentUser.password,
      );
    });

    cy.task('generateUser').then((generatedUser) => {
      anotherUser = generatedUser;
      cy.register(
        anotherUser.email,
        anotherUser.username,
        anotherUser.password,
      );
    });
  });

  it('should provide an ability to follow and unfollow another user', () => {
    profilePage.visitUser(anotherUser.username);
    profilePage.assertFollowButton(anotherUser.username);

    profilePage.follow(anotherUser.username);
    profilePage.assertUnfollowButton(anotherUser.username);

    profilePage.unfollow(anotherUser.username);
    profilePage.assertFollowButton(anotherUser.username);
  });
});
