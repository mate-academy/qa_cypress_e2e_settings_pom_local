/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/SignUpPageObject';

describe('Sign Up page', () => {
  const signUpPage = new SignUpPageObject();

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should allow a user to sign up with valid credentials', () => {
    const user = {
      username: `testUser_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: 'password123'
    };

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    cy.contains('Welcome').should('be.visible');
  });

});
