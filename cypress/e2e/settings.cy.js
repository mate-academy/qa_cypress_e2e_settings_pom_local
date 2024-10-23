/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import createArticleObject from '../support/pages/createArticle.pageObject';

const SettingsPage = new SettingsPageObject();
const homePage = new homePageObject();
const signInPage = new SignInPageObject();
const signUpPage = new SignUpPageObject();
const createArticlePage = new createArticleObject();


describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    signInPage.visit();
    cy.registerNewUser(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to update username', () => {
    SettingsPage.updateUsername(user.username);

    usernameField.should('contain', user.username);

  });

  it('should provide an ability to update bio', () => {
    SettingsPage.updateBioField(user.description);

    usernameField.should('contain', user.description);

  });

  it('should provide an ability to update an email', () => {
    SettingsPage.updateEmail(user.email);

    usernameField.should('contain', user.email);

  });

  it('should provide an ability to update password', () => {
    SettingsPage.updatePassword(user.password);

    usernameField.should('contain', user.password);

  });

});
