/// <reference types="cypress" />
/// <reference types="../support" />

import { beforeEach } from "mocha";
import PageObject from "../support/PageObject";
import HomePageObject from "../support/pages/home.pageObject";
import SettingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const homePage = new HomePageObject;
const settingsPage = new SettingsPageObject;
const signInPage = new SignInPageObject;


describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  })

  it('should provide an ability to update username', () => {
   
    settingsPage.usernameField.clear().type(user.updateUsername);
    settingsPage.updateBtn.click();
    homePage.assertHeaderContainUsername(user.updateUsername);

  });

  it('should provide an ability to update bio', () => {


  
    settingsPage.bioField.clear().type(user.bio);
    settingsPage.updateBtn.click();
    settingsPage.userBioTextExist(user.bio);
  
  });

  it('should provide an ability to update an email', () => {

    settingsPage.emailField.clear().type(user.updateEmail);
    settingsPage.updateBtn.click();
    settingsPage.clickOnEditBtn();
    settingsPage.emailFieldIsUpdate(user.updateEmail);

    cy.clearAllCookies().reload();
    signInPage.visit();

    signInPage.typeEmail(user.updateEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);   

  });

  it('should provide an ability to update password', () => {

    settingsPage.passwordField.type(user.updatePassword);
    settingsPage.updateBtn.click();

    cy.clearAllCookies().reload();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.updatePassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);   
  });

  it('should provide an ability to log out', () => {

    settingsPage.clickOnLogOutbtn();
    settingsPage.navbarShouldNotContain(user.username);
   
  });
});
