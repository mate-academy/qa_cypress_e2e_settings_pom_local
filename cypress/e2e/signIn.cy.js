/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In Page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.reload(); // Ensures a clean state before each test
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.username, user.password, user.email);
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainsUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    signInPage.typeEmail('wrong-email@example.com');
    signInPage.typePassword('wrongPassword123');
    signInPage.clickSignInBtn();

    // Assert error message is displayed
    cy.contains('.error-message', 'Invalid email or password').should(
      'be.visible'
    );
  });
});
