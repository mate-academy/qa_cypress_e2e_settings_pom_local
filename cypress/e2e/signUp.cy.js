/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/SignUpPageObject';
import { faker } from '@faker-js/faker';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should allow a user to sign up', () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    signUpPage.assertSuccessfulSignUp();
  });

});
