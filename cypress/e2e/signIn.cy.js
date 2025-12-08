/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();

describe('Sign In page', () => {
  let user;
let user2;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
 cy.task('generateUser').then((generateUser2) => {
   user2 = generateUser2;
 });

  });
  
  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
  signInPage.visit();
  cy.register(user.email, user.username, user.password);

  signInPage.typeEmail(user2.email);
  signInPage.typePassword(user.password);
  signInPage.clickSignInBtn();
    signInPage.errorMessages.should('contain.text', 'email or password');
    signInPage.errorMessages.should('include.text', 'is invalid');
    
  });

it('should not provide an ability to log in with wrong password', () => {
  signInPage.visit();
  cy.register(user.email, user.username, user.password);

  signInPage.typeEmail(user.email);
  signInPage.typePassword(user.password + '1');
  signInPage.clickSignInBtn();
  signInPage.errorMessages.should('contain.text', 'email or password');
  signInPage.errorMessages.should('include.text', 'is invalid');
});

});
