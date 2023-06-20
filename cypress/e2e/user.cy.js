/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from "../support/pages/settings.pageObject";
import UserProfilePage from "../support/pages/userProfile.pageObject";

const userProfilePage = new UserProfilePage();
const settingsPage = new SettingsPageObject();

describe('Follow/unfollow button', () => {
  let user;
  let anotherUser;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateAnotherUser').then(generateAnotherUser => {
      anotherUser = generateAnotherUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to follow the another user', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    cy.login(anotherUser.email, anotherUser.username, anotherUser.password);
    userProfilePage.visit(user.username);

    userProfilePage.clickOnFollowBtn();
    userProfilePage.assertFollowing();
  });

  i('should provide an ability to unfollow the another user', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    cy.login(anotherUser.email, anotherUser.username, anotherUser.password);
    userProfilePage.visit(user.username);

    userProfilePage.clickOnFollowBtn();
    userProfilePage.clickOnUnfollowBtn();

    userProfilePage.assertUnfollowing();
  });
});
