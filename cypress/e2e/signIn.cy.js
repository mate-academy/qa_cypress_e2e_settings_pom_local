/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();

const invalidUser = {
  username: 'invalidUser',
  password: '123',
  email: 'invalidUser@gmail.com',
};

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  it('should logs in with valid credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(`${user.password}{enter}`);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('shows error for invalid credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(invalidUser.email);
    signInPage.typePassword(invalidUser.password);
    signInPage.clickSignInBtn();
    signInPage.checkErrorMessages();
  });
});
