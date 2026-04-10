/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject;

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    signUpPage.visit();
  });

  it('should successfully sign up with valid credentials', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should show error when email is already taken', () => {
    const { email, username, password } = user;

    cy.register(email, username, password).then(() => {
      signUpPage.typeUserName(username + 'a');
      signUpPage.typeEmail(email);
      signUpPage.typePassword(password);
      signUpPage.clickSignUpBtn();
    });

    signUpPage.errorEmailIsTaken();
  });

  it('should show error when username is already taken', () => {
    const { email, username, password } = user;
    
    cy.register(email, username, password).then(() => {
      signUpPage.typeUserName(user.username);
      signUpPage.typeEmail('a' + user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpBtn();
    });

    signUpPage.errorUserNameIsTaken();
  });
});
