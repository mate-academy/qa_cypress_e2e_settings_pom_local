/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide the ability to create a new user', () => {
    signUpPage.visit('');

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an error message if the username field is blank', () => {
    signUpPage.visit('');

    signUpPage.typeUsername(' ');
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.checkUsernameErrorMessage();
  });

  it('should provide an error message with invalid email', () => {
    signUpPage.visit('');

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('test@test');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.checkEmailErrorMessage();
  });

  it('should provide an error message if the password field is blank', () => {
    signUpPage.visit('');

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.checkPasswordErrorMessage();
  });
});
