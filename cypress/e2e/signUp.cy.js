/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';  
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up Page', () => {
  let user;

  before(() => {
    cy.task('db:clear'); // Ensure clean database state before tests
  });

  beforeEach(() => {
    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    signUpPage.visit(); // Ensure the test starts on the correct page
  });

  it('should register a user with valid credentials', () => {
    signUpPage.signUp(user);
    
    // Verify user is logged in after successful registration
    homePage.assertUserLoggedIn(user.username);
  });

  it('should prevent registration with an already taken email', () => {
    signUpPage.signUp(user); // Register first time
    cy.reload(); // Ensure state refresh before retry
    signUpPage.signUp(user); // Attempt second registration

    // Assert error message is displayed
    signUpPage.assertErrorMessage('Email already in use');
  });

  it('should prevent registration with a weak password', () => {
    signUpPage.signUp({
      ...user,
      password: '123', // Weak password
    });

    // Assert password validation error is displayed
    signUpPage.assertErrorMessage('Password too short');
  });
});
