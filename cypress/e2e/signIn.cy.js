/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();

describe('Sign In page', () => {
  let user;
  let fakeUser;
  let errorType = 'email or password:';
  let errorMessage = 'is invalid';

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateAnotherUser').then(generateAnotherUser => {
      fakeUser = generateAnotherUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });
  
  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.emailField
      .type(fakeUser.email);
    signInPage.passwordField
      .type(fakeUser.password);
    signInPage.signInBtn
      .click();

    signInPage.errorType
      .should('contain', errorType);
    signInPage.errorMessage
      .should('contain', errorMessage);
  });
});
