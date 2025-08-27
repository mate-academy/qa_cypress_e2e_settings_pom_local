/* eslint-disable max-len */
/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ErrorMessagePageObject from '../support/errors/errorMessages.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const errorMessage = new ErrorMessagePageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should register user with correct data', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  describe('should not provide an ability to register user with wrong username', () => {
    const userErrorMessage =
      'Username must start with a letter, have no spaces, and be 3 - 40 characters.';

    it('should contain username', () => {
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);

      signUpPage.clickSignUpBtn();

      errorMessage.messageText(userErrorMessage);
    });

    it('should start with letter', () => {
      signUpPage.typeUsername('12345');
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);

      signUpPage.clickSignUpBtn();

      errorMessage.messageText(userErrorMessage);
    });

    it('should have no spaces', () => {
      signUpPage.typeUsername('user name');
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);

      signUpPage.clickSignUpBtn();

      errorMessage.messageText(userErrorMessage);
    });

    it.skip('should be 3 - 40 characters', () => {
      signUpPage.typeUsername('un');
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);

      signUpPage.clickSignUpBtn();

      errorMessage.messageText(userErrorMessage);
    });

    it.skip('should be 3 - 40 characters', () => {
      signUpPage.typeUsername('u1234567890123456789012345678901234567890');
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);

      signUpPage.clickSignUpBtn();

      errorMessage.messageText(userErrorMessage);
    });
  });

  describe('should not provide an ability to register user with wrong email', () => {
    const atSymbolMissed = 'Включить частину "@" в адресу електронної пошти';
    const firstPartMissed = 'Введіть частину, за якою розміщено "@".';
    const localePartIncorrect =
      'Частина, після якої розташовано "@", не має містити символ';
    const emailErrorMessage = 'This email does not seem valid.';

    it('should contain email', () => {
      signUpPage.typeUsername(user.username);
      signUpPage.typePassword(user.password);

      signUpPage.clickSignUpBtn();
      errorMessage.messageText(emailErrorMessage);
    });

    it('should contain @', () => {
      signUpPage.typeEmail(user.username);

      signUpPage.clickSignUpBtn();
      errorMessage.validationMessage(atSymbolMissed);
    });

    it('should contain at least 1 character before "@"', () => {
      signUpPage.typeEmail('@mail.com');

      signUpPage.clickSignUpBtn();
      errorMessage.validationMessage(firstPartMissed);
    });

    it('should have no spaces and contain just latin alphabet before "@"', () => {
      signUpPage.typeEmail('користувач@mail.com');

      signUpPage.clickSignUpBtn();
      errorMessage.validationMessage(localePartIncorrect);
    });

    it('should contain at least 1 character before "@", "@" and domain part', () => {
      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(`${user.username}@mymail`);
      signUpPage.typePassword(user.password);

      signUpPage.clickSignUpBtn();
      errorMessage.messageText(emailErrorMessage);
    });
  });

  describe('should not provide an ability to register user if password is missed', () => {
    const passwordErrorMessage = `password:can't be blank`;

    it('should contain password', () => {
      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(user.email);

      signUpPage.clickSignUpBtn();

      errorMessage.messageText(passwordErrorMessage);
    });
  });
});
