/// <reference types="cypress" />
/// <reference types="../support" />
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
const { faker } = require('@faker-js/faker');

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

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should register a user if data is correct', () => {
    const username = faker.person.firstName();
    const email = faker.internet.email();
    const password = username + '_P@$$word';

    signUpPage.typeUsername(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword(password);

    signUpPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(username.toLowerCase());
  });

  it('should not register a user if a data\'s field is empty', () => {
    const username = faker.person.firstName();
    const email = faker.internet.email();

    signUpPage.typeUsername(username);
    signUpPage.typeEmail(email);

    signUpPage.clickSignInBtn();

    signUpPage.checkFieldValid('password');
  });
});
