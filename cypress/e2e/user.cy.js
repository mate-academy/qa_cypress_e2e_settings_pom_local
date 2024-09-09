/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const userPage = new UserPageObject();
const signInPage = new SignInPageObject();

describe('Follow/unfollow button', () => {
  let user1;
  let user2;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    signInPage.visit();

    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;

      cy.login(user1.email, user1.username, user1.password);
  
      userPage.visit('/settings');
  
      userPage.logout();
    });


    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;

      cy.login(user2.email, user2.username, user2.password);
    });
  });

  it('should provide an ability to follow the another user', () => {
    cy.visit('/profile/' + user1.username);

    userPage.clickFollow();

    userPage.followBtn.should('contain.text', 'Unfollow');
  });
});
