/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ErrorMessagePageObject from '../support/errors/errorMessages.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const errorMessage = new ErrorMessagePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);

    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  describe('should not provide an ability to log in with wrong credentials', () => {
    it('email is wrong', () => {
      signInPage.typeEmail('wrongEmail@mail.com');
      signInPage.typePassword(user.password);

      signInPage.clickSignInBtn();

      errorMessage.messageText('email or password:is invalid');
    });

    it('password is wrong', () => {
      signInPage.typeEmail(user.email);
      signInPage.typePassword('12345Wrong!');

      signInPage.clickSignInBtn();

      errorMessage.messageText('email or password:is invalid');
    });
  });
});
