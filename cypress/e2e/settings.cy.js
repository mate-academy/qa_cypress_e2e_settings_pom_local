/// <reference types="cypress" />
/// <reference types="../support" />

import PageObject from "../support/PageObject";
import settingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import homePageObject from "../support/pages/home.pageObject";
import { sign } from "crypto";

const homePage = new homePageObject();
const settingsPage = new settingsPageObject();
const signInPage = new SignInPageObject();

const data = {
  username: 'riot',
  email: 'qa@mail.com',
  password: '12345Qwert!',
}

describe('Settings page', () => {
  let user; 

  beforeEach(() => {
    cy.task('db:clear');
    
    homePage.visit();

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    settingsPage.loggedUser();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateUsername(user.username);
    settingsPage.submitButton();

    homePage.newUsernameLink(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateBio(user.bio);
    settingsPage.submitButton();

    homePage.settingsLink();

    settingsPage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail(user.email);
    settingsPage.submitButton();

    homePage.settingsLink();

    settingsPage.logOut();

    signInPage.visit();
    signInPage.emailField(user.email);
    signInPage.passwordField(data.password);
    signInPage.signInBtn();

    homePage.usernameLink(data.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword(user.password);
    settingsPage.submitButton();

    homePage.settingsLink();

    settingsPage.logOut();
    settingsPage.assertLogOut();

    signInPage.visit();
    signInPage.emailField(data.email);
    signInPage.passwordField(user.password);
    signInPage.signInBtn();

    homePage.usernameLink(data.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logOut();
    settingsPage.assertLogOut();
  });
});
