/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

describe('Sign Up page', () => {
  let user;

  const signUpPage = new SignUpPageObject();
  const homePage = new HomePageObject();

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide the ability to log in with new credentials', () => {
    signUpPage.visit();

    signUpPage.typeName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(`${user.password}{enter}`);

    homePage.assertHeaderContainUsername(user.username);
  });
});
