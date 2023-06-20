/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from "../support/pages/signUp.pageObject";

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;
  let wrongUser;
  const errorTypeUsername = 'username:';
  const errorMessageUsername = 'Username must start with a letter, have no spaces, and be 3 - 40 characters.';
  const errorTypeEmail = 'email:';
  const errorMessageEmail = 'This email does not seem valid.';
  const errorTypePassword = 'password:';
  const errorMessagePassword = "can't be blank";

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateWrongCredentialsUser').then(generateWrongCredentialsUser => {
      wrongUser = generateWrongCredentialsUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to register new user with valid credentials', () => {
    signUpPage.visit();

    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.passwordField
      .type(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertSuccessfullRegistration(user.username);
  });

  it('should not provide an ability to register with empty username field', () => {
    signUpPage.visit();

    signUpPage.emailField
      .type(wrongUser.email);
    signUpPage.passwordField
      .type(wrongUser.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.errorType
      .should('contain', errorTypeUsername);
    signUpPage.errorMessage
      .should('contain', errorMessageUsername);
  });

  it('should not provide an ability to register with empty email field', () => {
    signUpPage.visit();

    signUpPage.usernameField
      .type(wrongUser.username);
    signUpPage.passwordField
      .type(wrongUser.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.errorType
      .should('contain', errorTypeEmail);
    signUpPage.errorMessage
      .should('contain', errorMessageEmail);
  });

  it('should not provide an ability to register with empty password field', () => {
    signUpPage.visit();

    signUpPage.usernameField
      .type(user.username);
    signUpPage.emailField
      .type(user.email);
    signUpPage.clickOnSignUpBtn();

    signUpPage.errorType
      .should('contain', errorTypePassword);
    signUpPage.errorMessage
      .should('contain', errorMessagePassword);
  });
});
