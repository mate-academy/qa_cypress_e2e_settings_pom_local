/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const signUpPage = new SignUpPageObject();
const settings = new SettingsPageObject();
const homePage = new homePageObject();
let user;
const newUserName = 'newname';
const newBio = 'newbio';
const newEmail = 'newmail';
const newPassword = 'newpassword';

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

    cy.visit('/user/register');
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    cy.visit('/settings');
    });
  });

  it('should provide an ability to update username', () => {
    settings.typeUserName(newUserName);
    settings.clickUpdateBtn();

    homePage.usernameLink.should('contain', user.username + newUserName);
  });

  it('should provide an ability to update bio', () => {
    settings.typeBio(newBio);
    settings.clickUpdateBtn();

    cy.visit('/settings');
    settings.bioField.should('contain', newBio);
  });

  it('should provide an ability to update an email', () => {
    settings.typeEmail(newEmail);
    settings.clickUpdateBtn();

    cy.visit('/settings');
    settings.emailField.should('have.value', user.email + newEmail);
  });

  it('should provide an ability to update password', () => {
    settings.typePassword(newPassword);
    settings.clickUpdateBtn();
    settings.clickLogoutBtn();

    cy.visit('/user/login');
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    homePage.usernameLink.contains(user.username);
  });

  it('should provide an ability to log out', () => {
    settings.clickLogoutBtn();
    
    homePage.usernameLink.should('not.exist');
  });
});
