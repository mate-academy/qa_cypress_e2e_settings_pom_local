/// <reference types="cypress" />
/// <reference types="../support" />

import UserPage from '../support/pages/user.pageObject';

const userPage = new UserPage();

describe('Follow/unfollow button', () => {
  let firstUser;
  let secondUser;

  beforeEach(() => {
  cy.task('db:clear');

  cy.task('generateUser').then((generatedUser) => {
      firstUser = generatedUser;

      cy.login(firstUser.email, firstUser.username, firstUser.password);
    });

  cy.task('generateUser').then((generatedUser) => {
      secondUser = generatedUser;

      cy.register(secondUser.email, secondUser.username, secondUser.password);
    });

    userPage.visit();
  });

  it('should provide an ability to follow the another user', () => {
    userPage.visit(`/profile/${secondUser.username}`);

    userPage.clickSubscribeBtn();

    userPage.verifySubscribeBtnText(`Unfollow ${secondUser.username}`);
  });
});
