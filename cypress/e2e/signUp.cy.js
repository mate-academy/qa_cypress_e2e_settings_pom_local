/* eslint-disable max-len */
/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject.js';
const signUpPage = new SignUpPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();
describe('Sign Up page', () => {
  let user;
  let user2;
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateUser').then((generateUser2) => {
      user2 = generateUser2;
    });
     
  });


 it('should provide an ability to sign up with existing credentials with UI', () => {
    signUpPage.visit();
    // cy.register(user.email, user.username, user.password);
signUpPage.typeUserName(user.username);
   signUpPage.typeEmail(user.email);
   signUpPage.typePassword(user.password);
   signUpPage.clickSignUpBtn();
   homePage.visit();
   homePage.assertHeaderContainUsername(user.username);
 });

  
  it('should provide an ability to sign up with tooken username', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user2.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.errorMessages.should(
      'have.text',
      'username:This username is taken.'
    );
  });

  it('should provide an ability to sign up with tooken email', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user2.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.errorMessages.should('have.text', 'email:This email is taken.');
  });

  it('should provide an ability to sign up with the same password', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user2.username);
    signUpPage.typeEmail(user2.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.assertHeaderContainUsername(user2.username);
  });

  it('should provide an ability to sign up with existing credentials with login request', () => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
    homePage.visit();
    homePage.assertHeaderContainUsername(user.username);
    settingsPage.visit();
    settingsPage.emailField.should('have.value', user.email);
  });

  
});
