/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should register a new user successfully', () => {
    signUpPage.fillSignUpForm(user);

    signUpPage.userProfileLink.should('have.text', user.username);
  });

  it('should show error for already existing email', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.fillSignUpForm(user);

    cy.contains('This email is taken.').should('exist');
  });
});
